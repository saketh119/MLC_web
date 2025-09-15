"use client"
import Head from "next/head"
import Image from "next/image"
import { IconHome, IconInfoCircle, IconCalendarEvent } from "@tabler/icons-react"
import { FloatingDock } from "./cards/floatingdock"
import { StickyScroll } from "./cards/StickyScroll"
import Chatbot from "./components/Chatbot"
import { SplineScene } from "@/components/ui/splite"
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
        {/* Navbar now rendered globally via RootLayout */}
        {/* Hero Section */}
        <section className="px-6 lg:px-16 pt-6 pb-14 max-w-[1400px] mx-auto">
          {/* Top thin line */}
          <div className="h-px bg-white/60 w-full mb-6" />
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Title Block */}
            <div className="flex-1 relative">
              {/* Blue dots above title */}
              <div className="flex gap-4 mb-4 pl-2">
                <span className="w-3 h-3 rounded-full bg-[#0094FF] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#0094FF] inline-block" />
              </div>
              <h1 className="font-extrabold leading-[0.9] text-[54px] sm:text-[72px] md:text-[92px] tracking-tight select-none font-black-future">
                <span className="block">MACHINE</span>
                <span className="block mt-4">LEARNING CLUB</span>
              </h1>
            </div>
            {/* Right Pill + Text replaced with Spline Card */}
            <div className="w-full lg:w-[560px] h-[360px] md:h-[420px] relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
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
          <div className="mt-12 flex w-full max-w-[1100px] justify-between text-left">
            {[
              { num: '200', label: 'STUDENTS' },
              { num: '125', label: 'Events' },
              { num: '6', label: 'Years' },
              { num: '25', label: 'Patents' }
            ].map((s,idx)=> (
              <div key={idx} className="flex-1 flex flex-col items-start pl-2 relative">
                <div className="flex items-end gap-1">
                  <span className="text-[76px] font-extrabold leading-none font-black-future">{s.num}</span>
                  <span className="text-[#0094FF] text-5xl font-extrabold leading-none mb-1">+</span>
                </div>
                <span className="text-xs tracking-wider mt-2">{s.label}</span>
                {idx !== 3 && <div className="absolute top-1/2 -right-[1px] -translate-y-1/2 h-40 w-px bg-white/40" />}
              </div>
            ))}
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
        <section className="w-full px-4 sm:px-10 lg:px-24 xl:px-32 py-20 bg-gradient-to-b from-black/20 to-black/40 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
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
                title: "Achievements",
                description:
                  "We've been awarded Best Technical Club of VIT-AP 2023-2024, recognizing our excellence.",
                content: (
                  <img
                    // TODO: Replace with your Cloudinary secure_url for Achievements
                    src="https://res.cloudinary.com/djl3h6ql8/image/upload/v1757875771/mlc_events/couhsclljjdtg0fkbjie.jpg"
                    alt="Award"
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
            ]}
          />
        </section>
        {/* Testimonials */}
        <section className="bg-black text-white py-16 px-6 md:px-5" id="experience">
          <h2 className="text-3xl font-bold text-center mb-12">what people say about us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Being a part of MLC shaped my technical journey. The exposure to AI/ML research and the club culture gave me confidence to pursue innovation fearlessly.",
                img: "/images/akhil.jpg",
                name: "Irfan Saddiq",
                role: "Former President (2023-24)",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "Leading the projects division taught me how to work with teams, manage deadlines, and deliver real-world tech solutions. MLC is where you grow beyond the classroom.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757850255/mlc_events/zxwrkldcimoeictqwy9g.jpg",
                name: "Abu Suleman",
                role: "Former Club Advisor",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "I joined as a volunteer and ended up leading major events. MLC empowered me with leadership, technical, and networking skills that I carry even today.",
                img: "/images/meghana.jpg",
                name: "Yashasvi Koushik",
                role: "Former Club Advisor",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "Managing events at MLC gave me valuable leadership experience, while mentorship and peer support accelerated my growth in AI/ML projects beyond the classroom.ntorship and peer support in MLC accelerated my growth in AI/ML projects far beyond classrooms.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757848280/mlc_events/lqacwoisnrywhotpuwi6.jpg",
                name: "Preetham Reddy",
                role: "Former Vice President",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "Working on real-world datasets with the team gave me confidence to pursue internships in data science.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757849387/mlc_events/xr3d4yupydy3c3u9zeec.jpg",
                name: "Krishna Reddy",
                role: "Former Projects Manager",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "From hackathons to workshops, every event pushed me to think bigger and build faster with confidence.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757848682/mlc_events/w8tkdjlnrqmohjlhenyk.jpg",
                name: "Rajesh Andra",
                role: "Former Research Manager",
                border: "border-cyan-600",
                ring: "border-cyan-400",
              },
              {
                quote:
                  "MLC gave me the platform to present ideas and collaborate with brilliant minds across domains.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757871603/mlc_events/djtudgtwqjpcs6qe3acd.jpg",
                name: "Sathwik Sangani",
                role: "Former President",
                border: "border-purple-600",
                ring: "border-purple-400",
              },
              {
                quote:
                  "The exposure to competitive coding and ML challenges helped me sharpen problem-solving skills.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757849254/mlc_events/ltemudphhov90z45mcua.jpg",
                name: "Sai Krishna",
                role: "Former Club Manager",
                border: "border-emerald-600",
                ring: "border-emerald-400",
              },
              {
                quote:
                  "MLC gave me the platform to present ideas and collaborate with brilliant minds across domains.",
                img: "https://res.cloudinary.com/djl3h6ql8/image/upload/v1757847529/mlc_events/bifsbpnt4socpsrpi0ls.jpg",
                name: "Nithya Ancha",
                role: "Former Club Manager",
                border: "border-pink-600",
                ring: "border-pink-400",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-gray-900 rounded-lg p-6 shadow-md hover:scale-105 transition-transform border ${card.border}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Left: Portrait + name/role */}
                  <div className="w-full md:w-44 flex flex-col items-center">
                    <img
                      src={card.img}
                      alt={card.name}
                      className={`w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover border ${card.ring}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_CLOUDINARY_AVATAR;
                      }}
                    />
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-cyan-400 leading-tight">{card.name}</div>
                      <div className="text-gray-400 text-xs">{card.role}</div>
                    </div>
                  </div>
                  {/* Right: Quote */}
                  <div className="flex-1 text-gray-300 text-sm leading-relaxed">
                    <p className="">“{card.quote}”</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 text-center py-8 mt-8">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-gray-400 text-sm mb-4">Empowering the next generation of AI innovators at VIT-AP</p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
            </p>
          </div>
        </footer>
        <Chatbot />
      </div>
      <style jsx>{`
        .animate-marquee { animation: marquee 10s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
      `}</style>
    </>
  )
}
