/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FolderHeart, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MostSavedLessons({ mostSavedLessons = [] }) {
  const lessons = Array.isArray(mostSavedLessons) ? mostSavedLessons : [];

  if (!lessons.length) {
    return null;
  }

  return (
    <section className="py-12 bg-app-bg text-app-text relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-fuchsia-950/40 border border-fuchsia-900/30 rounded-xl text-fuchsia-400">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Most Saved Lessons</h2>
            <p className="text-xs text-zinc-400">The collection curated and loved most by the community.</p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lessons.map((item) => {
            const lesson = item?.lessonDetails || {};
            const lessonId = item?._id || lesson?._id;
            const title = lesson?.title || "Untitled lesson";
            const category = lesson?.category || "General";
            const image = lesson?.image || "";
            const userName = lesson?.userName || "Admin";
            const userImage = lesson?.userImage || "/avatar.png";

            return (
              <motion.div
                key={lessonId}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-app-bg backdrop-blur-md border rounded-[22px] overflow-hidden flex flex-col group hover:shadow-2xl hover:border-zinc-900 transition-all"
              >
                {/* Image Banner */}
                <div className="h-40 w-full bg-zinc-900 overflow-hidden relative">
                  {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-3xl">📄</div>
                  )}
                  {/* Saved Count Badge */}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-app-bg text-app-text  backdrop-blur-sm px-2.5 py-1 rounded-xl border border-fuchsia-950">
                    <Bookmark className="w-3 h-3 fill-white-400" />
                    {item?.savedCount ?? 0} Saves
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex flex-col grow">
                  <span className="text-[9px] font-bold text-app-text  uppercase tracking-widest block mb-1">
                    {category}
                  </span>
                  <h3 className="font-bold text-sm text-app-text  line-clamp-2 mb-3 group-hover:text-zinc-100 min-h-10">
                    {title}
                  </h3>

                  {/* Author Meta */}
                  <div className="mt-auto pt-4 border-t border-zinc-950 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                        <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] text-zinc-500 truncate font-medium">{userName}</span>
                    </div>
                    
                    <Link 
                      href={`/public-lessons/${lessonId}`}
                      className="p-1.5 bg-app-bg text-app-text  group-hover:text-fuchsia-400 group-hover:bg-fuchsia-950/30 rounded-lg border border-zinc-850 group-hover:border-fuchsia-900/50 transition-all"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}