import { getLessonByUserId, getLessons } from "@/lib/api/lessons";
import React from "react";
import Link from "next/link";
import { Button, Badge } from "@heroui/react";

import { Plus, Pencil, TrashBin, Heart,  } from "@gravity-ui/icons";
import { ChartAreaIcon } from "lucide-react";
import { getSession } from "@/lib/actions/core/getSession";


const MyLessonPage = async () => {

  const user = await getSession();
  const userId = user?.id;

  console.log(userId, 'user Id')


  const lessons = await getLessonByUserId(userId);
  

  const lessonsList = Array.isArray(lessons)
    ? lessons
    : lessons
      ? [lessons]
      : [];

  const toneStyles = {
    Motivational: "border-amber-500/30 text-amber-400 bg-amber-500/5",
    Sad: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    "Sad & Heavy": "border-purple-500/30 text-purple-400 bg-purple-500/5",
    Gratitude: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    Realization: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    Career: "border-blue-500/30 text-blue-400 bg-blue-500/5",
  };

  return (
    <div className="min-h-screen bg-[#040712] text-zinc-100 p-6 sm:p-12 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-zinc-100 tracking-wide">
              My Contributions
            </h1>
            <p className="text-sm text-zinc-400 font-medium mt-1.5">
              You have authored{" "}
              <span className="text-purple-400 font-bold">
                {lessonsList.length}
              </span>{" "}
              lessons in the archive.
            </p>
          </div>

          <Link href="/dashboard/user/add-lesson" passHref>
            <Button
              color="default"
              className="bg-[#112211] text-zinc-100 font-semibold text-sm px-5 py-6 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:opacity-90 flex items-center gap-2 border border-emerald-900/50 transition-all duration-300"
            >
              <Plus width={16} height={16} className="text-emerald-400" />
              Write New Lesson
            </Button>
          </Link>
        </div>

        {lessonsList.length > 0 && (
          <div className="hidden md:flex items-center justify-between px-6 mb-4 text-[11px] font-bold tracking-widest uppercase text-zinc-500 w-full">
            <div className="flex-1 min-w-75">Lesson Details</div>
            <div className="min-w-32 ">Status</div>
            <div className="min-w-35 text-center">Engagement</div>
            <div className="min-w-35 text-center">Published</div>
            <div className="min-w-30 text-right">Actions</div>
          </div>
        )}

        <div className="w-full space-y-4">
          {lessonsList.length === 0 ? (
            <div className="text-center py-24 bg-[#0a1120]/40 border border-dashed border-zinc-800 rounded-[24px]">
              <p className="text-zinc-500 font-medium text-sm">
                You haven&apos;t added any lessons to your vault yet.
              </p>
            </div>
          ) : (
            lessonsList.map((lesson, index) => {
              const currentToneStyle =
                toneStyles[lesson?.emotionalTone] ||
                "border-zinc-800 text-zinc-400 bg-zinc-900/30";

              return (
                <div
                  key={lesson?._id || index}
                  className="w-full bg-[#0a1120] border border-zinc-800/60 rounded-[24px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 hover:border-zinc-700/50 hover:shadow-2xl hover:shadow-purple-950/10"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-75">
                    <div className="p-3 bg-zinc-900/60 rounded-xl text-purple-400 border border-zinc-800/50 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
                      {/* Gravity UI/Custom Leaf Icon replacement */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-80"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M7.5 10.5c.83 1.2 2 2.5 3.5 3.5 2.5-2 4.5-5 5.5-8" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-base font-serif font-bold text-zinc-100 tracking-wide leading-snug hover:text-purple-400 transition-colors duration-200 cursor-pointer line-clamp-1">
                        {lesson?.title || "Untitled Lesson"}
                      </h3>
                      <span className="text-xs text-zinc-400/80 font-medium mt-1">
                        {lesson?.category || "General"} •{" "}
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] border ml-1 ${currentToneStyle}`}
                        >
                          {lesson?.emotionalTone || "Neutral"}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center min-w-30 md:justify-center text-zinc-500">
                    {lesson?.accessLevel ? (
                      <h2>{lesson.accessLevel}</h2>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-5 min-w-35 md:justify-center text-zinc-500 font-medium text-xs">
                    <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors duration-200 cursor-pointer group">
                      <Heart
                        width={15}
                        height={15}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>0</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors duration-200 cursor-pointer group">
                      <ChartAreaIcon
                        width={15}
                        height={15}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span>0</span>
                    </div>
                  </div>

                  <div className="flex items-center min-w-35 md:justify-center text-xs text-zinc-400/80 font-semibold">
                    {lesson?.createdAt
                      ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Jun 23, 2026"}
                  </div>

                  <div className="flex items-center gap-1 min-w-30 justify-end">
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all duration-200"
                    >
                      <Pencil width={15} height={15} />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-200"
                    >
                      <TrashBin width={15} height={15} />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLessonPage;
