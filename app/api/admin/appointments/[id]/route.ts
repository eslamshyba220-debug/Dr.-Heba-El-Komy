import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import type { AppointmentStatus } from '@/lib/database.types';
import { createSupabaseAdminClient } from '@/lib/supabase';

export const runtime = 'nodejs';

const allowedStatuses: AppointmentStatus[] = ['pending', 'contacted', 'cancelled'];
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const { id } = await context.params;
    if (!uuidPattern.test(id)) {
      return NextResponse.json({ error: 'Invalid appointment ID.' }, { status: 400 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
    }
    if (!body || typeof body !== 'object' || !('status' in body) || typeof body.status !== 'string' || !allowedStatuses.includes(body.status as AppointmentStatus)) {
      return NextResponse.json({ error: 'Invalid appointment status.' }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('appointments')
      .update({ status: body.status as AppointmentStatus })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Supabase appointment update failed.', error);
      return NextResponse.json({ error: 'Unable to update appointment status.' }, { status: error.code === 'PGRST116' ? 404 : 502 });
    }

    return NextResponse.json({ appointment: data });
  } catch (error) {
    console.error('Appointment status update failed.', error);
    return NextResponse.json({ error: 'Unable to update appointment status.' }, { status: 500 });
  }
}
