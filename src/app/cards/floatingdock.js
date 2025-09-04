"use client"
import { cn } from "@/lib/utils"
import { IconLayoutNavbarCollapse } from "@tabler/icons-react"
import { useState } from "react"

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
  return (
    <>
      <FloatingDockMobile items={items} className={mobileClassName} />
      <FloatingDockDesktop items={items} className={desktopClassName} />
    </>
  )
}

const FloatingDockDesktop = ({ items, className }) => {
  return (
    <div
      className={cn(
        "mx-auto hidden h-16 items-center gap-4 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-2xl md:flex hover:shadow-cyan-400/10 transition-all duration-300",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  )
}

function IconContainer({ title, icon, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={href} title={title} aria-label={title}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center group w-10 h-10 transition-all duration-300 hover:scale-110"
      >
        {/* Tooltip */}
        {hovered && (
          <div className="absolute -top-12 left-1/2 w-max -translate-x-1/2 rounded-lg bg-black/90 backdrop-blur-sm px-3 py-2 text-sm text-white shadow-xl border border-white/10 z-50">
            {title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
          </div>
        )}

        {/* Icon */}
        <div
          className="flex items-center justify-center text-white relative z-10 transition-all duration-300"
          style={{
            filter: hovered ? "drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))" : "none",
          }}
        >
          {icon}
        </div>

        {/* Glow background */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-sm transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1.2)" : "scale(0.8)",
          }}
        />
      </div>
    </a>
  )
}

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn("relative block md:hidden", className)}>
      {open && (
        <div className="absolute inset-x-0 top-full mt-2 flex flex-col gap-3 z-50">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="transition-all duration-300"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: `${(items.length - 1 - idx) * 50}ms`,
              }}
            >
              <a
                href={item.href}
                className="flex w-14 h-14 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300 group"
              >
                <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-200">{item.icon}</div>
              </a>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300"
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <IconLayoutNavbarCollapse className="h-6 w-6 text-white" />
      </button>
    </div>
  )
}
