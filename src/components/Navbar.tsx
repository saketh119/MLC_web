'use client'

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home as HomeIcon, Info as InfoIcon, Calendar as CalendarIcon, Mail as MailIcon, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-black/95 border-b border-white/10 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
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
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ExpandableTabs
          tabs={[
            { title: "Home", icon: HomeIcon },
            { title: "About", icon: InfoIcon },
            { title: "Events", icon: CalendarIcon },
            { title: "Contact", icon: MailIcon },
          ]}
          className="bg-white/5 border border-white/10 shadow-sm hover:border-cyan-400/40 transition-colors"
          activeColor="text-cyan-400"
          inactiveColor="text-white/60 hover:text-white"
          iconClass=""
          onChange={(idx) => {
            if (idx === null) return;
            const routes = ["/", "/About", "/events", "/contact"];
            const href = routes[idx];
            if (href) window.location.href = href;
          }}
        />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <button onClick={() => setOpen(!open)} className="text-white">
          <Menu size={24} />
        </button>

        {open && (
          <div className="absolute right-0 top-12 bg-black/95 border border-white/10 rounded-xl shadow-lg p-4 flex flex-col gap-3 w-40">
            <Link href="/" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/About" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>About</Link>
            <Link href="/events" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Events</Link>
            <Link href="/contact" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
