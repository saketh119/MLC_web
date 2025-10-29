'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackImage?: string
}

export function SplineScene({ scene, className, fallbackImage }: SplineSceneProps) {
  // Always render the Spline 3D scene (desktop and mobile) so the same robot appears
  // on all viewports. Keep the Suspense fallback for slow network/JS load.
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-black/20 rounded-md overflow-hidden">
          {fallbackImage ? (
            <img src={fallbackImage} alt="scene fallback" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center p-6">
              {/* simple robot SVG fallback */}
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
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}