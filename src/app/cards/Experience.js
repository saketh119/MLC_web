"use client"
import { motion } from "framer-motion"

const experienceData = [
  {
    id: 1,
    title: "Industry Mentorship",
    description: "Direct guidance from industry experts and successful alumni in AI/ML field.",
    image: "/experience1.jpg",
    icon: "👨‍🏫",
    stats: "50+ Mentors",
  },
  {
    id: 2,
    title: "Hands-on Projects",
    description: "Real-world project experience with cutting-edge technologies and frameworks.",
    image: "/experience2.jpg",
    icon: "🛠️",
    stats: "100+ Projects",
  },
  {
    id: 3,
    title: "Research Opportunities",
    description: "Collaborate on research papers and contribute to the advancement of AI/ML.",
    image: "/experience3.jpg",
    icon: "🔬",
    stats: "15+ Publications",
  },
  {
    id: 4,
    title: "Career Growth",
    description: "Alumni placed in top tech companies with competitive packages and roles.",
    image: "/experience4.jpg",
    icon: "🚀",
    stats: "95% Placement",
  },
]

export default function Experience() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Experience
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover the comprehensive learning experience that sets our members apart
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500"
            >
              <div className="flex items-start space-x-6">
                {/* Icon and image container */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300">
                    <img
                      src={experience.image || `/placeholder.svg?height=80&width=80&query=${experience.title}`}
                      alt={experience.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Icon overlay */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-lg shadow-lg">
                    {experience.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <motion.h4
                      className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {experience.title}
                    </motion.h4>

                    {/* Stats badge */}
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 rounded-full text-xs font-semibold">
                      {experience.stats}
                    </div>
                  </div>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
