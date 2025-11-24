 'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackImage?: string
  allowMobileSpline?: boolean
}

export function SplineScene({ scene, className, fallbackImage, allowMobileSpline = false }: SplineSceneProps) {
  // Render a static fallback on small screens to improve performance
  const [useFallback, setUseFallback] = useState(false);
  const [canLoadSpline, setCanLoadSpline] = useState(false);

  useEffect(() => {
    const check = () => setUseFallback(window.innerWidth < 640 && !allowMobileSpline);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [allowMobileSpline]);

  // Probe the Spline scene URL before attempting to mount the Spline runtime.
  // If the fetch fails (network/CORS), we fall back to a static image to avoid
  // the runtime "Failed to fetch" error originating inside the Spline package.
  useEffect(() => {
    if (!scene || useFallback) return;

    let mounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch(scene, { method: 'GET', signal: controller.signal })
      .then((res) => {
        clearTimeout(timeout);
        if (!mounted) return;
        if (res.ok) setCanLoadSpline(true);
        else setCanLoadSpline(false);
      })
      .catch((err) => {
        clearTimeout(timeout);
        if (!mounted) return;
        console.warn('Spline scene probe failed:', err?.message || err);
        setCanLoadSpline(false);
      });

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [scene, useFallback]);

  if (useFallback) {
    return (
      <div className={className}>
        <img src={fallbackImage || '/mlc-family.jpg'} alt="scene" className="w-full h-full object-cover rounded-md" />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      {canLoadSpline ? (
        <Spline scene={scene} className={className} />
      ) : (
        <div className={className}>
          <img src={fallbackImage || '/mlc-family.jpg'} alt="scene" className="w-full h-full object-cover rounded-md" />
        </div>
      )}
    </Suspense>
  );
}