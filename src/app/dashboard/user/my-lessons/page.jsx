/* eslint-disable @next/next/no-img-element */
import { getLessonByUserId, getLessons } from "@/lib/api/lessons";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

import { Plus, Pencil, TrashBin, Heart } from "@gravity-ui/icons";
import { ChartAreaIcon } from "lucide-react";
import { getSession } from "@/lib/actions/core/getSession";
import DeleteLessonButton from "@/components/dashboard/DeleteLessonButton";

const MyLessonPage = async () => {
  const user = await getSession();
  const userId = user?.id;

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
    <div className="min-h-screen bg-white text-slate-900 p-6 sm:p-12 font-sans relative overflow-hidden dark:bg-[#040610] dark:text-zinc-100">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className=" relative z-10">
        {/* Header Section (Exactly matching the layout height & feel) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold  text-app-text tracking-tight">
                My Contributions
              </h1>
              <p className="text-sm text-zinc-400 mt-1 font-normal">
                You have authored{" "}
                <span className="text-purple-400 font-semibold">
                  {lessonsList.length}
                </span>{" "}
                lessons in the archive.
              </p>
            </div>
          </div>

          <Link href="/dashboard/user/add-lesson" passHref>
            <Button
              color="default"
              className="bg-app-bg text-app-text font-medium text-sm px-5 py-5 rounded-xl flex items-center gap-2 border border-emerald-900/40 transition-all duration-300"
            >
              <Plus width={16} height={16} className="text-emerald-400" />
              Write New Lesson
            </Button>
          </Link>
        </div>
        <hr className="mb-8" />
        {/* Dynamic Inner Table Design (As seen in image_a15e1a) */}
        <div className="w-full border-app-bg text-app-text rounded-2xl overflow-hidden backdrop-blur-md">
          {/* Table Headers */}
          {lessonsList.length > 0 && (
            <div className="hidden md:flex items-center justify-between px-8 py-5 text-[10px] font-bold tracking-widest uppercase bg-app-bg text-app-text w-full rounded-t-xl">
              <div className="flex-1 min-w-75">Lesson Details</div>

              <div className="w-28 text-center mr-8">Status</div>

              <div className="w-32 text-center mr-10">Engagement</div>

              <div className="w-32 text-center mr-5">Published</div>

              <div className="w-28 text-right mr-5">Actions</div>
            </div>
          )}

          {/* Table Rows */}
          <div className="w-full division-y division-zinc-900">
            {lessonsList.length === 0 ? (
              <div className="text-center py-28">
                <p className="text-app-text font-medium text-sm">
                  You haven&apos;t added any lessons to your vault yet.
                </p>
              </div>
            ) : (
              lessonsList.map((lesson, index) => {
                const currentToneStyle =
                  toneStyles[lesson?.emotionalTone] ||
                  "bg-app-bg text-app-text ";

                return (
                  <div
                    key={lesson?._id || index}
                    className="w-full px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900/60 last:border-b-0 hover:bg-zinc-900/10 transition-colors duration-200"
                  >
                    {/* Lesson Main Meta: Styled identical to the App/Brand row in Image 1 */}
                    <div className="flex items-center gap-4 flex-1 min-w-[320px]">
                      {/* Left Thumbnail Box */}
                      <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                        {lesson?.image ? (
                          <img
                            src={lesson.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-purple-600/20 to-indigo-600/20" />
                        )}
                      </div>

                      <div className="flex flex-col space-y-0.5">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400">
                          {lesson?.category || "General"}
                        </span>
                        <h3 className="text-sm font-bold text-app-text tracking-wide line-clamp-1 hover:text-purple-400 transition-colors cursor-pointer">
                          {lesson?.title || "Untitled Lesson"}
                        </h3>
                      </div>
                    </div>

                    {/* Status Column */}
                    <div className="flex items-center min-w-30 md:justify-center">
                      <span className="text-xs text-app-text font-medium px-2.5 py-1 rounded-lg  ">
                        {lesson?.accessLevel || "Premium"}
                      </span>
                    </div>

                    {/* Engagement Column */}
                    <div className="flex items-center gap-4 min-w-35 md:justify-center text-zinc-400 font-medium text-xs">
                      <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors duration-200 cursor-pointer group">
                        <Heart
                          width={14}
                          height={14}
                          className="text-zinc-500 group-hover:text-rose-400 transition-transform group-hover:scale-105"
                        />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors duration-200 cursor-pointer group">
                        <ChartAreaIcon
                          width={14}
                          height={14}
                          className="text-zinc-500 group-hover:text-purple-400 transition-transform group-hover:scale-105"
                        />
                        <span>0</span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border font-semibold tracking-wide ${currentToneStyle}`}
                      >
                        {lesson?.emotionalTone || "Neutral"}
                      </span>
                    </div>

                    {/* Published Date Column */}
                    <div className="flex items-center min-w-35 md:justify-center text-xs text-app-text font-medium">
                      <div className="flex items-center gap-2 px-3 py-1   rounded-full text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full  text-app-text inline-block animate-pulse" />
                        {lesson?.createdAt
                          ? new Date(lesson.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Jun 29, 2026"}
                      </div>
                    </div>

                    {/* Action Area Buttons (Matches the flat round circular flow of Image 1) */}
                    <div className="flex items-center gap-2 min-w-30 justify-end">
                      <Link
                        href={`/dashboard/user/edit-lesson/${lesson?._id}`}
                        passHref
                      >
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          className="text-zinc-400 hover:text-purple-400 hover: bg-app-bg hover:border-zinc-800 rounded-lg w-8 h-8 min-w-8 p-0 transition-all duration-200"
                        >
                          <Pencil width={13} height={13} />
                        </Button>
                      </Link>
                      <DeleteLessonButton lessonId={lesson?._id} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLessonPage;