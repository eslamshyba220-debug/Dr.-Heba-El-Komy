import React, { useEffect, useState } from 'react';

const MINIMUM_LOADER_TIME = 700;
const MAXIMUM_LOADER_TIME = 1400;

export const MotionSystem: React.FC = () => {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderExiting, setLoaderExiting] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let exitTimer: number | undefined;
    let removeTimer: number | undefined;
    let dismissalScheduled = false;

    const dismissLoader = () => {
      if (dismissalScheduled) return;
      dismissalScheduled = true;
      const elapsed = performance.now() - startedAt;
      exitTimer = window.setTimeout(() => {
        setLoaderExiting(true);
        removeTimer = window.setTimeout(() => setLoaderVisible(false), 350);
      }, Math.max(0, MINIMUM_LOADER_TIME - elapsed));
    };

    if (document.readyState === 'complete') {
      dismissLoader();
    } else {
      window.addEventListener('load', dismissLoader, { once: true });
    }

    const safetyTimer = window.setTimeout(dismissLoader, MAXIMUM_LOADER_TIME);

    return () => {
      window.removeEventListener('load', dismissLoader);
      window.clearTimeout(safetyTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      if (removeTimer) window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (!loaderVisible) return null;

  return (
    <div
      className={`page-loader ${loaderExiting ? 'page-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="page-loader__content">
        <img src="/1.png" alt="" width={120} height={120} className="page-loader__logo" />
        <div className="page-loader__track" aria-hidden="true">
          <span className="page-loader__progress" />
        </div>
      </div>
    </div>
  );
};
