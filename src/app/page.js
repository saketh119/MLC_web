"use client"
import { useState } from 'react'
import Head from "next/head"
import Image from "next/image"
import { IconHome, IconInfoCircle, IconCalendarEvent, IconBrandLinkedin } from "@tabler/icons-react"
import { FloatingDock } from "./cards/floatingdock"
import { StickyScroll } from "./cards/StickyScroll"
import Chatbot from "./components/Chatbot"
import { SplineScene } from "@/components/ui/splite"
import { Mail, Linkedin, Instagram, Github, Youtube } from "lucide-react";

import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Home as HomeIcon, Info as InfoIcon, Calendar as CalendarIcon } from "lucide-react"

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
]

// Fallback avatar when local images are missing
const DEFAULT_CLOUDINARY_AVATAR = "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757847529/mlc_events/bifsbpnt4socpsrpi0ls.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
      </Head>
      <div className="bg-black text-white min-h-screen font-sans">
    
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-12 pt-6 pb-14">

          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start max-w-[1400px] mx-auto">
            {/* Left Title Block */}
            <div className="flex-1 relative">
             
              <h1 className="font-extrabold leading-[0.9] text-[54px] sm:text-[72px] md:text-[92px] tracking-tight select-none font-black-future">
                <span className="block">MACHINE</span>
                <span className="block mt-4">LEARNING CLUB</span>
              </h1>
              {/* Club short intro */}
              <div className="mt-4 max-w-xl">
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-5 shadow-lg">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    We are a student‑led community exploring the art and science of Machine Learning.
                    From zero‑to‑one workshops and hands‑on bootcamps to hackathons and research sprints,
                    we learn by building and share what we discover.
                  </p>
                  
                  <div className="mt-5">
                    <button
                      onClick={() => {
                        const url = process.env.NEXT_PUBLIC_JOIN_FORM_URL;
                        if (url) {
                          window.location.href = url;
                        } else {
                          // show a quick message using a small DOM alert — we keep this simple
                          const msg = "We're not accepting new recruitments currently, you can contact us directly if needed.";
                          // Try a nicer in-page toast if available, otherwise use alert
                          if (typeof window !== 'undefined') {
                            try {
                              // create a temporary toast element
                              const el = document.createElement('div');
                              el.textContent = msg;
                              el.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-700 text-white px-4 py-2 rounded shadow-lg z-50';
                              document.body.appendChild(el);
                              setTimeout(() => el.remove(), 4500);
                            } catch (e) {
                              alert(msg);
                            }
                          }
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 text-xs font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 transition"
                    >
                      Join Now
                      <span className="text-lg leading-none">→</span>
                    </button>
                  </div>
                  <div className="absolute -top-1 left-6 h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full" />
                </div>
              </div>
            </div>
            {/* Right Pill + Text replaced with Spline Card */}
            <div className="w-full lg:w-[560px] h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
                fallbackImage="/mlc-family.jpg"
              />
            </div>
          </div>
          {/* Badge + line to stars */}
          <div className="mt-10">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white text-xs tracking-wide font-medium">
                <span className="text-[13px]">♕</span>
                BEST TECHNICAL CLUB 2023-24
              </div>
              {/* Thin line stretching to the right */}
                <div className="flex-1 h-px bg-white/40" />
                {/* Star group at the end of the line */}
                <div className="hidden md:flex items-center gap-6 text-white text-xl pr-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i}>✦</span>
                  ))}
                </div>
            </div>
          </div>
          {/* Stats with separators */}
          <div className="mt-12 w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: '200', label: 'STUDENTS' },
                { num: '125', label: 'Events' },
                { num: '6', label: 'Years' },
                { num: '25', label: 'Patents' }
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col items-start md:items-center lg:items-start p-2">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl md:text-[76px] font-extrabold leading-none font-black-future">{s.num}</span>
                    <span className="text-[#0094FF] text-2xl md:text-5xl font-extrabold leading-none mb-1">+</span>
                  </div>
                  <span className="text-xs tracking-wider mt-2">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Bottom Gallery removed as requested; you can add manual images here later */}
        {/* Family Photo */}
        <section className="px-4 md:px-12">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/mlc-family.jpg"
              alt="MLC Family"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>
        </section>
        
        
        {/* Enhanced What We Do Section */}
        <section className="w-full px-4 sm:px-10 lg:px-10 xl:px-32 py-10 bg-gradient-to-b from-black/20 to-black/40 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full" />
          </div>
          <StickyScroll
            content={[
              {
                title: "Hackathons",
                description:
                  "We regularly participate and win inter-college hackathons, pushing the boundaries of innovation.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Hackathons
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/f_auto,q_auto,c_fill,w_600,h_400/v1234567890/mlc_events/replace_hackathons.jpg"
                    alt="Hackathon"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              {
                title: "Workshops",
                description:
                  "Hands-on sessions conducted by industry experts and seniors, bridging theory with practice.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Workshops
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/v1757875241/mlc_events/oj8ttkguywjxvg4rbcji.jpg"
                    alt="Workshop"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              
              {
                title: "Bootcamps",
                description:
                  "Intensive learning experiences that transform beginners into skilled practitioners.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Bootcamps
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/f_auto,q_auto,c_fill,w_600,h_400/v1234567890/mlc_events/replace_bootcamps.jpg"
                    alt="Bootcamp"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              {
                title: "Codeathons & Ideathons",
                description:
                  "Competitive events that foster creativity, problem-solving, and collaborative innovation.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Codeathons & Ideathons
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/f_auto,q_auto,c_fill,w_600,h_400/v1234567890/mlc_events/replace_codeathons.jpg"
                    alt="Competition"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              {
                title: "Achievements",
                description:
                  "We&apos;                                                                                                                                                                                                                                          ve been awarded Best Technical Club of VIT-AP 2023-2024, recognizing our excellence.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Achievements
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/v1757875771/mlc_events/couhsclljjdtg0fkbjie.jpg"
                    alt="Award"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
            ]}
          />
        </section>
        {/* Testimonials */}
        <section
  className="bg-black text-white py-20 px-6 md:px-12 lg:px-20"
  id="experience"
>
  <h2 className="text-4xl font-extrabold text-center mb-16 tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
    What People Say About Us
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      // Example data (add the rest as needed)
      {
        quote:
          "Being a part of MLC shaped my technical journey. The exposure to AI/ML research and the club culture gave me confidence to pursue innovation fearlessly.",
        img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757963300/mlc_events/cbrthxaheayjei0wrrhx.jpg",
        name: "Irfan Saddiq",
        role: "President (2023-24)",
        linkedin: "https://www.linkedin.com/in/irfan-saddiq",
      },
      {
        quote:
          "Leading the projects division taught me how to work with teams, manage deadlines, and deliver real-world tech solutions. MLC is where you grow beyond the classroom.",
        img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757850255/mlc_events/zxwrkldcimoeictqwy9g.jpg",
        name: "Abu Suleman",
        role: "Club Advisor (2023-24)",
        linkedin: "https://www.linkedin.com/in/abu-suleman",
      },
      {
                quote:
                  "I joined as a volunteer and ended up leading major events. MLC empowered me with leadership, technical, and networking skills that I carry even today.",
                img: "/images/meghana.jpg",
                name: "Yashasvi Koushik",
                role: "Club Advisor(2023-25)",
                linkedin: "https://www.linkedin.com/in/yashasvi-koushik",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "Managing events at MLC gave me valuable leadership experience, while mentorship and peer support accelerated my growth in AI/ML projects beyond the classroom.ntorship and peer support in MLC accelerated my growth in AI/ML projects far beyond classrooms.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757848280/mlc_events/lqacwoisnrywhotpuwi6.jpg",
                name: "Preetham Reddy",
                role: "Vice President(2024-25)",
                linkedin: "https://www.linkedin.com/in/preetham-reddy",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "Working on real-world datasets with the team gave me confidence to pursue internships in data science.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757849387/mlc_events/xr3d4yupydy3c3u9zeec.jpg",
                name: "Krishna Reddy",
                role: "Projects Manager(2024-25)",
                linkedin: "https://www.linkedin.com/in/krishna-reddy",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "From hackathons to workshops, every event pushed me to think bigger and build faster with confidence.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757848682/mlc_events/w8tkdjlnrqmohjlhenyk.jpg",
                name: "Rajesh Andra",
                role: "Research Manager(2024-25)",
                linkedin: "https://www.linkedin.com/in/rajesh-andra",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "MLC gave me the platform to present ideas and collaborate with brilliant minds across domains.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757871603/mlc_events/djtudgtwqjpcs6qe3acd.jpg",
                name: "Sathwik Sangani",
                role: "President(2024-25)",
                linkedin: "https://www.linkedin.com/in/sathwik-sangani",
                border: "border-purple-600",
                ring: "border-purple-400",
              },
              {
                quote:
                  "The exposure to competitive coding and ML challenges helped me sharpen problem-solving skills.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757849254/mlc_events/ltemudphhov90z45mcua.jpg",
                name: "Sai Krishna",
                role: "Club Manager(2024-25)",
                linkedin: "https://www.linkedin.com/in/sai-krishna",
                border: "border-emerald-600",
                ring: "border-emerald-400",
              },
              {
                quote:
                  "MLC gave me the platform to present ideas and collaborate with brilliant minds across domains.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757847529/mlc_events/bifsbpnt4socpsrpi0ls.jpg",
                name: "Nithya Ancha",
                role: "Club Manager (2023-24)",
                linkedin: "https://www.linkedin.com/in/nithya-ancha",
                border: "border-pink-600",
                ring: "border-pink-400",
              },
    
    ].map((card, i) => (
      <div
        key={i}
        className="group flex flex-col md:flex-row items-start bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-transparent transition-all duration-200 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"
        style={{ minHeight: '220px' }} // fixed height for all cards
      >
        {/* LinkedIn */}
        {card.linkedin && (
          <a
            href={card.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 text-cyan-400 hover:text-pink-400 transition-colors duration-200"
          >
            <IconBrandLinkedin size={22} stroke={1.6} />
          </a>
        )}

        {/* Left: Image + details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 space-y-3">
          <img
            src={card.img}
            alt={card.name}
            onError={(e) => {
              try {
                // Prevent infinite retry loops: if already attempted fallback, don't reset again
                const el = e.currentTarget;
                if (el.dataset.__avatarErrored) return;
                el.dataset.__avatarErrored = '1';
                // Use a known existing fallback image in the repo
                el.src = '/mlc-default.jpg';
              } catch (err) {
                // swallow
              }
            }}
            className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)] group-hover:shadow-[0_0_25px_rgba(255,0,255,0.4)] transition-all duration-200"
          />
          <h3 className="text-lg font-semibold text-cyan-400 group-hover:text-pink-400 transition-colors duration-200">
            {card.name}
          </h3>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            {card.role}
          </p>
        </div>

        {/* Right: Quote */}
        <div className="flex-1 mt-4 md:mt-0 md:ml-6 border-l border-cyan-500 pl-6">
          <blockquote className="text-gray-300 text-sm leading-relaxed italic bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 p-4 rounded-lg h-full flex items-center">
            “{card.quote}”
          </blockquote>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* Footer */}
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
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
          </p>
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
        {/* <Chatbot /> */}
      </div>
      <style jsx>{`
        .animate-marquee { animation: marquee 10s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
      `}</style>
    </>
  )
}
