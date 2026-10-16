import { NextResponse } from 'next/server';
import { hasSameOrigin } from '@/lib/request-origin';
import { createSupabaseAdminClient, SupabaseConfigurationError } from '@/lib/supabase';

export const runtime = 'nodejs';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validText(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  const requestContentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (requestContentType !== 'application/json') {
    return NextResponse.json({ error: 'Content-Type must be application/json.' }, { status: 415 });
  }

  const requestKey = request.headers.get('idempotency-key');
  if (!requestKey || !uuidPattern.test(requestKey)) {
    return NextResponse.json({ error: 'A valid Idempotency-Key header is required.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid booking details.' }, { status: 400 });
  }

  const {
    full_name,
    phone_number,
    service_requested,
    appointment_time,
    notes,
  } = body as Record<string, unknown>;

  if (
    !validText(full_name, 150) ||
    !validText(phone_number, 40) ||
    phone_number.replace(/\D/g, '').length < 7 ||
    !validText(service_requested, 150) ||
    !validText(appointment_time, 150) ||
    (notes !== undefined && notes !== null && (typeof notes !== 'string' || notes.length > 1000))
  ) {
    return NextResponse.json({ error: 'Please check the booking details and try again.' }, { status: 400 });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('appointments')
      .upsert({
        full_name: full_name.trim(),
        phone_number: phone_number.trim(),
        service_requested: service_requested.trim(),
        appointment_time: appointment_time.trim(),
        notes: typeof notes === 'string' && notes.trim() ? notes.trim() : null,
        request_key: requestKey,
      }, { onConflict: 'request_key', ignoreDuplicates: true })
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('Supabase appointment save failed.', { code: error.code, message: error.message });
      return NextResponse.json({ error: 'Unable to save your booking request.' }, { status: 502 });
    }

    if (data) {
      return NextResponse.json({ id: data.id }, { status: 200 });
    }

    const { data: existing, error: lookupError } = await supabase
      .from('appointments')
      .select('id')
      .eq('request_key', requestKey)
      .single();

    if (lookupError) {
      console.error('Supabase appointment idempotency lookup failed.', {
        code: lookupError.code,
        message: lookupError.message,
      });
      return NextResponse.json({ error: 'Unable to confirm the booking request.' }, { status: 502 });
    }

    return NextResponse.json({ id: existing.id }, { status: 200 });
  } catch (error) {
    console.error('Appointment submission failed.', error);
    if (error instanceof SupabaseConfigurationError) {
      return NextResponse.json({ error: 'Booking service is not configured.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Unable to save your booking request.' }, { status: 500 });
  }
}
