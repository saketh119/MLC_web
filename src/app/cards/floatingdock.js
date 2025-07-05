/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}) => {
  return (
    <>
     
      <FloatingDockMobile items={items} className={mobileClassName}/>
      <FloatingDockDesktop items={items} className={desktopClassName}/>
    </>
  );
};
const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={e => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // keep your positioning + styling
        "mx-auto hidden h-16 items-center gap-4 rounded-2xl bg-cyan-400/10 backdrop-blur-md border border-cyan-400/30 px-4 py-2 shadow-lg md:flex",
        className
      )}
    >
      {items.map(item => (
        <IconContainer key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // compute distance, springs, etc. as before, but we’ll only use a single spring for icon size:
  const distance = useTransform(mouseX, val => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const iconSize = useSpring(
    useTransform(distance, [-100, 0, 100], [20, 36, 20]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  return (
    <a href={href} title={title} aria-label={title}>
      <motion.div
        ref={ref}
        style={{ width: iconSize, height: iconSize }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center"
      >
        {/* optional tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute -top-8 left-1/2 w-max -translate-x-1/2 rounded bg-black/80 px-2 py-0.5 text-xs text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* icon itself—pure white, no bg */}
        <motion.div className="flex items-center justify-center text-white">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 top-full mt-2 flex flex-col gap-2 z-50"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
  href={item.href}
  className="flex w-12 h-12 items-center justify-center rounded-full bg-cyan-400/10 backdrop-blur-md text-white shadow-lg hover:bg-cyan-500/20 transition duration-200"
>
  <div className="w-6 h-6">{item.icon}</div>
</a>

              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};
