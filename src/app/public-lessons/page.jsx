export const dynamic = "force-dynamic";

import LessonsFilterWrapper from "@/components/lessons/LessonsFilterWrapper";
import { showLessons } from "@/lib/api/lessons";
import React from "react";

const PublicLesson = async () => {
  const lessons = await showLessons();

  return (
    <div className="min-h-screen  text-slate-900 p-6 sm:p-12 relative overflow-hidden ">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-fuchsia-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-12 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
           Digital Life Lessons
          </h1>
          <p className="mt-2 text-sm text-zinc-400 font-medium">
           Preserve and learn from your life&apos;s greatest moments.
          </p>
        </div>
        <LessonsFilterWrapper initialLessons={lessons?.allLessons || []} />
      </div>
    </div>
  );
};

export default PublicLesson;