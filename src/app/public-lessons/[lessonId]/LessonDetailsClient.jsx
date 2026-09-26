/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, Clock, BookOpen, Star, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LessonDetailsClient = ({ lesson }) => {
  const {
    title,
    shortDescription,
    category,
    image,
    emotionalTone,
    accessLevel,
    createdAt,
    userName,
  } = lesson || {};

  const { data: session } = useSession();
  const currentUser = session?.user || null;
  const isLoggedIn = !!currentUser;
  const isPremiumUser = currentUser?.plan === "premium" || currentUser?.isPremium || false;

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch initial like status + count
  useEffect(() => {
    if (!lesson?._id) return;
    const url = currentUser?.id
      ? `${BASE_URL}/api/likes/${lesson._id}?userId=${currentUser.id}`
      : `${BASE_URL}/api/likes/${lesson._id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLiked(data.liked);
        setLikesCount(data.count);
      })
      .catch(console.error);
  }, [lesson?._id, currentUser?.id]);

  // Fetch initial favorite status
  useEffect(() => {
    if (!lesson?._id || !currentUser?.id) return;
    fetch(`${BASE_URL}/api/favorites/${lesson._id}?userId=${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => setIsFavorite(data.saved))
      .catch(console.error);
  }, [lesson?._id, currentUser?.id]);



  // Toggle like
const handleLikeToggle = async () => {
  if (!isLoggedIn || likeLoading) return;

  // 1. Store previous state for potential rollback
  const previousLiked = isLiked;
  const previousCount = likesCount;

  // 2. Optimistically update UI immediately
  setIsLiked(!isLiked);
  setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

  setLikeLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/api/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson._id, userId: currentUser.id }),
    });
    
    if (!res.ok) throw new Error("Update failed");
    
    const data = await res.json();
    // 3. Sync with real server data
    setIsLiked(data.liked);
    setLikesCount(data.count);
  } catch (err) {
    // 4. Rollback on failure
    setIsLiked(previousLiked);
    setLikesCount(previousCount);
    console.error("Like failed:", err);
  } finally {
    setLikeLoading(false);
  }
};

  // Toggle favorite/save
  const handleFavoriteToggle = async () => {
    if (!isLoggedIn || favoriteLoading) return;
    setFavoriteLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson._id, userId: currentUser.id }),
      });
      const data = await res.json();
      setIsFavorite(data.saved);
    } catch (err) {
      console.error("Favorite failed:", err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  // Submit comment
  const handleCommentSubmit = async (e) => {
  e.preventDefault();
  if (!newComment.trim() || commentLoading || !isLoggedIn) return;
  
  setCommentLoading(true);

  const payload = {
    lessonId: lesson._id,
    userId: currentUser.id,
    userName: currentUser.name,
    userImage: currentUser.image,
    text: newComment,
  };

  try {
    const res = await fetch(`${BASE_URL}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const result = await res.json();
    if (!res.ok) throw new Error("Comment post failed");
    
    // সার্ভার থেকে আইডি পাওয়ার পর আপডেট করুন
    const newCommentObj = { ...payload, _id: result.id, createdAt: new Date() };
    setComments((prev) => [newCommentObj, ...prev]);
    setNewComment("");
  } catch (err) {
    console.error("Failed to post comment:", err);
    alert("Comment posting failed!");
  } finally {
    setCommentLoading(false);
  }
};

// Fetch comments on page load
useEffect(() => {
  const fetchComments = async () => {
    if (!lesson?._id) return;
    try {
      const res = await fetch(`${BASE_URL}/api/comments/${lesson._id}`);
      const data = await res.json();
      setComments(data.data || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  fetchComments();
}, [lesson?._id]);


  // Submit report
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason || reportLoading) return;
    setReportLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson._id,
          userId: currentUser?.id || null,
          reason: reportReason,
          createdAt: new Date(),
        }),
      });
      if (!res.ok) throw new Error("Report failed");
      setShowReportModal(false);
      setReportReason("");
    } catch (err) {
      console.error("Report failed:", err);
    } finally {
      setReportLoading(false);
    }
  };

  const isPremiumLocked = accessLevel === "Premium" && !isPremiumUser;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-[#0B0C0E] min-h-screen text-zinc-300 antialiased space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/public-lessons"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500/40 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to lessons
        </Link>
        <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-300">
          {accessLevel || "Public"}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative aspect-video w-full h-75 md:h-112.5 rounded-[24px] overflow-hidden bg-zinc-900 border border-zinc-900 shadow-2xl">
        <Image
          src={image || "/image/register.png"}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
          fill/>
        <div className="absolute inset-0 bg-linear-to-t from-[#0B0C0E] via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs md:text-sm text-zinc-400 mt-2 bg-black/40 w-fit p-2 rounded-xl backdrop-blur-sm border border-zinc-800/30">
            <div className="w-6 h-6 rounded-full bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center text-[10px] font-bold text-zinc-300">
              {userName ? userName.substring(0, 1) : "U"}
            </div>
            <span className="font-semibold text-zinc-200">{userName || "Author"}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 3 min read
            </span>
            <span>•</span>
            <span>{createdAt || "Jun 24, 2026"}</span>
          </div>
        </div>
      </div>

      {/* Insights Row */}
      <div className="bg-[#111214] border border-zinc-900 rounded-[22px] p-5 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Category</span>
          <span className="text-xs font-semibold text-zinc-300 truncate block mt-0.5">{category || "Philosophy"}</span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Tone</span>
          <span className="text-xs font-semibold text-zinc-300 truncate block mt-0.5">🎭 {emotionalTone || "Philosophical"}</span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Visibility</span>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wide block mt-0.5">{accessLevel || "Public"}</span>
        </div>
        <div className="bg-[#16171B] p-3 rounded-xl border border-zinc-850/50 flex items-center justify-center gap-1.5 text-rose-400 font-bold text-xs">
          <Heart className="w-3.5 h-3.5 fill-current text-[#FF4A75]" /> {likesCount} Likes
        </div>
      </div>

      {isPremiumLocked && (
        <div className="bg-[#16171B] border border-purple-900/40 rounded-[24px] p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-purple-300">
                Premium Content
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Unlock this lesson with a premium membership.
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                This wisdom block is reserved for premium readers. Upgrade once and you&apos;ll be able to view the full story, reflections, and takeaways.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700">
                Upgrade to Premium
              </Link>
              {!isLoggedIn && (
                <Link href="/auth/signin" className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Core Lesson Content */}
      {!isPremiumLocked && (
      <div className="bg-[#111214] border border-zinc-900 rounded-[24px] p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-4">
          <div className="p-2 bg-purple-950/40 border border-purple-900/50 rounded-xl">
            <BookOpen className="text-purple-400 w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            The Core Lesson: <span className="text-zinc-400 font-normal">{title}</span>
          </h2>
        </div>

        <div className="bg-[#1A1520] p-5 border-l-4 border-purple-600 rounded-r-xl">
          <span className="block text-[10px] uppercase font-black text-purple-400 tracking-widest mb-1">Brief Overview</span>
          <p className="text-sm md:text-base text-zinc-300 italic font-medium">{shortDescription}</p>
        </div>

        <div className="text-zinc-400 leading-relaxed space-y-4 text-sm md:text-base">
          <p>
            Welcome to this structured learning asset built around{" "}
            <span className="text-zinc-200 font-semibold">{title}</span>. Curated intentionally to spark mental clarity, this topic delves into specialized models under a contextual framework.
          </p>
          <p>
            As learners interact with this wisdom block, the goal remains consistency in conceptual absorbing over raw replication.
          </p>
        </div>

        <div className="bg-[#151717] border border-zinc-850 p-5 rounded-2xl space-y-2 mt-4">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current" /> Key Takeaway
          </h4>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            Embrace the journey and integrate these insights into your daily routines for long-term growth.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLikeToggle}
              disabled={likeLoading || !isLoggedIn}
              title={!isLoggedIn ? "Login to like" : ""}
              className={`px-4 py-2 rounded-xl border font-bold transition ${
                isLiked
                  ? "bg-purple-950/40 text-purple-400 border-purple-800"
                  : "bg-[#16171B] border-zinc-800 text-zinc-400 hover:text-zinc-200"
              } disabled:opacity-50`}
            >
              {likeLoading ? "..." : isLiked ? "✓ Liked" : "Like"}
            </button>

            <button
              onClick={handleFavoriteToggle}
              disabled={favoriteLoading || !isLoggedIn}
              title={!isLoggedIn ? "Login to save" : ""}
              className={`px-4 py-2 rounded-xl border font-bold transition ${
                isFavorite
                  ? "bg-purple-950/40 text-purple-400 border-purple-800"
                  : "bg-[#16171B] border-zinc-800 text-zinc-400 hover:text-zinc-200"
              } disabled:opacity-50`}
            >
              {favoriteLoading ? "..." : isFavorite ? "★ Saved" : "Save"}
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
      )}

      {/* Comments Section */}
      <div className="bg-[#111214] border border-zinc-900 rounded-[24px] p-6 shadow-xl space-y-6">
        <h3 className="text-md font-bold text-zinc-200 tracking-wide flex items-center gap-2">
          Discussion{" "}
          <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full text-xs font-medium">
            {comments.length}
          </span>
        </h3>

        {isLoggedIn && (
          <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-zinc-800">
              {currentUser?.image ? (
                <img src={currentUser.image} alt="You" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-300">
                  {currentUser?.name?.substring(0, 1) || "U"}
                </div>
              )}
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
                  disabled={commentLoading}
                  className="bg-purple-700 hover:bg-purple-600 disabled:opacity-50 text-white font-semibold px-5 py-2 text-xs rounded-xl transition shadow-md shadow-purple-950/20"
                >
                  {commentLoading ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-3 pt-2">
          {comments.length === 0 && (
            <p className="text-xs text-zinc-600 text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
          {comments.map((comment) => (
            <div key={comment._id} className="bg-[#16171B]/60 border border-zinc-900 p-4 rounded-xl flex gap-4">
              <div className="w-9 h-9 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                {comment.userImage ? (
                  <img src={comment.userImage} alt={comment.userName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-zinc-300">
                    {comment.userName?.substring(0, 1) || "U"}
                  </div>
                )}
              </div>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between w-full">
                  <h4 className="text-xs font-bold text-zinc-300">{comment.userName}</h4>
                  <span className="text-[10px] text-zinc-600 font-medium">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Just now"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111214] p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-zinc-900 relative">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-300"
            >
              <X width={16} height={16} />
            </button>
            <h3 className="text-sm font-bold text-zinc-100 tracking-wide">Report Content</h3>
            <form onSubmit={handleReportSubmit} className="mt-4 space-y-4">
              <select
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-[#16171B] border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select a reason...</option>
                <option value="Inappropriate">Inappropriate Content</option>
                <option value="Plagiarism">Plagiarism</option>
                <option value="Spam">Spam</option>
                <option value="Misinformation">Misinformation</option>
              </select>
              <div className="flex justify-end gap-2 text-xs">
                <Button
                  size="sm"
                  onPress={() => setShowReportModal(false)}
                  className="bg-zinc-900 text-zinc-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  isLoading={reportLoading}
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
