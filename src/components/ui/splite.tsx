 'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackImage?: string
}

export function SplineScene({ scene, className, fallbackImage }: SplineSceneProps) {
  // Render a static fallback on small screens to improve performance
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const check = () => setUseFallback(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

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
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}