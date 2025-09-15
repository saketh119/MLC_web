'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Timeline from '../cards/Timeline';
import { FloatingDock } from "../cards/floatingdock";
import { IconHome, IconInfoCircle, IconCalendarEvent, IconBrandLinkedin } from '@tabler/icons-react';

// Dummy core team data (replace with real data later)
const coreTeam = [
  { name: "Akhil Reddy", role: "President", initials: "AR", linkedin: "https://linkedin.com" },
  { name: "Irfan Saddiq", role: "Vice President", initials: "IS", linkedin: "https://linkedin.com" },
  { name: "Preetham Reddy", role: "General Secretary", initials: "PR", linkedin: "https://linkedin.com" },
  { name: "Sathwik Sangani", role: "Tech Lead", initials: "SS", linkedin: "https://linkedin.com" },
  { name: "Krishna Reddy", role: "Projects Head", initials: "KR", linkedin: "https://linkedin.com" },
  { name: "Rajesh Andra", role: "Research Lead", initials: "RA", linkedin: "https://linkedin.com" },
  { name: "Abu Suleman", role: "Operations Lead", initials: "AS", linkedin: "https://linkedin.com" },
  { name: "Meghana K", role: "Design Lead", initials: "MK", linkedin: "https://linkedin.com" },
  { name: "Sree Vidya", role: "Outreach Lead", initials: "SV", linkedin: "https://linkedin.com" },
  { name: "Bhavya Sri", role: "Event Coordinator", initials: "BS", linkedin: "https://linkedin.com" },
  { name: "Harsha Vardhan", role: "AI Engineer", initials: "HV", linkedin: "https://linkedin.com" },
  { name: "Tanvi Rao", role: "Content Strategist", initials: "TR", linkedin: "https://linkedin.com" },
  { name: "Aditya Jain", role: "Data Lead", initials: "AJ", linkedin: "https://linkedin.com" },
  { name: "Ritika Sharma", role: "ML Engineer", initials: "RS", linkedin: "https://linkedin.com" },
  { name: "Yash Gupta", role: "Core Member", initials: "YG", linkedin: "https://linkedin.com" },
  { name: "Navya Patel", role: "Core Member", initials: "NP", linkedin: "https://linkedin.com" },
];

// Member card component
const MemberCard = ({ name, role, image, linkedin }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 w-64 flex flex-col items-center shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
    <Image
      src={image}
      alt={name}
      width={96}
      height={96}
      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white/30"
    />
    <h3 className="text-xl font-semibold text-white">{name}</h3>
    <p className="text-sm text-gray-300">{role}</p>
    {linkedin && (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-blue-400 hover:text-blue-500 transition"
      >
        <IconBrandLinkedin size={24} />
      </a>
    )}
  </div>
);

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
];

export default function AboutUs() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data));
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
                Lorem ipsum dolor sit amet consectetur. Dignissim facilisi accumsan pharetra aliquet
                vestibulum facilisis eros adipiscing. Consectetur habitasse commodo ut volutpat.
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
            <div className="flex flex-wrap justify-center gap-8">
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

        {/* Static Core Team Grid (16 square boxes) */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">Core Team (2025–2026)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {coreTeam.map((member, i) => (
              <div key={member.name + i} className="flex flex-col items-center group">
                <div
                  className="relative aspect-square w-full max-w-[140px] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-700/30 to-blue-800/30 border border-cyan-400/30 group-hover:border-cyan-300/60 backdrop-blur-md shadow-md group-hover:shadow-cyan-500/20 transition duration-300 flex items-center justify-center"
                >
                  <span className="text-cyan-200 font-semibold text-2xl tracking-wide select-none">{member.initials}</span>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 text-cyan-300 hover:text-cyan-200 transition"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <IconBrandLinkedin size={22} />
                    </a>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-cyan-200 leading-tight">{member.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4"></p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md text-center py-6 mt-1">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
