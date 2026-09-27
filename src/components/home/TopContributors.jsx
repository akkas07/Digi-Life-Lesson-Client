/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";

export default function TopContributors({ contributors }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-12 bg-app-bg text-app-text relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Top Contributors of the Week</h2>
            <p className="text-xs text-zinc-400">Minds shedding light through shared wisdom.</p>
          </div>
        </div>

        {/* Grid List with Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {contributors?.map((user, index) => (
            <motion.div
              key={user._id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02, borderColor: "rgba(124, 58, 237, 0.4)" }}
              className="bg-app-bg backdrop-blur-md border border-zinc-900 p-5 rounded-[20px] flex flex-col items-center text-center relative transition-all group"
            >
              {/* Badge Rank */}
              <span className="absolute top-3 left-3   bg-app-bg text-app-text font-mono text-[10px] px-2 py-0.5 rounded-full border border-zinc-800">
                #{index + 1}
              </span>

              {/* User Avatar */}
              <div className="w-16 h-16 rounded-full p-0.5 border  bg-app-bg mb-3 overflow-hidden">
                {user.userImage ? (
                  <img src={user.userImage} alt={user.userName} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-full font-black text-purple-400">
                    {user.userName?.substring(0, 1).toUpperCase() || "A"}
                  </div>
                )}
              </div>

              {/* User Details */}
              <h3 className="font-bold text-sm text-app-text  truncate w-full" title={user.userName}>
                {user.userName || "Contributor"}
              </h3>
              <p className="text-[11px] text-app-text  truncate w-full mb-4">{user._id}</p>

              {/* Lessons Contributed Count */}
              <div className="mt-auto flex items-center gap-1.5 text-xs  bg-app-bg text-app-text border border-purple-900/30 px-3 py-1 rounded-xl font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{user.lessonCount} Lessons</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}