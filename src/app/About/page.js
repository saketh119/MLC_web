'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Timeline from '../cards/Timeline';
import { FloatingDock } from "../cards/floatingdock";
import { IconHome, IconInfoCircle, IconCalendarEvent, IconBrandLinkedin } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import { Mail, Linkedin, Instagram, Github, Youtube } from "lucide-react";
// Member card component
const MemberCard = ({ name, role, image, linkedin }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-full max-w-[280px] flex flex-col items-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
    <Image
      src={image}
      alt={name}
      width={96}
      height={96}
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-3 sm:mb-4 border-2 border-white/30"
    />
    <h3 className="text-lg sm:text-xl font-semibold text-white text-center">{name}</h3>
    <p className="text-sm text-gray-300 text-center">{role}</p>
    {linkedin && (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-blue-400 hover:text-blue-500 transition"
      >
        <IconBrandLinkedin size={20} />
      </a>
    )}
  </div>
);

// membersLimit removed by request — inline page sizes used instead

// Fallback core team (empty if user removed dummy data)
const coreTeam = [];

export default function AboutUs() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // fetch all members at once (server should limit/respond appropriately)
    fetch(`/api/members?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.members)) return setMembers(data.members);
        if (Array.isArray(data)) return setMembers(data);
        return setMembers([]);
      })
      .catch((err) => console.error('Failed to load members:', err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Navbar removed (handled by RootLayout) */}

      {/* Hero Section: ABOUT US layout */}
      <section className="px-6 md:px-12 lg:px-20 pt-10 pb-14 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[48px] sm:text-[64px] md:text-[88px] font-extrabold tracking-tight mb-8 font-black-future">
            ABOUT US !
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Big rounded image */}
            <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-white/10">
              <Image
                src="/mlc-family.jpg"
                alt="MLC Group"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Accent bar (subtle) */}
              <div className="absolute -bottom-1 left-6 h-2 w-28 bg-orange-500 rounded-full" />
            </div>

            {/* Right: About copy + stats */}
            <div className="flex flex-col">
              <h3 className="text-cyan-400 font-bold uppercase tracking-wide text-lg mb-3">ABOUT THE CLUB</h3>
              <p className="text-gray-300 leading-relaxed max-w-xl">
               Welcome to the Best Technical Club of vit-ap.A vibrant community of tech enthusiasts, innovators, and learners passionate about exploring the fascinating world of machine learning and artificial intelligence. Established in 2020, we have been at the forefront of fostering a culture of innovation and knowledge sharing among students and professionals alike.
              </p>

              {/* Stats */}
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

      {/* Timeline */}
      <Timeline />

      {/* Team Members */}
      <div className="mt-16 px-4 md:px-10 pb-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
        {Object.entries(
          members.reduce((acc, member) => {
            const category = member.category || "Others";
            if (!acc[category]) acc[category] = [];
            acc[category].push(member);
            return acc;
          }, {})
        ).map(([category, membersInCategory]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">{category}</h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {membersInCategory.map((member) => (
                <MemberCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  linkedin={member.linkedin}
                />
              ))}
            </div>
          </div>
        ))}

        
      </div>

      {/* Footer */}
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
    </div>
  );
}
