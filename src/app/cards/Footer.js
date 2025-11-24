import { Mail, Linkedin, Instagram, Github, Youtube } from "lucide-react";
import Link from 'next/link';
import React from "react";

export default function Footer() {
  return (

<footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Email */}
        <div className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors text-sm">
          <Mail size={16} />
          <a href="mailto:ml.club@vitap.ac.in">ml.club@vitap.ac.in</a>
        </div>

        {/* Center: Info lines */}
        <div className="text-center text-sm">
          <p className="text-gray-400">
            Empowering the next generation of AI innovators at VIT-AP
          </p>
          <div className="flex items-center gap-4 justify-center mt-2">
            <Link href="/contact" className="text-sm text-gray-300 hover:text-cyan-300">Contact</Link>
            <span className="text-gray-500 text-xs">© {new Date().getFullYear()} Machine Learning Club, VIT-AP.</span>
          </div>
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/company/machinelearningclubvitap/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.instagram.com/mlc_vitap?igsh=MTc5cGZzaXU5cXo5YQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://github.com/MLC-VIT-AP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.youtube.com/@MLCVIT-AP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </footer>
    );
}