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
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {events.map((event, idx) => (
              <div
                key={event._id?.$oid || idx}
                className="glass-card rounded-xl overflow-hidden border border-white/10 hover:shadow-xl transition duration-300"
                data-aos="fade-up"
              >
                <img
                  src={event["Image Url"] || "/placeholder.png"}
                  alt={event["Event Name"] || "Event"}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{event["Event Name"] || "Untitled Event"}</h2>
                  <p className="text-sm mb-2 text-gray-300">{event["Description"] || "No description provided."}</p>
                  <p className="text-xs text-gray-500">
                    {event["Date"] ? new Date(event["Date"]).toLocaleDateString() : "Invalid Date"}
                  </p>
                </div>
              </div>
            ))}
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
