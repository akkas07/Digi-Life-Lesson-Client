"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Zap,
  Plus,
  User,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getLessonByUserId } from "@/lib/api/lessons";

export default function UserDashboard(
  
  {lessons = [], likeCount = [0], userStats = null, recentLessons = [] },
) {
  const [timeFrame, setTimeFrame] = useState("This Week");

  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = session?.user;

  const stats = userStats || {
    created: 0,
    saved: 0,
    impact: 0,
  };

  const lessonCount = lessons.length;

  console.log(likeCount)
  

  const currentDate = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-4 md:p-8 text-slate-800 dark:text-zinc-100 font-sans transition-colors duration-200">
      <div>
        <h2 className="text-3xl font-semibold ml-8 mt-12">
          Welcome Back, {user?.name}!
        </h2>
        <p className="text-muted ml-8 mt-2">
          Knowledge speaks, but wisdom listens. Here is your journey so far.
        </p>
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-zinc-800/60 pb-5">
          <div>
            <blockquote className="text-sm italic text-slate-500 dark:text-zinc-400 font-medium"></blockquote>
          </div>
          <div className="text-xs md:text-sm font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            {currentDate}
          </div>
        </div>

        {/* Grid 1: Three Main Metric Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Lessons Created */}
          <div className="relative overflow-hidden rounded-2xl border border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm shadow-slate-100 dark:shadow-none transition-all hover:shadow-md">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-indigo-50/50 dark:bg-indigo-950/20 blur-xl" />
            <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-2.5 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="mt-4 space-y-1">
              <h2 className="text-4xl font-extrabold tracking-tight">
                {lessonCount}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Lessons Created
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Contributions to the global archive
              </p>
            </div>
          </div>

          {/* Card 2: Wisdom Saved */}
          <div className="relative overflow-hidden rounded-2xl border border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm shadow-slate-100 dark:shadow-none transition-all hover:shadow-md">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-rose-50/50 dark:bg-rose-950/20 blur-xl" />
            <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-rose-50 dark:bg-rose-950/40 p-2.5 text-rose-600 dark:text-rose-400">
              <Heart className="h-5 w-5" />
            </div>
            <div className="mt-4 space-y-1">
              <h2 className="text-4xl font-extrabold tracking-tight">
                {stats.saved}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Wisdom Saved
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Your personal curated favorites
              </p>
            </div>
          </div>

          {/* Card 3: Total Impact */}
          <div className="relative overflow-hidden rounded-2xl border border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm shadow-slate-100 dark:shadow-none transition-all hover:shadow-md">
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-50/50 dark:bg-amber-950/20 blur-xl" />
            <div className="flex h-10 w-10 items-center justify-between rounded-xl bg-amber-50 dark:bg-amber-950/40 p-2.5 text-amber-600 dark:text-amber-400">
              <Zap className="h-5 w-5" />
            </div>
            <div className="mt-4 space-y-1">
              <h2 className="text-4xl font-extrabold tracking-tight">
                {likeCount?.result?.length}
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Impact (Likes)
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Community appreciations earned
              </p>
            </div>
          </div>
        </div>

        {/* Grid 2: Insight Chart & Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Contribution Insight Block */}
          <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-white dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Contribution Insight
              </h3>
              <div className="relative inline-block text-left">
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                  {timeFrame} <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Empty Area or Graph Placeholder */}
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-slate-50 dark:bg-zinc-800/50 p-4 text-slate-300 dark:text-zinc-700 mb-3 animate-pulse">
                <TrendingUp className="h-8 w-8" />
              </div>
              <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">
                Not enough historical data to display trends yet.
              </p>
            </div>
            <div className="h-2" />
          </div>

          {/* Quick Actions Dark Card Box */}
          <div className="rounded-2xl bg-linear-to-br from-slate-900 via-zinc-900 to-neutral-950 p-6 text-white shadow-xl dark:shadow-none flex flex-col justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg tracking-tight mb-4 text-zinc-100">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/add-lesson"
                  className="group flex items-center justify-between rounded-xl bg-white/10 p-3.5 text-sm font-semibold text-zinc-200 hover:bg-white/15 hover:text-white transition-all backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-1.5 text-indigo-400 group-hover:scale-110 transition-transform">
                      <Plus className="h-4 w-4" />
                    </div>
                    <span>Create New Lesson</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/dashboard/my-lessons"
                  className="group flex items-center justify-between rounded-xl bg-white/5 p-3.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-rose-500/20 p-1.5 text-rose-400 group-hover:scale-110 transition-transform">
                      <Heart className="h-4 w-4" />
                    </div>
                    <span>View Favorites</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="group flex items-center justify-between rounded-xl bg-white/5 p-3.5 text-sm font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-500/20 p-1.5 text-emerald-400 group-hover:scale-110 transition-transform">
                      <User className="h-4 w-4" />
                    </div>
                    <span>Update Profile</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grid 3: Recently Added and Philosophical Quote Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recently Added Feed Section */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Recently Added
              </h3>
              <Link
                href="/public-lessons"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                VIEW ALL <span>→</span>
              </Link>
            </div>

            {recentLessons.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800/80 p-8 text-center bg-white/40 dark:bg-zinc-900/40">
                <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">
                  No lessons added yet.
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                {/* যদি ডেটা থাকে এখানে লুপ চালিয়ে দেখাতে পারবেন */}
              </div>
            )}
          </div>

          {/* Elegant Philosophical Quote Block */}
          <div className="rounded-2xl border border-amber-100 dark:border-amber-950/40 bg-amber-50/50 dark:bg-amber-950/10 p-6 flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 text-amber-200/40 dark:text-amber-900/10 pointer-events-none">
              <Quote className="h-32 w-32 rotate-180" />
            </div>
            <div className="text-amber-700 dark:text-amber-500">
              <Quote className="h-5 w-5 fill-current" />
            </div>
            <p className="text-sm font-serif leading-relaxed text-amber-900/80 dark:text-amber-400/90 italic font-medium z-10">
              The only true wisdom is in knowing you know nothing.
            </p>
            <div className="text-xs font-bold tracking-widest text-amber-800 dark:text-amber-600 uppercase z-10">
              — Socrates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
