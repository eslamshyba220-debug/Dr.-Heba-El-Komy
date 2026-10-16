import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import { getCairoDateKey, getCairoDayStart } from '@/lib/cairo-time';
import { createSupabaseAdminClient, SupabaseConfigurationError } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!(await hasAdminSession())) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const supabase = createSupabaseAdminClient();
    const startOfToday = getCairoDayStart();
    const startOfTrend = getCairoDayStart(6);
    const [
      totalViews,
      todayViews,
      totalAppointments,
      pendingAppointments,
      recentViews,
      trendViews,
      appointments,
    ] = await Promise.all([
      supabase.from('page_views').select('id', { count: 'exact', head: true }),
      supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', startOfToday),
      supabase.from('appointments').select('id', { count: 'exact', head: true }),
      supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('page_views').select('id,page_url,referrer,user_agent,created_at').order('created_at', { ascending: false }).limit(10),
      supabase.from('page_views').select('created_at').gte('created_at', startOfTrend).order('created_at', { ascending: true }).limit(10000),
      supabase.from('appointments').select('id,full_name,phone_number,service_requested,appointment_time,notes,status,created_at').order('created_at', { ascending: false }).limit(100),
    ]);

    const resultErrors = [
      totalViews.error,
      todayViews.error,
      totalAppointments.error,
      pendingAppointments.error,
      recentViews.error,
      trendViews.error,
      appointments.error,
    ].filter(Boolean);
    if (resultErrors.length) {
      console.error('Supabase dashboard query failed.', resultErrors);
      return NextResponse.json({ error: 'Unable to load dashboard data.' }, { status: 502 });
    }

    const countsByDate = new Map<string, number>();
    for (let offset = 6; offset >= 0; offset -= 1) {
      countsByDate.set(getCairoDateKey(new Date(getCairoDayStart(offset))), 0);
    }
    for (const view of trendViews.data ?? []) {
      const key = getCairoDateKey(new Date(view.created_at));
      countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1);
    }

    return NextResponse.json({
      kpis: {
        totalVisitors: totalViews.count ?? 0,
        todayVisitors: todayViews.count ?? 0,
        totalBookings: totalAppointments.count ?? 0,
        pendingBookings: pendingAppointments.count ?? 0,
      },
      traffic: Array.from(countsByDate, ([date, visits]) => ({ date, visits })),
      recentViews: recentViews.data ?? [],
      appointments: appointments.data ?? [],
    });
  } catch (error) {
    console.error('Admin dashboard request failed.', error);
    if (error instanceof SupabaseConfigurationError) {
      return NextResponse.json({ error: 'Dashboard data service is not configured.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Unable to load dashboard data.' }, { status: 500 });
  }
}
