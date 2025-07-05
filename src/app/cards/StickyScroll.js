"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure this exists or use classnames

export const StickyScroll = ({
  content = [],
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content?.length || 0;
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardLength) return;

    const breakpoints = content.map((_, index) => index / cardLength);
    const closest = breakpoints.reduce((acc, point, idx) => {
      return Math.abs(latest - point) < Math.abs(latest - breakpoints[acc])
        ? idx
        : acc;
    }, 0);
    setActiveCard(closest);
  });

  const gradients = [
    "bg-gradient-to-br from-cyan-500 via-cyan-700 to-emerald-500",
    "bg-gradient-to-br from-pink-500 via-pink-700 to-indigo-500",
    "bg-gradient-to-br from-orange-500 via-yellow-500 to-yellow-300",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(gradients[0]);

  useEffect(() => {
    setBackgroundGradient(gradients[activeCard % gradients.length]);
  }, [activeCard]);

  // Avoid rendering if content is empty
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <motion.div
      animate={{ backgroundColor: "#000000" }}
      className="relative h-[500px] overflow-y-scroll grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl mx-auto px-4 py-12 no-scrollbar"
      ref={ref}
    >
      {/* Text content */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={`${item.title}-${index}`} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-cyan-300 transition-all duration-300"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-md mt-6 max-w-sm text-gray-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* Sticky card */}
      <div
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-lg backdrop-blur-md shadow-lg ring-1 ring-cyan-500/30 transition-all duration-500 lg:block",
          contentClassName
        )}
        style={{ background: backgroundGradient }}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};
