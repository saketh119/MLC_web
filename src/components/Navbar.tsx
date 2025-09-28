'use client'

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home as HomeIcon, Info as InfoIcon, Calendar as CalendarIcon, Contact as ContactIcon } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-black/95 border-b border-white/10 shadow-sm">
      <link href="/" className="flex items-center gap-3 group">
        <Image
          src="/mlc-logo.svg"
          alt="MLC Logo"
          width={40}
          height={40}
          priority
          className="w-9 h-9 drop-shadow-md group-hover:scale-105 transition-transform"
        />
        <span className="text-[10px] sm:text-xs tracking-[0.25em] font-medium text-white group-hover:text-cyan-300 transition-colors">
          MACHINE LEARNING CLUB
        </span>
      </link>
      <div className="hidden md:flex">
        <ExpandableTabs
          tabs={[
            { title: "Home", icon: HomeIcon },
            { title: "About", icon: InfoIcon },
            { type: "separator" },
            { title: "Events", icon: CalendarIcon },
            { title: "Contact", icon: ContactIcon },
          ]}
          className="bg-white/5 border border-white/10 shadow-sm hover:border-cyan-400/40 transition-colors"
          activeColor="text-cyan-400"
          inactiveColor="text-white/60 hover:text-white"
          iconClass=""
          onChange={(idx) => {
            if (idx === null) return;
            const routes = ["/", "/About", "/events", "/contact"]; // respect separator indexing
            const mapIdx = idx <= 1 ? idx : idx - 1; // separator at position 2
            const href = routes[mapIdx];
            if (href) window.location.href = href;
          }}
        />
      </div>
    </nav>
  )
}