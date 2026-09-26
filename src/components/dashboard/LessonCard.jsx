/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Eye, Calendar, Lock, Image as ImageIcon } from "lucide-react";
import Link from "next/link";


const LessonCard = ({ lesson, isPremiumUser = false }) => {
 
  const {
    title,
    shortDescription,
    category,
    image, 
    emotionalTone,
    accessLevel,
    createdAt,
    userName,
    userImage,
  } = lesson || {};

  
  const isLocked = accessLevel === "Premium" && !isPremiumUser;

  const toneStyles = {
    Motivational: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    "Sad & Heavy": "border-purple-500/30 text-purple-400 bg-purple-500/5",
    Gratitude: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    Realization: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    Ambition: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5",
    Philosophical: "border-sky-500/30 text-sky-400 bg-sky-500/5",
    Vulnerable: "border-rose-500/30 text-rose-400 bg-rose-500/5",
    "Calm & Mindful": "border-lime-500/30 text-lime-400 bg-lime-500/5",
  };

  const currentToneStyle =
    toneStyles[emotionalTone] || "border-zinc-700 text-zinc-400 bg-zinc-800/20";

  return (
    <div className="inline-flex flex-col justify-between w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] m-1.5 md:m-1.5 lg:m-2 bg-[#0a1120] border border-zinc-800/80 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-purple-950/10 min-h-87.5 vertical-top group">
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full mb-5">
        <span className="text-[11px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full border border-purple-500/20 text-purple-300 bg-purple-950/30">
          ✨ {category}
        </span>

        {/* ৩. এক্সেস লেভেল অনুযায়ী ডাইনামিক লাক্সারি ব্যাজ */}
        {accessLevel === "Premium" ? (
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
        className={`relative w-full h-44 mb-6 rounded-2xl overflow-hidden border border-zinc-800/50 transition-all duration-300 ${isLocked ? "blur-[2px] opacity-30 select-none pointer-events-none" : ""}`}
      >
        {image ? (
          <img
            src={image} // এখানে 변수 'image' ব্যবহার করা হয়েছে
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-3 text-zinc-600 border-2 border-dashed border-zinc-800 rounded-2xl">
            <ImageIcon size={40} strokeWidth={1} />
            <span className="text-xs font-medium">No Preview Image</span>
          </div>
        )}
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1120]/80 to-transparent"></div>
      </div>

      {/* ৪. কন্টেন্ট এরিয়া */}
      <div
        className={`grow flex flex-col justify-start transition-all duration-300 ${isLocked ? "blur-[3px] opacity-20 select-none pointer-events-none" : ""}`}
      >
        <h2 className="text-2xl font-serif font-bold text-zinc-100 tracking-wide mb-3 leading-snug line-clamp-2 hover:text-purple-300 transition-colors cursor-pointer">
          {title}
        </h2>
        <p className="text-sm font-sans font-medium text-zinc-400/90 leading-relaxed line-clamp-3 mb-6">
          {shortDescription}
        </p>
      </div>

      {/* ৫. নিচের মেটাডাটা এরিয়া */}
      <div
        className={`mt-auto pt-4 border-t border-zinc-800/50 flex flex-col gap-5 transition-all duration-300 ${isLocked ? "blur-[3px] opacity-20 select-none pointer-events-none" : ""}`}
      >
        <div className="flex">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${currentToneStyle}`}
          >
            {emotionalTone}
          </span>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-linear-to-br from-cyan-500/20 to-purple-600/30 text-cyan-300 border border-cyan-500/30 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-sm">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span>{userName?.charAt(0) || "U"}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                POSTED BY
              </span>
              <span className="text-sm font-bold text-zinc-200 hover:text-purple-400 transition-colors duration-200 cursor-pointer">
                {userName || "Anonymous"}
              </span>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                <Calendar size={11} /> {createdAt}
              </span>
            </div>
          </div>

          <Link
            href={`/public-lessons/${lesson?._id}`}
            className="p-3 rounded-xl bg-linear-to-br from-purple-500 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105 transition-all duration-200 group/btn"
          >
            <Eye size={18} className="group-hover/btn:animate-pulse" />
          </Link>
        </div>
      </div>

      {/* ৬. প্রিমিয়াম লকড ওভারলে */}
      {isLocked && (
        <div className="absolute inset-0 bg-[#040712]/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 z-10">
          <div className="bg-[#0a1120]/95 border border-zinc-800/90 p-6 rounded-2xl shadow-2xl w-full max-w-64 flex flex-col items-center">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-4 text-[#A855F7]">
              <Lock size={20} />
            </div>
            <h4 className="text-sm font-bold text-zinc-100 mb-1.5">
              Premium Vault Locked
            </h4>
            <p className="text-zinc-400 text-[11px] mb-5 leading-normal">
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

export default LessonCard;
