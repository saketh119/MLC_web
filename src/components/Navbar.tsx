'use client'

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home as HomeIcon, Info as InfoIcon, Calendar as CalendarIcon, Mail as MailIcon, Menu, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black/95 border-b border-cyan-400/20 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-5 group">
        <Image
          src="/logo-primary.png"
          alt="MLC Logo"
          width={56}
          height={56}
          priority
          className="w-14 h-14 drop-shadow-md group-hover:scale-105 transition-transform"
        />
        <span className="text-base sm:text-lg md:text-xl tracking-[0.14em] font-bold text-white group-hover:text-cyan-300 transition-colors">
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
            { title: "Blogs", icon: BookOpen },
            { title: "Contact", icon: MailIcon },
          ]}
          className="bg-white/5 border border-cyan-400/20 shadow-sm hover:border-cyan-400/40 transition-colors"
          activeColor="text-cyan-400"
          inactiveColor="text-white/60 hover:text-white"
          iconClass=""
          onChange={(idx) => {
            if (idx === null) return;
            const routes = ["/", "/About", "/events", "/blogs", "/contact"];
            const href = routes[idx];
            if (href) window.location.href = href;
          }}
        />
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <button onClick={() => setOpen(!open)} className="text-white">
          <Menu size={28} />
        </button>

        {open && (
          <div className="absolute right-0 top-12 bg-black/95 border border-cyan-400/20 rounded-xl shadow-lg p-4 flex flex-col gap-3 w-40">
            <Link href="/" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/About" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>About</Link>
            <Link href="/events" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Events</Link>
            <Link href="/blogs" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Blogs</Link>
            <Link href="/contact" className="text-white hover:text-cyan-400" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
