'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Timeline from '../cards/Timeline';
import { FloatingDock } from "../cards/floatingdock";
import {
  IconHome,
  IconInfoCircle,
  IconCalendarEvent,
  IconBrandLinkedin,
} from '@tabler/icons-react';

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
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

export default function AboutUs() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-3 w-[280px]">
          <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-black font-bold">ML</div>
          <div className="flex flex-col leading-tight">
            <h1
              className="text-xl sm:text-2xl font-extrabold tracking-wide whitespace-nowrap"
              style={{
                fontFamily: "var(--font-orbitron)",
                background: "linear-gradient(to right, #00FFFF, #007BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MACHINE LEARNING
            </h1>
            <span className="text-xs text-white/80 font-light mt-1">Campus Club at VIT-AP</span>
          </div>
        </div>

        <div className="w-[280px] flex justify-end">
          <FloatingDock
            items={navItems}
            desktopClassName="fixed top-4 right-4 rounded-2xl bg-cyan-400/10"
            mobileClassName="fixed top-6 right-4 z-50"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-20 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              of a community that&apos;s shaping the future of AI &amp; ML.
            </p>

            <div className="mt-8 flex justify-center md:justify-start">
              <button
                className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-full text-white font-semibold shadow-md"
                onClick={() => {
                  alert("MLC isn’t open for new registrations now, please come back later.");
                }}
              >
                Join the Club Now
              </button>
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
