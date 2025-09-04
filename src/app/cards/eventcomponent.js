"use client"
import { motion } from "framer-motion"
import { IconCalendar, IconMapPin, IconClock, IconUsers } from "@tabler/icons-react"

export default function EventCard({ event, index = 0 }) {
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const [day, month, year] = dateStr.split("-")
    return new Date(`${year}-${month}-${day}`)
  }

  const formattedDate = parseDate(event["Date"])
  const isUpcoming = formattedDate && formattedDate > new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500"
    >
      {/* Event image with overlay */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          src={event["Image Url"] || "/placeholder.svg?height=200&width=400&query=tech event"}
          alt={event["Event Name"] || "Event"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=200&width=400"
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Status badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
            isUpcoming
              ? "bg-green-500/20 text-green-400 border border-green-400/30"
              : "bg-gray-500/20 text-gray-400 border border-gray-400/30"
          } backdrop-blur-sm`}
        >
          {isUpcoming ? "Upcoming" : "Past"}
        </div>

        {/* Date overlay */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
          <div className="flex items-center space-x-2">
            <IconCalendar size={16} />
            <span className="text-sm font-medium">{formattedDate ? formattedDate.toLocaleDateString() : "TBA"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <motion.h3
          className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2"
          whileHover={{ scale: 1.02 }}
        >
          {event["Event Name"] || "Untitled Event"}
        </motion.h3>

        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3 leading-relaxed">
          {event["Description"] || "No description provided."}
        </p>

        {/* Event metadata */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {event["Location"] && (
            <div className="flex items-center space-x-1">
              <IconMapPin size={14} />
              <span>{event["Location"]}</span>
            </div>
          )}

          {event["Duration"] && (
            <div className="flex items-center space-x-1">
              <IconClock size={14} />
              <span>{event["Duration"]}</span>
            </div>
          )}

          {event["Attendees"] && (
            <div className="flex items-center space-x-1">
              <IconUsers size={14} />
              <span>{event["Attendees"]} attendees</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <motion.button
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isUpcoming ? "Register Now" : "View Details"}
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-6 left-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}
