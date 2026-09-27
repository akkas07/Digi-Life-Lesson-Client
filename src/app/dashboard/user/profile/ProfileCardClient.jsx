/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Chip } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getFavoriteLessons } from "@/lib/api/favorite";
import { getLessonByUserId } from "@/lib/api/lessons";
import {
  X,
  Check,
  Camera,
  Star,
  BookOpen,
  Bookmark,
  Edit2,
  ExternalLink,
  Loader2,
  Copy,
  Clipboard,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Mock data for user's lessons tailored for Digital Life Lessons (Book of Wisdom)
const mockLessons = [
  {
    id: "6a394df969db5d455f5a7864", // আপনার রিয়েল মঙ্গোডিবি আইডির মতো ফরম্যাট করা
    title: "Unlocking Discipline in a World of Distractions",
    description:
      "Motivation gets you through the first week; structure and brutal self-discipline carry you through the next year. I had to delete all social media for 30 days to realize how much of 'me' was missing...",
    category: "Mindset",
    emotionalTone: "Realization",
    createdAt: "2026-06-28",
    accessLevel: "Free",
    likesCount: 542,
    postedBy: {
      name: "Md. Ashik",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: "6a394df969db5d455f5a7865",
    title: "The Financial Trauma of My First Failed Startup",
    description:
      "When the server went down and the bank account hit zero, the silence was deafening. But looking back, that $10,000 failure taught me more about cash flow and human psychology than any Ivy League degree ever could.",
    category: "Finance",
    emotionalTone: "Reflection",
    createdAt: "2026-06-24",
    accessLevel: "Premium",
    likesCount: 1205,
    postedBy: {
      name: "Iron Wave",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: "6a394df969db5d455f5a7866",
    title: "The Earthquake in Bangladesh: A Lesson on Impermanence",
    description:
      "As the ceiling fan shook and bricks rattled, I didn't think about my pending GitHub commits or my bank balance. I just wanted to hold my mother's hand. Nature has a terrifying way of resetting our priorities instantly.",
    category: "Philosophy",
    emotionalTone: "Gratitude",
    createdAt: "2026-06-22",
    accessLevel: "Free",
    likesCount: 890,
    postedBy: {
      name: "Anonymous",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    },
  },
  {
    id: "6a394df969db5d455f5a7867",
    title: "Breaking the Loop of Digital Burnout",
    description:
      "Working 14 hours a day remotely made me a ghost in my own home. I was physically present but mentally trapped in Slack channels. This is the exact routine I used to reclaim my evenings and my mental peace.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    createdAt: "2026-06-15",
    accessLevel: "Premium",
    likesCount: 431,
    postedBy: {
      name: "Ashikur Rahman",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
    },
  },
];

const ProfileCardClient = () => {
  // ১. সেশন থেকে সরাসরি ডাটা এবং সেশন আপডেট করার জন্য মেথড (যদি auth-client এ থাকে) নেওয়া হলো
  const { data: session, isPending, update: updateSession } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // লোডিং স্ট্যাটাস ট্র্যাকিং

  // ইনপুটের জন্য লোকাল স্টেট
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState("");

  const [savedLessonCount, setSavedLessonCount] = useState(0);
  const [createdLessonCount, setCreatedLessonCount] = useState(0);

  const isPremium =
    session?.user?.plan === "premium" || session?.user?.isPremium || false;
  const membershipLabel = isPremium ? "Premium Member" : "Free Member";
  const membershipAccentClass = isPremium
    ? "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30"
    : "from-zinc-700/30 to-zinc-800/20 text-zinc-300 border-zinc-700/60";
  const lessonsCreated =
    createdLessonCount || session?.user?.lessonsCreated || 0;
  const lessonsSaved = savedLessonCount || session?.user?.lessonsSaved || 0;

  // সেশন লোড হলে ইনপুটের ডিফল্ট ভ্যালু সেট হবে
  useEffect(() => {
    if (session?.user) {
      setTempName(session.user.name || "");
      setTempImage(session.user.image || "");
    }
  }, [session]);

  useEffect(() => {
    const loadCounts = async () => {
      if (!session?.user?.id) return;

      try {
        const [favoritesResult, lessonsResult] = await Promise.all([
          getFavoriteLessons(session.user.id),
          getLessonByUserId(session.user.id),
        ]);

        setSavedLessonCount(favoritesResult?.data?.length || 0);
        setCreatedLessonCount(
          Array.isArray(lessonsResult) ? lessonsResult.length : 0,
        );
      } catch (error) {
        console.error("Failed to load profile stats", error);
      }
    };

    loadCounts();
  }, [session?.user?.id]);

  if (isPending) {
    return (
      <div className="w-full flex items-center justify-center py-20 min-h-screen bg-white text-slate-900 dark:bg-[#0d0e12] dark:text-zinc-300">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-zinc-800"></div>
          <div className="h-6 w-32 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setTempName(session?.user?.name || "");
    setTempImage(session?.user?.image || "");
    setIsEditing(true);
  };

  const handleCopyProfile = async () => {
    if (!session?.user) {
      toast.error("No profile available to copy.");
      return;
    }

    const payload = {
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || "",
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      toast.success("Profile copied to clipboard.");
    } catch (error) {
      console.error("Copy failed", error);
      toast.error("Unable to copy profile to clipboard.");
    }
  };

  const handlePasteProfile = async () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard access is not supported in this browser.");
      return;
    }

    try {
      const text = await navigator.clipboard.readText();
      if (!text) {
        toast.error("Clipboard is empty.");
        return;
      }

      let parsed = null;
      let name = "";
      let image = "";

      try {
        parsed = JSON.parse(text);
      } catch (_error) {
        parsed = null;
      }

      if (parsed && typeof parsed === "object") {
        name = parsed.name || parsed.fullName || parsed.username || parsed.displayName || "";
        image = parsed.image || parsed.avatar || parsed.photo || "";
      }

      if (!name && text.includes("\n")) {
        const lines = text.split(/\r?\n/);
        lines.forEach((line) => {
          const [key, value] = line.split(/:\s*/);
          if (!value) return;
          const normalized = key.trim().toLowerCase();
          if (normalized.includes("name")) name = value.trim();
          if (normalized.includes("image") || normalized.includes("avatar") || normalized.includes("photo")) image = value.trim();
        });
      }

      if (!name) {
        name = text.trim();
      }

      if (!name) {
        toast.error("No valid profile information found in clipboard.");
        return;
      }

      setTempName(name);
      if (image) setTempImage(image);
      setIsEditing(true);
      toast.success("Profile pasted from clipboard.");
    } catch (error) {
      console.error("Paste failed", error);
      toast.error("Unable to paste profile from clipboard.");
    }
  };

  // ২. ডাটাবেজে ডাটা সেভ এবং সেশন আপডেট করার মূল লজিক
  const handleSaveChanges = async () => {
    if (!tempName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // এখানে আপনার ব্যাকএন্ড/নেক্সট রাউটের API এডিট এন্ডপয়েন্টটি বসাবেন
      const response = await fetch("/api/user/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tempName,
          image: tempImage,
        }),
      });

      const result = await response.text();
      const data = result ? JSON.parse(result) : {};

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // সেশন ক্লায়েন্ট সাইডে রিফ্রেশ করার চেষ্টা (যদি auth লাইব্রেরি সাপোর্ট করে)
      if (typeof updateSession === "function") {
        await updateSession({
          ...session,
          user: {
            ...session?.user,
            name: tempName,
            image: tempImage,
          },
        });
      } else {
        // যদি সেশন ক্লায়েন্টে ডিরেক্ট 'update' ফাংশন না থাকে, তবে পেজ রিফ্রেশ করে নতুন সেশন আনা যায়
        window.location.reload();
        return;
      }

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-20 font-sans selection:bg-purple-500/30 dark:bg-[#0d0e12] dark:text-zinc-300">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />

      {/* Top Banner / Gradient */}
      <div className="w-full h-48 md:h-64 bg-linear-to-br from-indigo-900/40 via-purple-900/20 to-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0d0e12] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-32 relative z-10">
        {/* Profile Details Card */}
        <div className="bg-[#15161a] border border-zinc-800/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left w-full">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-tr from-purple-600 to-blue-500 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden border-4 border-[#15161a] relative">
                  {/* ইমেজ সরাসরি সেশন অথবা টেম্পোরারি স্টেট থেকে দেখাবে */}
                  {(isEditing ? tempImage : session?.user?.image) ? (
                    <img
                      src={isEditing ? tempImage : session?.user?.image}
                      alt={session?.user?.name || "User"}
                      className={`w-full h-full object-cover transition-all ${isEditing ? "blur-[2px] brightness-50" : ""}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-4xl text-zinc-500 bg-zinc-800">
                      {session?.user?.name
                        ? session.user.name.substring(0, 2).toUpperCase()
                        : "US"}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/80 z-10 bg-black/40">
                      <Camera width={32} height={32} />
                    </div>
                  )}
                </div>
              </div>
              {!isEditing && (
                <div
                  className={`absolute bottom-2 right-2 bg-linear-to-r ${isPremium ? "from-amber-400 to-orange-500 text-white" : "from-zinc-700 to-zinc-600 text-zinc-100"} text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg border-2 border-[#15161a] z-20 ${isPremium ? "shadow-amber-500/30" : "shadow-zinc-700/20"}`}
                >
                  {isPremium ? (
                    <Star width={12} height={12} fill="currentColor" />
                  ) : (
                    <BookOpen width={12} height={12} />
                  )}
                  {isPremium ? "Premium" : "Free"}
                </div>
              )}
            </div>

            {/* User Info & Stats */}
            <div className="flex flex-col justify-center w-full grow pt-2">
              {isEditing ? (
                <div className="space-y-5 w-full max-w-md bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-zinc-400">
                      Edit Profile
                    </h3>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">
                      Display Name
                    </label>
                    <Input
                      variant="bordered"
                      placeholder="Enter profile name"
                      value={tempName}
                      disabled={isSubmitting}
                      onChange={(e) => setTempName(e.target.value)}
                      className={{ input: "text-zinc-200" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">
                      Photo URL
                    </label>
                    <Input
                      placeholder="https://example.com/your-photo.jpg"
                      value={tempImage}
                      disabled={isSubmitting}
                      onChange={(e) => setTempImage(e.target.value)}
                      variant="bordered"
                      className={{ input: "text-zinc-200 text-sm" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">
                      Email Address
                    </label>
                    <Input
                      value={session?.user?.email || "user@example.com"}
                      disabled
                      variant="faded"
                      description="Email cannot be changed."
                      className={{ input: "text-zinc-500" }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {session?.user?.name || "Anonymous User"}
                    </h2>
                    <Chip
                      size="sm"
                      variant="shadow"
                      className={`bg-linear-to-r ${membershipAccentClass} border font-medium md:ml-2 mx-auto md:mx-0`}
                    >
                      {membershipLabel}
                    </Chip>
                  </div>

                  <p className="text-zinc-400 font-medium flex items-center justify-center md:justify-start gap-2 mb-4">
                    {session?.user?.email || "user@example.com"}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isPremium ? "border-amber-500/30 bg-amber-500/10 text-amber-300" : "border-zinc-700/60 bg-zinc-800/60 text-zinc-300"}`}
                    >
                      <Star
                        width={12}
                        height={12}
                        className={isPremium ? "fill-current" : "opacity-70"}
                      />
                      {isPremium
                        ? "Premium access active"
                        : "Free access active"}
                    </div>
                    {!isPremium && (
                      <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300 transition hover:bg-purple-500/20"
                      >
                        Upgrade to Premium
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mt-2">
                    <div className="flex items-center gap-3 bg-zinc-900/60 px-5 py-3 rounded-2xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <BookOpen width={20} height={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold text-white">
                          {lessonsCreated}
                        </span>
                        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                          Lessons Created
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-zinc-900/60 px-5 py-3 rounded-2xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Bookmark width={20} height={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold text-white">
                          {lessonsSaved}
                        </span>
                        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                          Lessons Saved
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="shrink-0 flex items-start self-center lg:self-start mt-6 lg:mt-0">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <Button
                  isIconOnly
                  variant="flat"
                  disabled={isSubmitting}
                  onPress={() => setIsEditing(false)}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl"
                  title="Cancel"
                >
                  <X width={18} height={18} />
                </Button>
                <Button
                  isIconOnly
                  variant="shadow"
                  disabled={isSubmitting}
                  onPress={handleSaveChanges}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-emerald-500/30"
                  title="Save Changes"
                >
                  {isSubmitting ? (
                    <Loader2 width={18} height={18} className="animate-spin" />
                  ) : (
                    <Check width={18} height={18} />
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button
                  onPress={handleStartEdit}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-2 rounded-xl flex items-center gap-2 border border-zinc-700 transition-all shadow-lg"
                >
                  <Edit2 width={14} height={14} />
                  Edit Profile
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={handleCopyProfile}
                    className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 rounded-xl border border-zinc-700"
                    title="Copy profile JSON"
                  >
                    <Copy width={18} height={18} />
                  </Button>
                  <Button
                    isIconOnly
                    variant="flat"
                    onPress={handlePasteProfile}
                    className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 rounded-xl border border-zinc-700"
                    title="Paste profile from clipboard"
                  >
                    <Clipboard width={18} height={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Public Lessons Section */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-800/60">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                My Public Lessons
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Lessons you have shared with the community
              </p>
            </div>
            <Link
              href={`/public-lessons`}
              variant="light"
              className="text-purple-400 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-[#15161a] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all group flex flex-col h-full"
              >
                <div className="p-6 grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Chip
                      size="sm"
                      className="bg-zinc-800 text-zinc-300 font-medium text-[10px] uppercase tracking-wider"
                    >
                      {lesson.category}
                    </Chip>
                    {lesson.accessLevel === "Premium" ? (
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`border ${isPremium ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-zinc-800/80 text-zinc-400 border-zinc-700/60"}`}
                      >
                        {isPremium ? "Premium" : "Locked"}
                      </Chip>
                    ) : (
                      <Chip
                        size="sm"
                        variant="flat"
                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        Free
                      </Chip>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {lesson.title}
                  </h4>

                  <p className="text-zinc-400 text-sm line-clamp-3 mb-6 grow">
                    {lesson.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
                    <div className="flex items-center gap-4 text-zinc-500 text-sm">
                      <span className="flex items-center gap-1.5 font-medium">
                        <svg
                          className="w-4 h-4 text-rose-500/80"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {lesson.likesCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-md">
                      {lesson.emotionalTone}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-900/40 p-4 border-t border-zinc-800/50 flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-medium">
                    {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Button
                    size="sm"
                    variant="light"
                    className="text-zinc-300 hover:text-white"
                    endContent={<ExternalLink width={14} height={14} />}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardClient;
