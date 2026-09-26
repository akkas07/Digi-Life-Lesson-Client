/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { X, Heart,  Clock, BookOpen, Star } from "lucide-react";
import Image from "next/image";



const LessonDetailsClient = ({ lesson }) => {
  const {
    title,
    shortDescription,
    category,
    image,
    emotionalTone,
    accessLevel,
    createdAt,
    userId,
    userName,
    userEmail,
    userImage,
  } = lesson || {};

  console.log(lesson);

  const router = useRouter();

  // --- AUTH STATE ---
  const currentUser = {
    id: "6a38c177d686cf37df374286",
    isPremium: false,
    email: "ma6294894@gmail.com",
  };
  const isLoggedIn = !!currentUser;

  

  // --- STATES ---
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: "Jane Doe",
      userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      text: "This philosophy perfectly encapsulates modern dilemmas.",
      time: "Just now",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const isPremiumLesson = lesson.accessLevel === "Premium";
  const hasAccess = !isPremiumLesson || (isLoggedIn && currentUser.isPremium);

  useEffect(() => {
  if (!lesson?._id) return;
  fetch(`/api/favorites/${lesson._id}?userId=${currentUser.id}`)
    .then((res) => res.json())
    .then((data) => setIsFavorite(data.saved));
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [lesson?._id]);

const handleFavoriteToggle = async () => {
  if (!isLoggedIn) return;
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId: lesson._id, userId: currentUser.id }),
  });
  const data = await res.json();
  setIsFavorite(data.saved);
};


  const handleLikeToggle = async () => {
    if (!isLoggedIn || likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await fetch(`/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson._id, userId: currentUser.id }),
      });
      if (!res.ok) throw new Error(`Like request failed: ${res.status}`);
      const data = await res.json();
      setIsLiked(data.liked);
      setLikesCount(data.count);
    } catch (err) {
      console.error("Like failed:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        userName: "Ashikur Rahman",
        userImage:
          "https://lh3.googleusercontent.com/a/ACg8ocJJ7G0PaWYRiK4ghqedy7fKFyoU_ob5yQiqDLkK0ZUpwI2_jhQE=s96-c",
        text: newComment,
        time: "Just now",
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-[#0B0C0E] min-h-screen text-zinc-300 antialiased space-y-8">
      {/* 1. MAIN HERO BANNER (Full Width - Single Column) */}
      <div className="relative aspect-video w-full h-75 md:h-112.5 rounded-[24px] overflow-hidden bg-zinc-900 border border-zinc-900 shadow-2xl">
        <Image  
          src={image || "https://lh3.googleusercontent.com/a/ACg8ocJJ7G0PaWYRiK4ghqedy7fKFyoU_ob5yQiqDLkK0ZUpwI2_jhQE=s96-c"}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
          fill
        />
        {/* Gradient Overlay & Metadata Row Inside Banner */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0B0C0E] via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs md:text-sm text-zinc-400 mt-2 bg-black/40 w-fit p-2 rounded-xl backdrop-blur-sm border border-zinc-800/30">
            <div className="w-6 h-6 rounded-full bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              {userName ? userName.substring(0, 1) : "U"}
            </div>
            <span className="font-semibold text-zinc-200">
              {userName || "Author"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 3 min read
            </span>
            <span>•</span>
            <span>{createdAt || "Jun 24, 2026"}</span>
          </div>
        </div>
      </div>

      {/* 2. INSIGHTS ROW GRID (Converting Sidebar Panel into a unified Horizontal bar) */}
      <div className="bg-[#111214] border border-zinc-900 rounded-[22px] p-5 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Category
          </span>
          <span className="text-xs font-semibold text-zinc-300 truncate block mt-0.5">
            {category || "Philosophy"}
          </span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Tone
          </span>
          <span className="text-xs font-semibold text-zinc-300 truncate block mt-0.5">
            🎭 {emotionalTone || "Philosophical"}
          </span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
            Visibility
          </span>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wide block mt-0.5">
            {accessLevel || "Public"}
          </span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50 flex items-center justify-center gap-1.5 text-rose-400 font-bold text-xs">
          <Heart className="w-3.5 h-3.5 fill-current text-[#FF4A75]" />{" "}
          {likesCount} Likes
        </div>
      </div>

      {/* 3. CORE LESSON CONTENT BLOCK */}
      <div className="bg-[#111214] border border-zinc-900 rounded-[24px] p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-4">
          <div className="p-2 bg-purple-950/40 border border-purple-900/50 rounded-xl">
            <BookOpen className="text-purple-400 w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            The Core Lesson:{" "}
            <span className="text-zinc-400 font-normal">{title}</span>
          </h2>
        </div>

        {/* Brief Overview Callout (Styled precisely like your mockup block) */}
        <div className="bg-[#1A1520] p-5 border-l-4 border-purple-600 rounded-r-xl">
          <span className="block text-[10px] uppercase font-black text-purple-400 tracking-widest mb-1">
            Brief Overview
          </span>
          <p className="text-sm md:text-base text-zinc-300 italic font-medium">
            {shortDescription || "Porno exercitation"}
          </p>
        </div>

        {/* Dynamic Descriptive Prose */}
        <div className="text-zinc-400 leading-relaxed space-y-4 text-sm md:text-base">
          <p>
            Welcome to this structured learning asset built around{" "}
            <span className="text-zinc-200 font-semibold">{title}</span>.
            Curated intentionally to spark mental clarity, this topic delves
            into specialized models under a contextual framework.
          </p>
          <p>
            As learners interact with this wisdom block, the goal remains
            consistency in conceptual absorbing over raw replication. Check out
            the specialized panel on the right side to explore the authorship
            identity metrics, system log verification tokens, and performance
            tags.
          </p>
        </div>

        {/* Key Takeaway Box (Matching exact bottom block in image_371cb8.png) */}
        <div className="bg-[#151717] border border-zinc-850 p-5 rounded-2xl space-y-2 mt-4">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current" /> Key Takeaway
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            Embrace the journey and integrate these insights into your daily
            routines for long-term growth.
          </p>
        </div>

        {/* Inline Interaction Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLikeToggle}
              disabled={likeLoading}
              className={`px-4 py-2 rounded-xl border font-bold transition ${
                isLiked
                  ? "bg-purple-950/40 text-purple-400 border-purple-800"
                  : "bg-[#16171B] border-zinc-800 text-zinc-400 hover:text-zinc-200"
              } disabled:opacity-50`}
            >
              {likeLoading ? "..." : isLiked ? "✓ Liked" : "Like"}
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-4 py-2 rounded-xl border font-bold transition ${
                isFavorite
                  ? "bg-purple-950/40 text-purple-400 border-purple-800"
                  : "bg-[#16171B] border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {isFavorite ? "★ Saved" : "Save"}
            </button>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="text-zinc-600 hover:text-rose-400 font-semibold uppercase tracking-wider text-[11px]"
          >
            🚩 Report Issue
          </button>
        </div>
      </div>

      {/* 4. DISCUSSION / COMMENT SECTION (Full Width Stack) */}
      <div className="bg-[#111214] border border-zinc-900 rounded-[24px] p-6 shadow-xl space-y-6">
        <h3 className="text-md font-bold text-zinc-200 tracking-wide flex items-center gap-2">
          Discussion{" "}
          <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-xs font-medium">
            {comments.length}
          </span>
        </h3>

        {/* Comment Input Box */}
        <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-zinc-800">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocJJ7G0PaWYRiK4ghqedy7fKFyoU_ob5yQiqDLkK0ZUpwI2_jhQE=s96-c"
              alt="Current User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full space-y-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your realization..."
              className="w-full text-xs md:text-sm text-zinc-200 bg-[#16171B] border border-zinc-850 focus:outline-none focus:border-purple-600/60 rounded-xl px-4 py-3 transition"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white font-semibold px-5 py-2 text-xs rounded-xl transition shadow-md shadow-purple-950/20"
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>

        {/* Comments Feed Render */}
        <div className="space-y-3 pt-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#16171B]/60 border border-zinc-900 p-4 rounded-xl flex gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                <img
                  src={comment.userImage}
                  alt={comment.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <h4 className="text-xs font-bold text-zinc-300">
                    {comment.userName}
                  </h4>
                  <span className="text-[10px] text-zinc-600 font-medium">
                    {comment.time}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- REPORT ISSUE MODAL --- */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111214] p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-zinc-900 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300"
            >
              <X width={16} height={16} />
            </button>
            <h3 className="text-sm font-bold text-zinc-100 tracking-wide">
              Report Content
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Logged successfully!");
                setShowReportModal(false);
              }}
              className="mt-4 space-y-4"
            >
              <select
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-[#16171B] border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select a reason...</option>
                <option value="Inappropriate">Inappropriate Content</option>
                <option value="Plagiarism">Plagiarism</option>
              </select>
              <div className="flex justify-end gap-2 text-xs">
                <Button
                  size="sm"
                  onClick={() => setShowReportModal(false)}
                  className="bg-zinc-900 text-zinc-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  className="bg-purple-600 text-white rounded-xl"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetailsClient;
