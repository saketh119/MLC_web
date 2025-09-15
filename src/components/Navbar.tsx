'use client'

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home as HomeIcon, Info as InfoIcon, Calendar as CalendarIcon } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-transparent">
      <div className="text-[10px] sm:text-xs tracking-[0.25em] font-medium text-white">
        MACHINE LEARNING CLUB
      </div>
      <div className="hidden md:flex">
        <ExpandableTabs
          tabs={[
            { title: "Home", icon: HomeIcon },
            { title: "About", icon: InfoIcon },
            { type: "separator" },
            { title: "Events", icon: CalendarIcon },
          ]}
          className="bg-white/5 border border-white/10 shadow-sm hover:border-cyan-400/40 transition-colors"
          activeColor="text-cyan-400"
          onChange={(idx) => {
            if (idx === null) return;
            const routes = ["/", "/About", "/events"]; // respect separator indexing
            const mapIdx = idx <= 1 ? idx : idx - 1;
            const href = routes[mapIdx];
            if (href) window.location.href = href;
          }}
        />
      </div>
    </nav>
  )
}