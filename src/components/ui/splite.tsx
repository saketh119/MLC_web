'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackImage?: string
  // if true (default) defer loading the heavy Spline runtime until the element
  // is visible or the browser becomes idle; set to false to force immediate load
  defer?: boolean
  // idle delay (ms) fallback before load if intersection doesn't happen
  idleDelayMs?: number
}

export function SplineScene({ scene, className, fallbackImage, defer = true, idleDelayMs = 700 }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(!defer);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!defer) return;

    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let idleId: number | null = null;
    const el = containerRef.current;

    // If IntersectionObserver is available, wait until the element is visible
    if (typeof IntersectionObserver !== 'undefined' && el) {
      io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            if (io) io.disconnect();
            return;
          }
        }
      }, { rootMargin: '200px' });
      io.observe(el);
    }

    // As a safety net, load during idle or after a short timeout
    const rIC = (window as any).requestIdleCallback;
    if (rIC) {
      try {
        idleId = rIC(() => { if (!cancelled) setShouldLoad(true); }, { timeout: Math.max(1200, idleDelayMs) });
      } catch (e) {
        // fall through to timeout
      }
    }

    const to = window.setTimeout(() => {
      if (!cancelled) setShouldLoad(true);
    }, Math.max(900, idleDelayMs));

    return () => {
      cancelled = true;
      if (io) io.disconnect();
      if (idleId && (window as any).cancelIdleCallback) (window as any).cancelIdleCallback(idleId);
      clearTimeout(to);
    };
  }, [defer, idleDelayMs]);

  // Fallback/placeholder (robot SVG) — shown immediately until Spline mounts
  const placeholder = (
    <div className={className} ref={containerRef}>
      <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-md overflow-hidden">
        {fallbackImage ? (
          <img src={fallbackImage} alt="scene fallback" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center p-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="7" width="18" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.2" fill="#111827" />
              <circle cx="8" cy="12" r="1.2" fill="#60A5FA" />
              <circle cx="16" cy="12" r="1.2" fill="#60A5FA" />
              <rect x="10" y="3" width="4" height="3" rx="1" fill="#374151" stroke="#9CA3AF" />
              <rect x="6" y="17" width="3" height="2" rx="0.5" fill="#374151" />
              <rect x="15" y="17" width="3" height="2" rx="0.5" fill="#374151" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (!shouldLoad) return placeholder;

  return (
    <div className={className} ref={containerRef}>
      <Suspense
        fallback={placeholder}
      >
        <Spline
          scene={scene}
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}