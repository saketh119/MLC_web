'use client';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IconHome, IconInfoCircle, IconCalendarEvent } from '@tabler/icons-react';
import Head from "next/head"; 
import React from "react";
import { FloatingDock } from "../cards/floatingdock";

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/about" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
];

// Derive S3-like filenames from event title, trying multiple encodings and extensions
function buildImageCandidates(title) {
  if (!title || typeof title !== 'string') return [];
  const trimmed = title.trim();
  // Common encodings seen in your bucket: + for spaces, %20 for spaces
  const variants = [
    trimmed.replace(/\s+/g, '+'),
    encodeURIComponent(trimmed),
    trimmed.replace(/\s+/g, ' '),
  ];
  const exts = ['.jpeg', '.jpg', '.png', '.webp'];
  const bases = variants.map(v => `https://mlcevents.s3.eu-north-1.amazonaws.com/${v}`);
  const urls = [];
  for (const b of bases) {
    for (const e of exts) urls.push(`${b}${e}`);
  }
  return Array.from(new Set(urls));
}

function SmartImage({ title, provided, className }) {
  const [src, setSrc] = useState(provided || null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const list = buildImageCandidates(title);
    setCandidates(list);
    // Reset when title or provided changes
    setSrc(provided || (list[0] || null));
  }, [title, provided]);

  const onError = () => {
    if (!candidates.length) {
      setSrc('/vercel.svg');
      return;
    }
    const next = candidates.findIndex(u => u === src) + 1;
    if (next < candidates.length) setSrc(candidates[next]);
    else setSrc('/vercel.svg');
  };

  if (!src) return <img src={'/vercel.svg'} alt={title} className={className} />;
  return <img src={src} onError={onError} alt={title} className={className} />;
}

// Static dummy event metadata (2-3 line descriptions)
const dummyEvents = [
  { title: "AI Bootcamp", tag: "Workshop", desc: "Hands-on intro to ML pipelines and model deployment. Build, train, and ship a mini model." },
  { title: "HackNight 2.0", tag: "Hackathon", desc: "An overnight rapid prototyping sprint where teams solve real-world problem statements with AI." },
  { title: "Vision Quest", tag: "Seminar", desc: "Dive into computer vision trends: transformers, multimodal fusion, and edge deployment tactics." },
  { title: "Data Drift Lab", tag: "Hands-on", desc: "Explore dataset bias, drift detection, and model monitoring strategies in production-like settings." },
  { title: "GenAI Playground", tag: "Demo Day", desc: "Showcase of prompt engineering, fine‑tuning strategies, and creative LLM applications." },
  { title: "Quant Masters", tag: "Session", desc: "Math for ML: optimization intuition, loss landscapes, gradients, and convergence pitfalls simplified." },
  { title: "Edge AI Sprint", tag: "Challenge", desc: "Optimize models for low-power devices; prune, quantize, benchmark, iterate, and deploy." },
  { title: "Research Primer", tag: "Meetup", desc: "How to read papers, form hypotheses, replicate experiments, and publish impactful results." },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setEvents(data) : setEvents([]))
      .catch(err => console.error('Error fetching events:', err));

    AOS.init({ once: true, duration: 1000 });
  }, []);

  return (
    <>
       <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-black text-white min-h-screen font-sans">
        {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md">
  {/* Left Section */}
  <div className="flex items-center space-x-3 w-[280px]">
    <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-black font-bold">
      ML
    </div>
    <div className="flex flex-col leading-tight">
      <h1
        className="text-xl sm:text-2xl font-extrabold tracking-wide whitespace-nowrap"
        style={{
          fontFamily: "Orbitron, sans-serif",
          background: "linear-gradient(to right, #00FFFF, #007BFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        MACHINE LEARNING
      </h1>
      <span className="text-xs text-white/80 font-light mt-1">
        Campus Club at VIT-AP
      </span>
    </div>
  </div>

  {/* Right Section (Floating Dock) */}
  <div className="w-[280px] flex justify-end">
        {/* Floating Dock Navbar */}
        <FloatingDock
          items={navItems}
          desktopClassName="fixed top-4 right-4  rounded-2xl bg-cyan-400/10   "
          mobileClassName="fixed top-6 right-4 z-50"
        />
          </div>
        </nav>
<section className="px-6 md:px-20 py-20 bg-black text-white">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* Left Content */}
    <div>
      <h1
        className="text-4xl sm:text-3xl md:text-6xl lg:text-6xl font-extrabold tracking-wide text-center md:text-left leading-tight whitespace-nowrap"
        style={{
          textShadow: "0 0 8px #00ffff, 0 0 16px #00ffff, 0 0 24px #00ffff"
        }}
      >
        Learn <span className="text-cyan-400">||</span> Code <span className="text-cyan-400">||</span> Innovate
      </h1>

      <p className="mt-0 text-sm text-gray-300 max-w-xl text-center md:text-left">
        This isn&apos;t just a motto — it&apos;s our mission.
      </p>
      <p className="text-md text-gray-300 mt-8 max-w-xl text-center md:text-left">
         Join the Best Technical Club of VIT-AP, where curiosity meets innovation.
          Engage in hands-on learning, develop groundbreaking projects, and be part
          of a community that&apos;s shaping the future of AI & ML.</p>

      {/* CTA Button */}
      <div className="mt-8 flex justify-center md:justify-start">
        <button
          className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-full text-white font-semibold shadow-md"
          onClick={() => {
            // 🔒 Registration Closed — show alert
            alert("MLC isn't open for new registrations now, please come back later.");

            // ✅ Registration Open — redirect to Google Form
            // window.open('https://your-google-form-link.com', '_blank');
          }}
        >
          Join the Club Now
        </button>
      </div>
    </div>

    {/* Right side: (empty or image if needed) */}
  </div>
</section>


        {/* Events Section */}
        <section className="py-12 px-4" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Our Events</h1>

          {/* Static Dummy Upcoming Events (8 boxes, 16:9) */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dummyEvents.map((ev, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div
                    className="group relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-white/10 hover:border-cyan-400/40 shadow-md hover:shadow-cyan-500/10 transition duration-300"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <span className="text-[11px] tracking-wider uppercase text-cyan-300/80 mb-2">{ev.tag}</span>
                      <h3 className="text-lg font-semibold text-white">{ev.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed px-1">
                    {ev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((raw, idx) => {
              const id = raw?._id?.toString?.() || raw?._id?.$oid || raw?.id || idx;
              const title = raw?.name ?? raw?.["Event Name"] ?? "Untitled Event";
              const desc = raw?.description ?? raw?.["Description"] ?? "No description provided.";
              const dateVal = raw?.date ?? raw?.["Date"] ?? null;
              const providedUrl = Array.isArray(raw?.imageUrls) && raw.imageUrls.length > 0
                ? raw.imageUrls[0]
                : (raw?.imageUrl || raw?.["Image Url"] || raw?.image || null);

              return (
                <div
                  key={id}
                  className="glass-card rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition duration-300"
                  data-aos="fade-up"
                >
                  <SmartImage title={title} provided={providedUrl} className="w-full h-52 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-sm mb-2 text-gray-300">{desc}</p>
                    <p className="text-xs text-gray-500">
                      {dateVal ? new Date(dateVal).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-md text-center py-6 mt-1">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
