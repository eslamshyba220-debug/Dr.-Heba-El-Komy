'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return;

    void fetch('/api/analytics/page-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_url: pathname, referrer: document.referrer || null }),
      keepalive: true,
    }).catch((error: unknown) => {
      console.error('Unable to record page view.', error);
    });
  }, [pathname]);

  return null;
}
