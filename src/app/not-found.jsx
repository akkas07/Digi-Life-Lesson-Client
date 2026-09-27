"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center relative overflow-hidden px-6 dark:bg-[#040712] dark:text-zinc-100">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-62.5 h-62.5 bg-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-md w-full text-center relative z-10 flex flex-col items-center">
        {/* Animated 404 Number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="text-9xl font-black tracking-tighter bg-linear-to-r from-purple-500 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(124,58,237,0.2)] select-none font-mono"
        >
          404
        </motion.h1>

        {/* Text Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest bg-fuchsia-950/30 border border-fuchsia-900/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Lost in the Evolution Loop?
          </span>

          <h2 className="text-xl font-bold text-zinc-200 mt-5 tracking-tight">
            Page Not Found
          </h2>

          <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
            The wisdom or link you are looking for might have been modified,
            renamed, or removed from the archive.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 bg-[#090b14]/60 hover:bg-zinc-900/80 border border-zinc-900 hover:text-zinc-200 px-5 py-2.5 rounded-xl backdrop-blur-md transition-all active:scale-98 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Go Back</span>
          </button>

          {/* Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 px-5 py-2.5 rounded-xl shadow-lg shadow-purple-950/40 border border-purple-500/20 transition-all active:scale-98 group"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </motion.div>

        {/* Footer Subtle Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-6 border-t border-zinc-950 w-full flex justify-center"
        >
          <Link
            href="/public-lessons"
            className="inline-flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-purple-400 transition-colors"
          >
            <Compass className="w-3 h-3" />
            <span>Explore other public lessons</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
