'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  CalendarDays,
  ChartNoAxesCombined,
  Clock3,
  Eye,
  LogOut,
  MessageCircle,
  RefreshCw,
  UsersRound,
} from 'lucide-react';
import type { AppointmentStatus } from '@/lib/database.types';

type Appointment = {
  id: string;
  full_name: string;
  phone_number: string;
  service_requested: string;
  appointment_time: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
};

type PageView = {
  id: string;
  page_url: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

type DashboardData = {
  kpis: {
    totalVisitors: number;
    todayVisitors: number;
    totalBookings: number;
    pendingBookings: number;
  };
  traffic: { date: string; visits: number }[];
  recentViews: PageView[];
  appointments: Appointment[];
};

type DashboardTab = 'analytics' | 'appointments';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isAppointment(value: unknown): value is Appointment {
  return isRecord(value) && typeof value.id === 'string' &&
    typeof value.full_name === 'string' && typeof value.phone_number === 'string' &&
    typeof value.service_requested === 'string' && typeof value.appointment_time === 'string' &&
    (typeof value.notes === 'string' || value.notes === null) &&
    ['pending', 'contacted', 'cancelled'].includes(String(value.status)) &&
    typeof value.created_at === 'string' && Number.isFinite(Date.parse(value.created_at));
}

function isDashboardData(value: unknown): value is DashboardData {
  if (!isRecord(value) || !isRecord(value.kpis)) return false;
  const kpis = value.kpis;

  const kpiNames: (keyof DashboardData['kpis'])[] = [
    'totalVisitors',
    'todayVisitors',
    'totalBookings',
    'pendingBookings',
  ];
  if (!kpiNames.every((key) =>
    typeof kpis[key] === 'number' && Number.isFinite(kpis[key]))) {
    return false;
  }

  if (!Array.isArray(value.traffic) || !value.traffic.every((day: unknown) =>
    isRecord(day) && typeof day.date === 'string' && Number.isFinite(Date.parse(day.date)) &&
    typeof day.visits === 'number' && Number.isFinite(day.visits))) {
    return false;
  }

  if (!Array.isArray(value.recentViews) || !value.recentViews.every((view: unknown) =>
    isRecord(view) && typeof view.id === 'string' && typeof view.page_url === 'string' &&
    (typeof view.referrer === 'string' || view.referrer === null) &&
    (typeof view.user_agent === 'string' || view.user_agent === null) &&
    typeof view.created_at === 'string' && Number.isFinite(Date.parse(view.created_at)))) {
    return false;
  }

  return Array.isArray(value.appointments) && value.appointments.every(isAppointment);
}

const statusLabels: Record<AppointmentStatus, string> = {
  pending: 'معلق',
  contacted: 'تم التواصل',
  cancelled: 'ملغي',
};

const statusStyles: Record<AppointmentStatus, string> = {
  pending: 'bg-amber-50 text-amber-800 ring-amber-200',
  contacted: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  cancelled: 'bg-rose-50 text-rose-800 ring-rose-200',
};

const dateFormatter = new Intl.DateTimeFormat('ar-EG', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Africa/Cairo',
});

const dayFormatter = new Intl.DateTimeFormat('ar-EG', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'Africa/Cairo',
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function formatPhoneForWhatsApp(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `2${digits}`;
  return digits;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('analytics');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadDashboard = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setError('');
    setSessionExpired(false);

    try {
      const response = await fetch('/api/admin/dashboard', { cache: 'no-store' });
      const contentType = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
      let result: unknown = null;
      if (contentType === 'application/json') {
        try {
          result = await response.json();
        } catch {
          result = null;
        }
      }

      if (!response.ok) {
        setSessionExpired(response.status === 401);
        const message = response.status === 401
          ? 'انتهت جلسة المسؤول. سجّل الدخول مجددًا.'
          : response.status === 503
            ? 'خدمة بيانات لوحة التحكم غير مهيأة أو غير متاحة.'
            : 'تعذر تحميل بيانات لوحة التحكم. حاول مجددًا.';
        throw new Error(message);
      }

      if (!isDashboardData(result)) {
        throw new Error('استجابة بيانات لوحة التحكم غير صالحة.');
      }
      setDashboard(result);
    } catch (loadError) {
      console.error('Unable to load dashboard data.', loadError);
      setError(loadError instanceof Error ? loadError.message : 'تعذر تحميل بيانات لوحة التحكم.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const maxVisits = useMemo(
    () => Math.max(1, ...(dashboard?.traffic.map((day) => day.visits) ?? [])),
    [dashboard?.traffic],
  );

  async function updateStatus(id: string, status: AppointmentStatus) {
    setUpdatingId(id);
    setError('');
    try {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const contentType = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
      let result: unknown = null;
      if (contentType === 'application/json') {
        try {
          result = await response.json();
        } catch {
          result = null;
        }
      }
      if (!response.ok) {
        setSessionExpired(response.status === 401);
        throw new Error(response.status === 401
          ? 'انتهت جلسة المسؤول. سجّل الدخول مجددًا.'
          : 'تعذر تحديث حالة الحجز. حاول مجددًا.');
      }
      if (!isRecord(result) || !isAppointment(result.appointment)) {
        throw new Error('استجابة تحديث الحجز غير صالحة.');
      }
      const updatedAppointment = result.appointment;
      setDashboard((current) => current
        ? { ...current, appointments: current.appointments.map((appointment) => appointment.id === id ? updatedAppointment : appointment) }
        : current);
    } catch (updateError) {
      console.error('Unable to update appointment status.', updateError);
      setError(updateError instanceof Error ? updateError.message : 'تعذر تحديث حالة الحجز.');
    } finally {
      setUpdatingId(null);
    }
  }

  async function logout() {
    setError('');
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (!response.ok) throw new Error('تعذر تسجيل الخروج.');
      window.location.assign('/admin/login');
    } catch (logoutError) {
      console.error('Admin logout failed.', logoutError);
      setError(logoutError instanceof Error ? logoutError.message : 'تعذر تسجيل الخروج.');
    }
  }

  const kpis = dashboard ? [
    { label: 'إجمالي الزيارات', value: dashboard.kpis.totalVisitors, icon: Eye, note: 'عدد مشاهدات صفحات الموقع' },
    { label: 'زيارات اليوم', value: dashboard.kpis.todayVisitors, icon: UsersRound, note: 'حسب توقيت القاهرة' },
    { label: 'إجمالي الحجوزات', value: dashboard.kpis.totalBookings, icon: CalendarDays, note: 'جميع طلبات الحجز' },
    { label: 'حجوزات معلقة', value: dashboard.kpis.pendingBookings, icon: Clock3, note: 'بانتظار المتابعة' },
  ] : [];

  return (
    <main className="min-h-screen bg-[#F6F8F6] text-[#183333]">
      <header className="border-b border-[#183333]/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold text-[#568F8F]">عيادة د. هبة الكومي</p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">لوحة التحكم</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadDashboard(true)}
              disabled={refreshing}
              className="flex h-10 items-center gap-2 rounded-xl border border-[#183333]/15 px-3 text-sm font-semibold transition hover:bg-[#F4FAF9] disabled:opacity-50"
              aria-label="تحديث البيانات"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">تحديث</span>
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              className="flex h-10 items-center gap-2 rounded-xl bg-[#183333] px-3 text-sm font-semibold text-white transition hover:bg-[#112525]"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-7 sm:py-9">
        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-[#183333]/10 bg-white p-10 text-center text-sm text-[#667575]">جارٍ تحميل بيانات لوحة التحكم...</div>
        ) : !dashboard ? (
          <div className="rounded-2xl border border-[#183333]/10 bg-white p-8 text-center">
            <p className="text-sm text-[#667575]">لم يتم تحميل بيانات لوحة التحكم.</p>
            <div className="mt-4 flex justify-center gap-3">
              {sessionExpired && (
                <a href="/admin/login" className="rounded-xl bg-[#183333] px-4 py-2 text-sm font-semibold text-white">تسجيل الدخول</a>
              )}
              <button
                type="button"
                onClick={() => void loadDashboard(true)}
                disabled={refreshing}
                className="rounded-xl border border-[#183333]/15 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                {refreshing ? 'جارٍ إعادة المحاولة...' : 'إعادة المحاولة'}
              </button>
            </div>
          </div>
        ) : dashboard ? (
          <>
            <section aria-label="مؤشرات الأداء" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map(({ label, value, icon: Icon, note }) => (
                <article key={label} className="rounded-2xl border border-[#183333]/10 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#667575]">{label}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#70B0B0]/15 text-[#397D7D]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-bold tabular-nums">{value.toLocaleString('ar-EG')}</p>
                  <p className="mt-1 text-xs text-[#7C8989]">{note}</p>
                </article>
              ))}
            </section>

            <div className="mt-7 flex gap-2 overflow-x-auto border-b border-[#183333]/10">
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                aria-current={activeTab === 'analytics' ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === 'analytics' ? 'border-[#70B0B0] text-[#183333]' : 'border-transparent text-[#667575] hover:text-[#183333]'}`}
              >
                <ChartNoAxesCombined className="h-4 w-4" />
                التحليلات
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appointments')}
                aria-current={activeTab === 'appointments' ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === 'appointments' ? 'border-[#70B0B0] text-[#183333]' : 'border-transparent text-[#667575] hover:text-[#183333]'}`}
              >
                <CalendarDays className="h-4 w-4" />
                الحجوزات
                {dashboard.kpis.pendingBookings > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">{dashboard.kpis.pendingBookings.toLocaleString('ar-EG')}</span>
                )}
              </button>
            </div>

            {activeTab === 'analytics' ? (
              <section className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <article className="rounded-2xl border border-[#183333]/10 bg-white p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#70B0B0]/15 text-[#397D7D]">
                      <Activity className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-bold">حركة الزيارات اليومية</h2>
                      <p className="mt-1 text-xs text-[#7C8989]">آخر ٧ أيام — توقيت القاهرة</p>
                    </div>
                  </div>
                  <div className="flex h-56 items-end gap-2 border-b border-[#183333]/10 px-1 sm:gap-4">
                    {dashboard.traffic.map((day) => {
                      const height = Math.max(4, (day.visits / maxVisits) * 100);
                      return (
                        <div key={day.date} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                          <span className="text-[11px] font-semibold tabular-nums text-[#667575]">{day.visits.toLocaleString('ar-EG')}</span>
                          <div
                            className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#70B0B0] to-[#9ACCCC] transition-all"
                            style={{ height: `${height}%` }}
                            title={`${day.visits} زيارة`}
                          />
                          <span className="mb-2 w-full truncate text-center text-[10px] text-[#7C8989]">{dayFormatter.format(new Date(`${day.date}T12:00:00`))}</span>
                        </div>
                      );
                    })}
                  </div>
                </article>

                <article className="rounded-2xl border border-[#183333]/10 bg-white p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#70B0B0]/15 text-[#397D7D]">
                      <Eye className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-bold">أحدث مشاهدات الصفحات</h2>
                      <p className="mt-1 text-xs text-[#7C8989]">آخر ١٠ زيارات مسجلة</p>
                    </div>
                  </div>
                  {dashboard.recentViews.length ? (
                    <ul className="divide-y divide-[#183333]/10">
                      {dashboard.recentViews.map((view) => (
                        <li key={view.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                          <span className="min-w-0 truncate text-sm font-medium" dir="ltr">{view.page_url}</span>
                          <time className="shrink-0 text-[11px] text-[#7C8989]" dateTime={view.created_at}>{formatDate(view.created_at)}</time>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-xl bg-[#F4FAF9] p-4 text-sm text-[#667575]">لا توجد زيارات مسجلة حتى الآن.</p>
                  )}
                </article>
              </section>
            ) : (
              <section className="mt-5 overflow-hidden rounded-2xl border border-[#183333]/10 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#183333]/10 px-5 py-4 sm:px-6">
                  <div>
                    <h2 className="font-bold">طلبات الحجز</h2>
                    <p className="mt-1 text-xs text-[#7C8989]">أحدث ١٠٠ طلب — الأحدث أولاً</p>
                  </div>
                  <span className="text-xs text-[#667575]">{dashboard.appointments.length.toLocaleString('ar-EG')} طلب</span>
                </div>
                {dashboard.appointments.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1050px] border-collapse text-right text-sm">
                      <thead className="bg-[#F4FAF9] text-xs text-[#667575]">
                        <tr>
                          <th className="px-4 py-3 font-semibold">المريض</th>
                          <th className="px-4 py-3 font-semibold">الهاتف</th>
                          <th className="px-4 py-3 font-semibold">الخدمة</th>
                          <th className="px-4 py-3 font-semibold">الموعد المطلوب</th>
                          <th className="px-4 py-3 font-semibold">الملاحظات</th>
                          <th className="px-4 py-3 font-semibold">تاريخ الطلب</th>
                          <th className="px-4 py-3 font-semibold">الحالة والإجراء</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#183333]/10">
                        {dashboard.appointments.map((appointment) => (
                          <tr key={appointment.id} className="align-top transition hover:bg-[#FAFDFC]">
                            <td className="max-w-48 px-4 py-4 font-semibold">{appointment.full_name}</td>
                            <td className="whitespace-nowrap px-4 py-4" dir="ltr">{appointment.phone_number}</td>
                            <td className="max-w-48 px-4 py-4">{appointment.service_requested}</td>
                            <td className="max-w-48 px-4 py-4">{appointment.appointment_time}</td>
                            <td className="max-w-56 whitespace-pre-wrap px-4 py-4 text-xs leading-6 text-[#667575]">{appointment.notes || '—'}</td>
                            <td className="whitespace-nowrap px-4 py-4 text-xs text-[#667575]">
                              <time dateTime={appointment.created_at}>{formatDate(appointment.created_at)}</time>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex min-w-40 flex-col items-start gap-2">
                                <label className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[appointment.status]}`}>
                                  {statusLabels[appointment.status]}
                                </label>
                                <select
                                  aria-label={`تحديث حالة حجز ${appointment.full_name}`}
                                  value={appointment.status}
                                  disabled={updatingId === appointment.id}
                                  onChange={(event) => void updateStatus(appointment.id, event.target.value as AppointmentStatus)}
                                  className="w-full rounded-lg border border-[#183333]/15 bg-white px-2 py-1.5 text-xs outline-none focus:border-[#70B0B0] disabled:opacity-50"
                                >
                                  <option value="pending">معلق</option>
                                  <option value="contacted">تم التواصل</option>
                                  <option value="cancelled">ملغي</option>
                                </select>
                                <a
                                  href={`https://wa.me/${formatPhoneForWhatsApp(appointment.phone_number)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#E9F7EF] px-2.5 py-1.5 text-xs font-semibold text-[#176B45] transition hover:bg-[#D5F1E1]"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                  واتساب
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center text-sm text-[#667575]">لا توجد طلبات حجز حتى الآن.</div>
                )}
              </section>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-[#183333]/10 bg-white p-8 text-center">
            <p className="text-sm text-[#667575]">تعذر عرض لوحة التحكم.</p>
            <button type="button" onClick={() => void loadDashboard(true)} className="mt-4 rounded-lg bg-[#183333] px-4 py-2 text-sm font-semibold text-white">إعادة المحاولة</button>
          </div>
        )}
      </div>
    </main>
  );
}
