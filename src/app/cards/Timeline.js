"use client"
import { motion } from "framer-motion"

const timelineData = [
  // To show exact member counts, add a `members` field (number) to the entries below,
  // e.g. { year: '2021', event: 'Club Founded', icon: '🚀', members: 30 }
  { year: "2021", event: "Club Founded", icon: "🚀" },
  { year: "2022", event: "First AI Workshop with 200+ attendees", icon: "🎓" },
  { year: "2023", event: "Club membership growth and multiple offline hackathons & ideathons", icon: "🏆" },
  { year: "2024", event: "5+ events in VIT-AP 2024 & won Best Technical Club award", icon: "🏅" },
]

export default function Timeline() {
  return (
    <div className="relative py-16 px-4 sm:px-8">
      {/* Background decorative elements: subtle, warm neutrals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-slate-700/6 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-amber-400/6 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-100">
            📜 Our Legacy in Code
          </h2>
          <div className="w-24 h-1 bg-indigo-300/30 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A journey of innovation, learning, and community building
          </p>
        </motion.div>

        <div className="relative">
          {/* Subtle vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-700 rounded-full transform md:-translate-x-1/2 shadow-sm"></div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-16 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}
            >
              {/* Timeline dot (smaller) */}
              <div className="absolute left-8 md:left-1/2 w-2 h-2 transform md:-translate-x-1/2 -translate-y-1">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-slate-700/10">
                  <div className="w-px h-px bg-slate-700 rounded-full"></div>
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-16" : "md:ml-16"} group`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-slate-900/70 to-slate-800/60 backdrop-blur-md border border-white/6 hover:border-indigo-600/30 rounded-2xl p-3 shadow-md transition-all duration-300 max-w-full md:max-w-[600px]"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-0.5 rounded-full bg-slate-700/60 text-base flex items-center justify-center shadow-sm">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-indigo-400">
                        {item.year}
                      </h3>
                      <div className="h-0.5 w-12 bg-indigo-300/30 rounded-full mt-1"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed group-hover:text-slate-100 transition-colors duration-300 mb-2">
                    {item.event}
                  </p>
                  {typeof item.members === 'number' ? (
                    <div className="text-sm text-gray-400">Members: <span className="font-medium text-white">{item.members.toLocaleString()}</span></div>
                  ) : null}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
