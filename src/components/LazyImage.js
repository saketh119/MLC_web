"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, alt = '', className = '', placeholder = '/mlc-default.jpg' }) {
  const ref = useRef(null);
  const [current, setCurrent] = useState(placeholder || '');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;

    const loadReal = () => {
      // If this is a local asset (starts with '/'), load immediately by setting src
      if (src && src.startsWith('/')) {
        if (!cancelled) setCurrent(src);
        return;
      }

      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!cancelled) setCurrent(src);
      };
      img.onerror = () => {
        // keep placeholder on error
      };
    };

    if (typeof IntersectionObserver !== 'undefined' && ref.current) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // prioritize loading when visible
            try {
              if (typeof requestIdleCallback !== 'undefined') {
                requestIdleCallback(loadReal, { timeout: 800 });
              } else {
                // small delay to allow painting of placeholder
                setTimeout(loadReal, 50);
              }
            } catch (e) {
              setTimeout(loadReal, 50);
            }
            io.disconnect();
          }
        });
      }, { rootMargin: '300px' });

      io.observe(ref.current);

      return () => {
        cancelled = true;
        io.disconnect();
      };
    }

    // Fallback: load after short timeout / idle
    const fallbackTimer = setTimeout(() => {
      loadReal();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [src]);

  // Add a data attribute so we can see real src in DOM if needed
  return (
    <img
      ref={ref}
      src={current}
      data-src={src}
      alt={alt}
      className={className + (current !== src ? ' transition-filter duration-300 blur-sm' : '')}
      loading={current === src ? 'eager' : 'lazy'}
      fetchPriority={current === src ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
