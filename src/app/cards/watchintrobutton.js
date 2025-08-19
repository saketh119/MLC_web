"use client"
import { Play } from "lucide-react"

export default function WatchIntroButton({
  youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}) {
  const handlePlay = () => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handlePlay}
      className="group flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full hover:border-cyan-400 transition-all duration-300 hover:bg-black/90"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
      </div>
      <span className="text-cyan-400 font-medium text-sm tracking-wide">WATCH INTRO</span>
    </button>
  )
}
