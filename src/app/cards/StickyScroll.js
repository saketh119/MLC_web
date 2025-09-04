"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const StickyScroll = ({ content = [], contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const scrollTop = ref.current.scrollTop
      const cardHeight = ref.current.scrollHeight / content.length
      const newActiveCard = Math.floor(scrollTop / cardHeight)

      if (newActiveCard !== activeCard && newActiveCard < content.length) {
        setActiveCard(newActiveCard)
      }
    }

    const scrollContainer = ref.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [activeCard, content.length])

  const gradients = [
    "linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.4) 50%, rgba(147, 51, 234, 0.3) 100%)",
    "linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(239, 68, 68, 0.4) 50%, rgba(245, 101, 101, 0.3) 100%)",
    "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(20, 184, 166, 0.4) 50%, rgba(6, 182, 212, 0.3) 100%)",
    "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.4) 50%, rgba(99, 102, 241, 0.3) 100%)",
    "linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(245, 158, 11, 0.4) 50%, rgba(234, 179, 8, 0.3) 100%)",
  ]

  if (!Array.isArray(content) || content.length === 0) return null

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
      <div className="relative h-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" ref={ref}>
        {/* Text content */}
        <div className="relative flex items-start">
          <div className="max-w-2xl space-y-8">
            {/* Progress indicator */}
            <div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent rounded-full">
              <div
                className="w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full origin-top transition-all duration-300"
                style={{ height: `${((activeCard + 1) / content.length) * 100}%` }}
              />
            </div>

            {content.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="relative py-12 group transition-all duration-300"
                style={{
                  opacity: activeCard === index ? 1 : 0.4,
                  transform: activeCard === index ? "scale(1) translateX(0)" : "scale(0.95) translateX(-10px)",
                }}
              >
                {/* Card number indicator */}
                <div className="absolute -left-4 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                <div className="pl-8">
                  <h2
                    className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent leading-tight"
                    style={{
                      textShadow: activeCard === index ? "0 0 20px rgba(0, 255, 255, 0.3)" : "none",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p className="text-lg text-gray-300 leading-relaxed max-w-lg">{item.description}</p>

                  <div
                    className="mt-6 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transition-all duration-300"
                    style={{
                      width: activeCard === index ? "100px" : "50px",
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>

        {/* Sticky card */}
        <div className="relative lg:sticky lg:top-20 h-fit">
          <div
            className={cn(
              "relative h-80 lg:h-96 w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 ease-out backdrop-blur-xl border border-white/10",
              contentClassName,
            )}
            style={{ background: gradients[activeCard % gradients.length] }}
          >
            {/* Content container */}
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center transition-all duration-500">
                {content[activeCard]?.content ?? (
                  <div className="flex items-center justify-center w-full h-full text-white/50">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                      <p>Loading content...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </div>

          {/* Card indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {content.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeCard === index ? "bg-cyan-400 shadow-lg shadow-cyan-400/50" : "bg-white/20 hover:bg-white/40",
                )}
                style={{ transform: activeCard === index ? "scale(1.2)" : "scale(1)" }}
                onClick={() => setActiveCard(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
