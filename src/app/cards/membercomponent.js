"use client"
import { motion } from "framer-motion"
import { IconBrandLinkedin, IconMail } from "@tabler/icons-react"

export default function MemberCard({ name, role, image, linkedin, email, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 w-80 text-center shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500"
    >
      {/* Profile image with enhanced styling */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
        <motion.img
          src={image || "/placeholder.svg?height=96&width=96"}
          alt={name}
          className="relative w-24 h-24 rounded-full mx-auto object-cover border-3 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        />
        {/* Status indicator */}
        <div className="absolute bottom-2 right-1/2 translate-x-6 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse"></div>
      </div>

      {/* Name and role */}
      <motion.h3
        className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1"
        whileHover={{ scale: 1.05 }}
      >
        {name}
      </motion.h3>

      {/* LinkedIn handle (shown only if linkedin exists) */}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-[11px] text-cyan-400/80 hover:text-cyan-300 transition-colors mb-2 break-all"
        >
          {linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")} {/* show relative handle */}
        </a>
      )}

      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6">{role}</p>

      {/* Enhanced action buttons */}
      <div className="flex justify-center space-x-3">
        {linkedin && (
          <motion.a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconBrandLinkedin size={18} />
          </motion.a>
        )}

        {email && (
          <motion.a
            href={`mailto:${email}`}
            className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconMail size={18} />
          </motion.a>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  )
}
