"use client"
import { motion } from "framer-motion"

const highlightsData = [
  {
    id: 1,
    title: "AI Workshop Success",
    description: "Our flagship AI workshop attracted 200+ participants and received outstanding feedback.",
    image: "/highlight1.jpg",
    category: "Workshop",
  },
  {
    id: 2,
    title: "Hackathon Victory",
    description: "Team MLC secured first place in the inter-college hackathon with an innovative ML solution.",
    image: "/highlight2.jpg",
    category: "Competition",
  },
  {
    id: 3,
    title: "Industry Partnership",
    description: "Established partnerships with leading tech companies for internship and placement opportunities.",
    image: "/highlight3.jpg",
    category: "Partnership",
  },
  {
    id: 4,
    title: "Research Publication",
    description: "Our research on computer vision was published in a prestigious international conference.",
    image: "/highlight4.jpg",
    category: "Research",
  },
]

export default function Highlights() {
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
            Highlights
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Celebrating our achievements and milestones in the journey of innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightsData.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500"
            >
              {/* Image container */}
              <div className="relative overflow-hidden h-48">
                <motion.img
                  src={highlight.image || `/placeholder.svg?height=200&width=300&query=${highlight.category}`}
                  alt={highlight.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {highlight.category}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <motion.h4
                  className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {highlight.title}
                </motion.h4>

                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {highlight.description}
                </p>

                {/* Read more button */}
                <motion.button
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-300 flex items-center space-x-1 group/btn"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <motion.span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                    →
                  </motion.span>
                </motion.button>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
