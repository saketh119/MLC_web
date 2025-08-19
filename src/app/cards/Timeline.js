"use client"
import { motion } from "framer-motion"

const timelineData = [
  { year: "2021", event: "Club Founded", icon: "🚀" },
  { year: "2022", event: "First AI Workshop with 100+ attendees", icon: "🎓" },
  { year: "2023", event: "Won Best Technical Club of VIT-AP", icon: "🏆" },
  { year: "2023", event: "Built Fruit Ripeness Detection AI Model", icon: "🤖" },
  { year: "2024", event: "Collab with GDSC for ML Bootcamp", icon: "🤝" },
  { year: "2025", event: "Mentorship Program: 150+ students impacted", icon: "👥" },
]

export default function Timeline() {
  return (
    <div className="relative py-16 px-4 sm:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            📜 Our Legacy in Code
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A journey of innovation, learning, and community building
          </p>
        </motion.div>

        <div className="relative">
          {/* Enhanced timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-cyan-400 to-blue-500 rounded-full transform md:-translate-x-1/2">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-cyan-400 to-blue-500 rounded-full blur-sm opacity-50"></div>
          </div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-16 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-6 h-6 transform md:-translate-x-1/2 -translate-y-1">
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur opacity-50 animate-pulse"></div>
              </div>

              {/* Content card */}
              <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-16" : "md:ml-16"} group`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                        {item.year}
                      </h3>
                      <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mt-1"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item.event}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
