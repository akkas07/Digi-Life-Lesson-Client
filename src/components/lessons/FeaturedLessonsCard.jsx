"use client";
import { useSession } from "@/lib/auth-client";
/* eslint-disable @next/next/no-img-element */
import { Calendar, Eye, ImageIcon, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";


const FeaturedLessonsCard = ({ lesson, isPremiumUser: propIsPremiumUser }) => {
  const { data: session } = useSession();
  const derivedIsPremium = session?.user?.plan === "premium" || session?.user?.isPremium || false;
  const isPremiumUser = typeof propIsPremiumUser === "boolean" ? propIsPremiumUser : derivedIsPremium;
  const accessLevel = lesson?.accessLevel;
  const isLocked = accessLevel === "Premium" && !isPremiumUser;

  return (
    // কার্ডের রুট ক্লাসেস একদম ক্লিন এবং সমান হাইটের জন্য 'h-full' করা হয়েছে
    <div className="flex flex-col justify-between w-full bg-white dark:bg-[#0a1120] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-purple-900/10 dark:hover:shadow-purple-950/10 h-full group">
      
      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full mb-5">
          <span className="text-[11px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full border border-purple-500/20 text-purple-300 bg-purple-950/30">
            ✨ {lesson.category}
          </span>

          {/* ৩. এক্সেস লেভেল অনুযায়ী ডাইনামিক লাক্সারি ব্যাজ */}
          {lesson.accessLevel === "Premium" ? (
            <span className="text-[10px] tracking-wider uppercase font-extrabold px-2.5 py-1 rounded-md text-purple-400 bg-purple-950/40 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              PREMIUM 👑
            </span>
          ) : (
            <span className="text-[10px] tracking-wider uppercase font-extrabold px-2.5 py-1 rounded-md text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              FREE ✨
            </span>
          )}
        </div>

        {/* Lesson Image Section */}
        <div
          className={`relative w-full h-44 mb-6 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50 transition-all duration-300 ${isLocked ? "blur-[2px] opacity-30 select-none pointer-events-none" : ""}`}
        >
          {lesson.image ? (
            <img
              src={lesson.image}
              alt={lesson.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center gap-3 text-zinc-500 dark:text-zinc-600 border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
              <ImageIcon size={40} strokeWidth={1} />
              <span className="text-xs font-medium">No Preview Image</span>
            </div>
          )}
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-white/90 dark:from-[#0a1120]/80 to-transparent"></div>
        </div>

        {/* ৪. কন্টেন্ট এরিয়া */}
        <div
          className={`flex flex-col justify-start transition-all duration-300 ${isLocked ? "blur-[3px] opacity-20 select-none pointer-events-none" : ""}`}
        >
          <h2 className="text-2xl font-serif font-bold  text-app-text tracking-wide mb-3 leading-snug line-clamp-2 hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer">
            {lesson.title}
          </h2>
          <p className="text-sm font-sans font-medium text-zinc-600 dark:text-zinc-400/90 leading-relaxed line-clamp-3 mb-6">
            {lesson.shortDescription}
          </p>
        </div>
      </div>

      {/* ৫. নিচের মেটাডাটা এরিয়া */}
      <div
        className={`mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col gap-5 transition-all duration-300 ${isLocked ? "blur-[3px] opacity-20 select-none pointer-events-none" : ""}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-linear-to-br from-cyan-500 to-purple-600 text-cyan-300 border border-cyan-500/30 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-sm">
                {lesson.userImage ? (
                  <img
                    src={lesson.userImage}
                    alt={lesson.userName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span>{lesson.userName?.charAt(0) || "U"}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                POSTED BY
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                {lesson.userName || "Anonymous"}
              </span>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                <Calendar size={11} /> {lesson.createdAt}
              </span>
            </div>
          </div>

          <Link
            href={isLocked ? "/pricing" : `/public-lessons/${lesson?._id}`}
            className={`p-3 rounded-xl text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200 group/btn ${
              isLocked
                ? "bg-zinc-300 dark:bg-zinc-800/60 hover:bg-zinc-400 dark:hover:bg-zinc-800/70"
                : "bg-linear-to-br from-purple-500 to-fuchsia-600 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105"
            }`}
            title={isLocked ? "Premium content - upgrade to access" : "View lesson details"}
          >
            <Eye size={18} className="group-hover/btn:animate-pulse" />
          </Link>
        </div>
      </div>

      {/* ৬. প্রিমিয়াম লকড ওভারলে */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/70 dark:bg-[#040712]/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 z-10">
          <div className="bg-white/95 dark:bg-[#0a1120]/95 border border-zinc-200 dark:border-zinc-800/90 p-6 rounded-2xl shadow-2xl w-full max-w-64 flex flex-col items-center">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 mb-4 text-purple-600 dark:text-[#A855F7]">
              <Lock size={20} />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
              Premium Vault Locked
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] mb-5 leading-normal">
              Upgrade to unlock this digital life lesson and gain full access.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white text-[12px] font-bold py-2.5 px-5 rounded-xl w-full transition-all duration-200 shadow-[0_4px_15px_rgba(147,51,234,0.4)]"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedLessonsCard;