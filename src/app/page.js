"use client"
<<<<<<< HEAD

=======
>>>>>>> e878a7a68703a7fa806ac49fedf31811d0cfd092
import { StickyScroll } from "./cards/StickyScroll"
import Head from "next/head"
import { FloatingDock } from "./cards/floatingdock"
import { IconHome, IconInfoCircle, IconCalendarEvent } from "@tabler/icons-react"
import WatchIntroButton from "./cards/watchintrobutton"
import { Code2, Lightbulb, BookOpen, Cpu, Zap } from "lucide-react"
import { useState, useEffect } from "react"
<<<<<<< HEAD
import Chatbot from "./components/Chatbot";


=======
>>>>>>> e878a7a68703a7fa806ac49fedf31811d0cfd092

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/" },
  { title: "About", icon: <IconInfoCircle />, href: "/About" },
  { title: "Events", icon: <IconCalendarEvent />, href: "/events" },
]

const codeSnippets = [
  "import tensorflow as tf",
  "model = tf.keras.Sequential()",
  "model.add(Dense(128, activation='relu'))",
  "model.compile(optimizer='adam')",
]

export default function Home() {
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false)
      setTimeout(() => {
        setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length)
        setIsTyping(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

<<<<<<< HEAD
  

=======
>>>>>>> e878a7a68703a7fa806ac49fedf31811d0cfd092
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
              <span className="text-xs text-white/80 font-light mt-1">Campus Club at VIT-AP</span>
            </div>
          </div>

          {/* Right Section (Floating Dock) */}
          <div className="w-[280px] flex justify-end">
            {/* Desktop Floating Dock */}
            <div className="hidden md:flex">
              <FloatingDock items={navItems} desktopClassName="fixed top-4 right-4 rounded-2xl bg-cyan-400/10" />
            </div>

            {/* Mobile Floating Dock */}
            <div className="md:hidden">
              <FloatingDock items={navItems} mobileClassName="fixed top-4 right-4 z-50" />
            </div>
          </div>
        </nav>

        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          {/* Animated Circuit Background */}
          <div className="absolute inset-0 circuit-pattern opacity-20"></div>

          {/* Watch Intro Button */}
          <div className="absolute top-8 right-8 z-10">
            <WatchIntroButton />
          </div>

          {/* Floating Tech Elements */}
          <div className="absolute top-20 left-10 float-animation">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: "1s" }}>
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20">
            {/* Main Interactive Sections */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* LEARN Section */}
              <div className="group relative">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="relative pulse-ring-animation mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    LEARN
                  </h3>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Machine Learning Fundamentals</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span>Deep Learning Architectures</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Data Science Techniques</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CODE Section */}
              <div className="group relative">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20">
                  <div className="relative pulse-ring-animation mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto">
                      <Code2 className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    CODE
                  </h3>

                  {/* Interactive Code Display */}
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-accent/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-accent">
                      <span className={`${isTyping ? "typing-animation" : ""}`}>{codeSnippets[currentCodeIndex]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INNOVATE Section */}
              <div className="group relative">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-secondary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20">
                  <div className="relative pulse-ring-animation mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto">
                      <Lightbulb className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    INNOVATE
                  </h3>

                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                      <span>AI-Powered Solutions</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span>Research Projects</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-900">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span>Industry Partnerships</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground mb-8">
                This isn't just a motto — it's our <span className="text-primary font-semibold">mission</span>.
              </p>

              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Join the <span className="text-accent font-semibold">Best Technical Club</span> of VIT-AP, where
                curiosity meets innovation. Engage in hands-on learning, develop groundbreaking projects, and be part of
                a community that's shaping the future of <span className="text-secondary font-semibold">AI & ML</span>.
              </p>

              {/* Statistics */}
              <div className="flex justify-center gap-8 py-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400">500+</div>
                  <div className="text-sm text-gray-400">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">50+</div>
                  <div className="text-sm text-gray-400">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400">5+</div>
                  <div className="text-sm text-gray-400">Years Strong</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  onClick={() => {
                    alert("MLC isn't open for new registrations now, please come back later.")
                  }}
                >
                  <span className="relative z-10">Join the Club Now</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced What We Do Section */}
        <section className="w-full px-4 sm:px-10 lg:px-24 xl:px-32 py-20 bg-gradient-to-b from-black/20 to-black/40 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What We Do
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <StickyScroll
            content={[
              {
                title: "Hackathons",
                description:
                  "We regularly participate and win inter-college hackathons, pushing the boundaries of innovation.",
                content: (
                  <img
                    src="/placeholder.svg?height=400&width=600"
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
                    src="/placeholder.svg?height=400&width=600"
                    alt="Workshop"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              {
                title: "Achievements",
                description: "We've been awarded Best Technical Club of VIT-AP 2023-2024, recognizing our excellence.",
                content: (
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Award"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
              {
                title: "Bootcamps",
                description: "Intensive learning experiences that transform beginners into skilled practitioners.",
                content: (
                  <img
                    src="/placeholder.svg?height=400&width=600"
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
                    src="/placeholder.svg?height=400&width=600"
                    alt="Competition"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="bg-black text-white py-16 px-6 md:px-5" id="experience">
          <h2 className="text-3xl font-bold text-center mb-12">what people say about us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
              <p className="text-gray-300 mb-4">
                "Being a part of MLC shaped my technical journey. The exposure to AI/ML research and the club culture
                gave me confidence to pursue innovation fearlessly."
              </p>
              <div className="flex items-center mt-6">
                <img
                  src="/images/akhil.jpg"
                  alt="Akhil Reddy"
                  className="w-12 h-12 rounded-full mr-4 border border-cyan-400"
                />
                <div>
                  <div className="text-cyan-400 font-semibold">Akhil Reddy</div>
                  <div className="text-gray-400 text-sm">Former President (2023-24)</div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
              <p className="text-gray-300 mb-4">
                "Leading the projects division taught me how to work with teams, manage deadlines, and deliver
                real-world tech solutions. MLC is where you grow beyond the classroom."
              </p>
              <div className="flex items-center mt-6">
                <img
                  src="/images/sreevidya.jpg"
                  alt="Sree Vidya"
                  className="w-12 h-12 rounded-full mr-4 border border-cyan-400"
                />
                <div>
                  <div className="text-cyan-400 font-semibold">Sree Vidya</div>
                  <div className="text-gray-400 text-sm">Projects Head (2022-23)</div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-md border border-cyan-600 hover:scale-105 transition-transform">
              <p className="text-gray-300 mb-4">
                "I joined as a volunteer and ended up leading major events. MLC empowered me with leadership, technical,
                and networking skills that I carry even today."
              </p>
              <div className="flex items-center mt-6">
                <img
                  src="/images/meghana.jpg"
                  alt="Meghana K"
                  className="w-12 h-12 rounded-full mr-4 border border-cyan-400"
                />
                <div>
                  <div className="text-cyan-400 font-semibold">Meghana K</div>
                  <div className="text-gray-400 text-sm">Core Member (2021-22)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 text-center py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center items-center mb-4"></div>
            <p className="text-gray-400 text-sm mb-4">Empowering the next generation of AI innovators at VIT-AP</p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Machine Learning Club, VIT-AP. All rights reserved.
            </p>
          </div>
        </footer>
<<<<<<< HEAD
        {/* Footer */}
<footer className="bg-black/60 backdrop-blur-xl border-t border-white/10 text-center py-8">
  <div className="max-w-4xl mx-auto px-6">
    <div className="flex justify-center items-center mb-4"></div>
  </div>
</footer>

{/* ✅ Add Chatbot */}
<Chatbot />

=======
>>>>>>> e878a7a68703a7fa806ac49fedf31811d0cfd092
      </div>
    </>
  )
}
