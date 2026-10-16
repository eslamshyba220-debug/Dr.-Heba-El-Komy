'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AlertCircle, LockKeyhole } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result: { error?: string } = await response.json();
      if (!response.ok) {
        setError(result.error ?? 'تعذر تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch (submitError) {
      console.error('Admin login request failed.', submitError);
      setError('تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 text-[#183333]">
      <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#70B0B0]/15 text-[#397D7D]">
            <Image src="/1.png" alt="شعار عيادة د. هبة الكومي" width={64} height={64} priority className="h-full w-full rounded-2xl object-contain" />
          </div>
          <p className="mb-2 text-sm font-semibold text-[#568F8F]">عيادة د. هبة الكومي</p>
          <h1 className="text-3xl font-bold">لوحة إدارة العيادة</h1>
          <p className="mt-3 text-sm leading-7 text-[#667575]">سجّل الدخول لمتابعة الحجوزات وإحصائيات الموقع.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[#183333]/10 bg-white p-7 shadow-[0_20px_60px_rgba(24,51,51,0.08)] sm:p-9">
          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm leading-6 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="admin-username" className="block text-sm font-semibold">اسم المستخدم</label>
            <input
              id="admin-username"
              name="username"
              type="text"
              autoComplete="username"
              required
              maxLength={200}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#183333]/15 bg-[#FAFDFC] px-4 text-sm outline-none transition focus:border-[#70B0B0] focus:ring-2 focus:ring-[#70B0B0]/20"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="admin-password" className="block text-sm font-semibold">كلمة المرور</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={200}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#183333]/15 bg-[#FAFDFC] px-4 text-sm outline-none transition focus:border-[#70B0B0] focus:ring-2 focus:ring-[#70B0B0]/20"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#183333] px-5 font-semibold text-white transition hover:bg-[#112525] disabled:cursor-wait disabled:opacity-60"
          >
            <LockKeyhole className="h-4 w-4 text-[#70B0B0]" aria-hidden="true" />
            {isSubmitting ? 'جارٍ التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>
        <a href="/" className="mt-6 text-center text-sm text-[#667575] transition hover:text-[#183333]">العودة إلى الموقع</a>
      </div>
    </main>
  );
}
