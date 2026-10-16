import { NextResponse } from 'next/server';
import { hasSameOrigin } from '@/lib/request-origin';
import { createSupabaseAdminClient } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid page view.' }, { status: 400 });
  }

  const { page_url, referrer } = body as { page_url?: unknown; referrer?: unknown };
  if (
    typeof page_url !== 'string' ||
    !page_url.startsWith('/') ||
    page_url.startsWith('//') ||
    page_url.length > 500 ||
    page_url.includes('?') ||
    page_url.includes('#')
  ) {
    return NextResponse.json({ error: 'Invalid page URL.' }, { status: 400 });
  }

  let safeReferrer: string | null = null;
  if (typeof referrer === 'string' && referrer.length <= 2000) {
    try {
      const parsedReferrer = new URL(referrer);
      if (parsedReferrer.protocol === 'http:' || parsedReferrer.protocol === 'https:') {
        safeReferrer = `${parsedReferrer.origin}${parsedReferrer.pathname}`.slice(0, 500);
      }
    } catch {
      safeReferrer = null;
    }
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from('page_views').insert({
      page_url,
      referrer: safeReferrer,
      user_agent: request.headers.get('user-agent')?.slice(0, 1000) ?? null,
    });

    if (error) {
      console.error('Supabase page view insert failed.', error);
      return NextResponse.json({ error: 'Unable to record page view.' }, { status: 502 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Page view tracking failed.', error);
    return NextResponse.json({ error: 'Unable to record page view.' }, { status: 500 });
  }
}
