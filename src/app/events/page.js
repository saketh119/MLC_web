'use client';
import { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IconHome, IconInfoCircle, IconCalendarEvent } from '@tabler/icons-react';
import Head from "next/head"; 
import React from "react";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { FloatingDock } from "../cards/floatingdock";

<Navbar />;

// Helper to detect Cloudinary URLs
const isCloudinary = (u) => typeof u === 'string' && u.includes('res.cloudinary.com');
// Toggle S3 fallback/proxy attempts (default off). Set NEXT_PUBLIC_ENABLE_S3_FALLBACK=1 to enable.
const ENABLE_S3_FALLBACK = process.env.NEXT_PUBLIC_ENABLE_S3_FALLBACK === '1';

// Derive S3-like filenames from event title, trying multiple encodings and extensions
function buildImageCandidates(title) {
  if (!title || typeof title !== 'string') return [];
  const trimmed = title.trim();
  // Common encodings seen in your bucket: +, %20, hyphen, underscore
  const baseNames = Array.from(new Set([
    trimmed,
    trimmed.replace(/\s+/g, '+'),
    trimmed.replace(/\s+/g, '-'),
    trimmed.replace(/\s+/g, '_'),
    encodeURIComponent(trimmed),
  ]));
  // Also try removing punctuation
  const alnum = trimmed.replace(/[^\w\s-]/g, '');
  baseNames.push(
    alnum,
    alnum.replace(/\s+/g, '+'),
    alnum.replace(/\s+/g, '-'),
    alnum.replace(/\s+/g, '_'),
    encodeURIComponent(alnum)
  );
  const exts = ['.jpeg', '.jpg', '.png', '.webp', '.JPEG', '.JPG', '.PNG', '.WEBP'];
  const bases = Array.from(new Set(baseNames)).map(v => `https://mlcevents.s3.eu-north-1.amazonaws.com/${v}`);
  const urls = [];
  for (const b of bases) {
    for (const e of exts) urls.push(`${b}${e}`);
  }
  return Array.from(new Set(urls));
}

function SmartImage({ title, provided, className, eager = false }) {
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
    const idx = candidates.findIndex(u => u === src);
    let next = idx + 1;
    if (next < candidates.length) {
      setSrc(candidates[next]);
      return;
    }
    // As a last resort, try the proxy route if current src looked like S3
    if (ENABLE_S3_FALLBACK) {
      try {
        const u = new URL(src || candidates[0]);
        if (u.hostname.includes('s3')) {
          const proxied = `/api/images/proxy?url=${encodeURIComponent(u.href)}`;
          setSrc(proxied);
          return;
        }
      } catch {}
    }
    setSrc('/vercel.svg');
  };

  if (!src) return <img src={'/vercel.svg'} alt={title} className={className} loading={eager ? 'eager' : 'lazy'} />;
  return <img src={src} onError={onError} alt={title} className={className} loading={eager ? 'eager' : 'lazy'} />;
}

// Static dummy event metadata (2-3 line descriptions)
const dummyEvents = [
  { title: "Freshers Fusion", tag: "Workshop", desc: "Hands-on intro to ML pipelines and model deployment. Build, train, and ship a mini model." },
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
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch events and images in parallel
    Promise.all([
      fetch('/api/events').then(r => r.ok ? r.json() : []),
      fetch('/api/images?limit=200').then(r => r.ok ? r.json() : { images: [] }),
    ])
      .then(([ev, img]) => {
        setEvents(Array.isArray(ev) ? ev : []);
        const list = Array.isArray(img?.images) ? img.images : (Array.isArray(img) ? img : []);
        setImages(list);
      })
      .catch(err => console.error('Error fetching events/images:', err));

    AOS.init({ once: true, duration: 1000 });
  }, []);

  // Build quick lookup: first try exact title match; else fuzzy by removing non-alphanum spacing
  const imageByTitle = useMemo(() => {
    const map = new Map();
    const norm = (s) => (s || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s/g, '');

    for (const img of images) {
      const t = img?.title || img?.filename || '';
      const key1 = t.trim().toLowerCase();
      const key2 = norm(t);
      if (key1) map.set(key1, img);
      if (key2 && key2 !== key1) map.set(key2, img);
    }
    return map;
  }, [images]);

  // Locate Freshers Fusion event and its best image URL
  const freshersHighlight = useMemo(() => {
    if (!Array.isArray(events) || events.length === 0) return null;
    const norm = (s) => (s || '')
      .toString()
      .trim()
      .toLowerCase();
    const isFreshers = (t) => norm(t) === 'freshers fusion';
    const e = events.find((ev) => isFreshers(ev?.name) || isFreshers(ev?.['Event Name']) || isFreshers(ev?.title));
    if (!e) return null;

    const title = e?.name ?? e?.['Event Name'] ?? e?.title ?? 'Freshers Fusion';
    // Event-provided URL (could be legacy S3)
    let providedUrl = Array.isArray(e?.imageUrls) && e.imageUrls.length > 0
      ? e.imageUrls[0]
      : (e?.imageUrl || e?.['Image Url'] || e?.image || null);

    // Try match from uploaded images by title
    const key1 = title.trim().toLowerCase();
    const key2 = key1.replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, '').replace(/\s/g, '');
    const match = imageByTitle.get(key1) || imageByTitle.get(key2);
    if (match?.servedUrl) {
      // Prefer Cloudinary over any legacy URL
      if (isCloudinary(match.servedUrl)) {
        providedUrl = match.servedUrl;
      } else if (!providedUrl) {
        providedUrl = match.servedUrl;
      }
    }

    return { title, url: providedUrl };
  }, [events, imageByTitle]);

  // Build highlight tiles from actual events (first two), fallback to dummy
  const highlightTiles = useMemo(() => {
    const tiles = [];
    // Start from events and bubble "Freshers Fusion" to the front
    let list = Array.isArray(events) ? [...events] : [];
    if (list.length > 0) {
      const needle = 'freshers fusion';
      const idx = list.findIndex((e) => {
        const t = (e?.name ?? e?.['Event Name'] ?? e?.title ?? '').toString().trim().toLowerCase();
        return t === needle;
      });
      if (idx > 0) {
        const [item] = list.splice(idx, 1);
        list.unshift(item);
      }
    }

    if (list.length > 0) {
      const top = list.slice(0, 2);
      for (const e of top) {
        const title = e?.name ?? e?.['Event Name'] ?? e?.title ?? 'Untitled Event';
        let url = Array.isArray(e?.imageUrls) && e.imageUrls.length > 0
          ? e.imageUrls[0]
          : (e?.imageUrl || e?.['Image Url'] || e?.image || null);
        // Prefer Cloudinary match when available; else fallback as before
        const key1 = title.trim().toLowerCase();
        const key2 = key1.replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, '').replace(/\s/g, '');
        const match = imageByTitle.get(key1) || imageByTitle.get(key2);
        if (match?.servedUrl) {
          if (isCloudinary(match.servedUrl)) {
            url = match.servedUrl;
          } else if (!url) {
            url = match.servedUrl;
          }
        }
        const desc = e?.description ?? e?.['Description'] ?? '';
        tiles.push({ title, tag: 'Highlight', desc, url });
      }
    }
    if (tiles.length === 0) {
      // Fallback to existing dummy tiles
      for (const ev of dummyEvents) tiles.push({ title: ev.title, tag: ev.tag, desc: ev.desc, url: null });
    }
    return tiles;
  }, [events, imageByTitle]);

  // Ensure "Freshers Fusion" appears first in the rendered list
  const displayedEvents = useMemo(() => {
    if (!Array.isArray(events) || events.length === 0) return [];
    const needle = 'freshers fusion';
    const idx = events.findIndex((e) => {
      const t = (e?.name ?? e?.['Event Name'] ?? e?.title ?? '').toString().trim().toLowerCase();
      return t === needle;
    });
    if (idx <= 0) return events; // already first or not found
    const copy = [...events];
    const [item] = copy.splice(idx, 1);
    copy.unshift(item);
    return copy;
  }, [events]);

  return (
    <>
       <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://mlcevents.s3.eu-north-1.amazonaws.com" />
        <link rel="dns-prefetch" href="//mlcevents.s3.eu-north-1.amazonaws.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
      </Head>

      <div className="bg-black text-white min-h-screen font-sans">
        {/* Navbar removed (handled by RootLayout) */}
<section className="px-6 md:px-12 lg:px-20 pt-10 pb-14 bg-black text-white">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-[48px] sm:text-[64px] md:text-[88px] font-extrabold tracking-tight mb-8 font-black-future">
      EVENTS !
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Left: Big rounded image */}
      <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-white/10">
        <Image
          src="/mlc-family.jpg"
          alt="MLC Events Collage"
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute -bottom-1 left-6 h-2 w-28 bg-orange-500 rounded-full" />
      </div>

      {/* Right: About copy + stats */}
      <div className="flex flex-col">
        <h3 className="text-cyan-400 font-bold uppercase tracking-wide text-lg mb-3">ABOUT THE EVENTS</h3>
        <p className="text-gray-300 leading-relaxed max-w-xl">
          Explore our workshops, hackathons, seminars, and showcase nights. We create hands-on
          experiences where ideas turn into real projects and teams learn by building.
        </p>

        <div className="grid grid-cols-2 gap-x-10 gap-y-10 mt-10">
          <div>
            <div className="text-6xl md:text-7xl font-extrabold font-black-future">200<span className="text-cyan-400">+</span></div>
            <div className="text-[11px] uppercase tracking-wider mt-2 text-cyan-400">Students</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-extrabold font-black-future">125<span className="text-cyan-400">+</span></div>
            <div className="text-[11px] uppercase tracking-wider mt-2 text-cyan-400">Events</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-extrabold font-black-future">6<span className="text-cyan-400">+</span></div>
            <div className="text-[11px] uppercase tracking-wider mt-2 text-cyan-400">Years</div>
          </div>
          <div>
            <div className="text-6xl md:text-7xl font-extrabold font-black-future">25<span className="text-cyan-400">+</span></div>
            <div className="text-[11px] uppercase tracking-wider mt-2 text-cyan-400">Patents</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* Events Section */}
        <section className="py-12 px-4" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Our Events</h1>

          {/* Static Dummy Upcoming Events (8 boxes, 16:9) */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {highlightTiles.map((tile, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div
                    className="group relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-white/10 hover:border-cyan-400/40 shadow-md hover:shadow-cyan-500/10 transition duration-300"
                  >
                    <SmartImage
                      title={tile.title}
                      provided={tile.url || null}
                      className="absolute inset-0 w-full h-full object-cover"
                      eager={i === 0}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <span className="text-[11px] tracking-wider uppercase text-cyan-300/80 mb-2">{tile.tag}</span>
                      <h3 className="text-lg font-semibold text-white">{tile.title}</h3>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed px-1">
                    {tile.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayedEvents.map((raw, idx) => {
              const id = raw?._id?.toString?.() || raw?._id?.$oid || raw?.id || idx;
              const title = raw?.name ?? raw?.["Event Name"] ?? "Untitled Event";
              const desc = raw?.description ?? raw?.["Description"] ?? "No description provided.";
              const dateVal = raw?.date ?? raw?.["Date"] ?? null;
              let providedUrl = Array.isArray(raw?.imageUrls) && raw.imageUrls.length > 0
                ? raw.imageUrls[0]
                : (raw?.imageUrl || raw?.["Image Url"] || raw?.image || null);

              // Try to find a matching image doc by title; prefer Cloudinary
              const t1 = title.trim().toLowerCase();
              const t2 = t1.replace(/\s+/g, ' ').replace(/[^a-z0-9 ]/g, '').replace(/\s/g, '');
              const match = imageByTitle.get(t1) || imageByTitle.get(t2);
              if (match?.servedUrl) {
                if (isCloudinary(match.servedUrl)) {
                  providedUrl = match.servedUrl;
                } else if (!providedUrl) {
                  providedUrl = match.servedUrl;
                }
              }

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
