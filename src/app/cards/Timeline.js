"use client";

import { motion } from "framer-motion";

const timelineData = [
  { year: "2021", event: "Club Founded" },
  { year: "2022", event: "First AI Workshop with 100+ attendees" },
  { year: "2023", event: "Won Best Technical Club of VIT-AP" },
  { year: "2023", event: "Built Fruit Ripeness Detection AI Model" },
  { year: "2024", event: "Collab with GDSC for ML Bootcamp" },
  { year: "2025", event: "Mentorship Program: 150+ students impacted" },
];

export default function Timeline() {
  return (
    <div className="mt-16 px-4 sm:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-300">
        📜 Our Legacy in code
      </h2>

      <div className="relative border-l-4 border-purple-400 pl-6">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="mb-10 relative"
          >
            <div className="absolute w-4 h-4 bg-purple-400 rounded-full -left-[10px] top-1" />
            <h3 className="text-xl font-semibold text-white">{item.year}</h3>
            <p className="text-gray-300 mt-1">{item.event}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
