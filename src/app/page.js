'use client';
import React from "react";
import { StickyScroll } from "./cards/StickyScroll";
import Experience from "./cards/Experience";
import Head from "next/head";
import { FloatingDock } from "./cards/floatingdock";
import { IconHome, IconInfoCircle, IconCalendarEvent } from "@tabler/icons-react";

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
];

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
        />
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
            {/* Desktop Floating Dock */}
            <div className="hidden md:flex">
              <FloatingDock
                items={navItems}
                desktopClassName="fixed top-4 right-4 rounded-2xl bg-cyan-400/10"
              />
            </div>

            {/* Mobile Floating Dock */}
            <div className="md:hidden">
              <FloatingDock
                items={navItems}
                mobileClassName="fixed top-4 right-4 z-50"
              />
            </div>
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
        This isn't just a motto — it's our mission.
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

        {/* Club Highlights and Experience Sections */}
        <section className="w-full px-4 sm:px-10 lg:px-24 xl:px-32 py-12 bg-black text-white no-scrollbar">
       <h2 className="text-3xl font-bold text-center mt-2 mb-6"> what we do</h2>
        <StickyScroll
  content={[
    {
      title: "Hackathons",
      description: "We regularly participate and win inter-college hackathons.",
      content: <img src="/images/hackathon.jpg" alt="Hackathon" className="w-full h-full object-cover" />,
    },
    {
      title: "Workshops",
      description: "Hands-on sessions conducted by industry experts and seniors.",
      content: <img src="/images/workshop.jpg" alt="Workshop" className="w-full h-full object-cover" />,
    },
    {
      title: "Achievements",
      description: "We’ve been awarded Best Technical Club of VIT-AP 2023-2024.",
      content: <img src="/images/award.jpg" alt="Award" className="w-full h-full object-cover" />,
    },
     {
      title: "Bootcamps",
      description: "Hands-on sessions conducted by industry experts and seniors.",
      content: <img src="/images/workshop.jpg" alt="Workshop" className="w-full h-full object-cover" />,
    },
      {
      title: "codeathons & Ideathons",
      description: "Hands-on sessions conducted by industry experts and seniors.",
      content: <img src="/images/workshop.jpg" alt="Workshop" className="w-full h-full object-cover" />,
    },
      {
      // title: "Bootcamps",
      // description: "Hands-on sessions conducted by industry experts and seniors.",
      // content: <img src="/images/workshop.jpg" alt="Workshop" className="w-full h-full object-cover" />,
    }
  ]}
  
/>
</section>
<section className="bg-black text-white py-16 px-6 md:px-5" id="experience">
  <h2 className="text-3xl font-bold text-center mb-12">what people say about us</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “Being a part of MLC shaped my technical journey. The exposure to AI/ML research and the club culture gave me confidence to pursue innovation fearlessly.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/akhil.jpg" alt="Akhil Reddy" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Akhil Reddy</div>
          <div className="text-gray-400 text-sm">Former President (2023-24)</div>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “Leading the projects division taught me how to work with teams, manage deadlines, and deliver real-world tech solutions. MLC is where you grow beyond the classroom.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/sreevidya.jpg" alt="Sree Vidya" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Sree Vidya</div>
          <div className="text-gray-400 text-sm">Projects Head (2022-23)</div>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “I joined as a volunteer and ended up leading major events. MLC empowered me with leadership, technical, and networking skills that I carry even today.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/meghana.jpg" alt="Meghana K" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Meghana K</div>
          <div className="text-gray-400 text-sm">Core Member (2021-22)</div>
        </div>
      </div>
    </div>
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “Being a part of MLC shaped my technical journey. The exposure to AI/ML research and the club culture gave me confidence to pursue innovation fearlessly.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/akhil.jpg" alt="Akhil Reddy" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Akhil Reddy</div>
          <div className="text-gray-400 text-sm">Former President (2023-24)</div>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “Leading the projects division taught me how to work with teams, manage deadlines, and deliver real-world tech solutions. MLC is where you grow beyond the classroom.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/sreevidya.jpg" alt="Sree Vidya" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Sree Vidya</div>
          <div className="text-gray-400 text-sm">Projects Head (2022-23)</div>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
      <p className="text-gray-300 mb-4">
        “I joined as a volunteer and ended up leading major events. MLC empowered me with leadership, technical, and networking skills that I carry even today.”
      </p>
      <div className="flex items-center mt-6">
        <img src="/images/meghana.jpg" alt="Meghana K" className="w-12 h-12 rounded-full mr-4 border border-cyan-400" />
        <div>
          <div className="text-cyan-400 font-semibold">Meghana K</div>
          <div className="text-gray-400 text-sm">Core Member (2021-22)</div>
        </div>
      </div>
    </div>
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
