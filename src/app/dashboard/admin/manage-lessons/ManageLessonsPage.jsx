/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  MdOutlineLibraryBooks,
  MdOutlineDeleteOutline,
  MdOutlineStars,
  MdCheckCircleOutline,
  MdOutlineVisibility,
  MdOutlineFlag,
  MdFilterList,
} from "react-icons/md";
import Swal from "sweetalert2";


import {
  updateLessonReview,
  updateLessonFeatured,
  deleteLessonAdmin,
} from "@/lib/api/admin";




const ManageLessonPage = ({ lessonData, report }) => {
  const [lessons, setLessons] = useState(lessonData?.allLessons || []);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- Status Counters ---
  const publicCount = lessons.filter((l) => l.accessLevel === "Public");
  const premiumCount = lessons.filter((l) => l.accessLevel === "Premium");
  const flaggedCount = lessons.filter((l) => l.flags > 0);

  
  const handleDelete = (lessonId, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}". This action is permanent!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#090b14",
      background: "#0d101d",
      color: "#f4f4f5",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // ডাটাবেজ থেকে ডিলিট কল
          const response = await deleteLessonAdmin(lessonId);
          
          if (response.success) {
            // UI স্টেট আপডেট
            setLessons((prev) => prev.filter((l) => (l._id || l.id) !== lessonId));
            
            Swal.fire({
              title: "Deleted!",
              text: "Lesson has been permanently removed from database.",
              icon: "success",
              background: "#0d101d",
              color: "#f4f4f5",
            });
          } else {
            throw new Error(response.message || "Failed to delete from database");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
            background: "#0d101d",
            color: "#f4f4f5",
          });
        }
      }
    });
  };

 
  const handleToggleFeature = async (lessonId, currentStatus) => {
    const nextStatus = !currentStatus;
    try {
      // ডাটাবেজে আপডেট কল
      const response = await updateLessonFeatured(lessonId, nextStatus);

      if (response.success) {
        // UI স্টেট আপডেট
        setLessons((prev) =>
          prev.map((l) => ((l._id || l.id) === lessonId ? { ...l, isFeatured: nextStatus } : l))
        );

        Swal.fire({
          title: nextStatus ? "Marked as Featured!" : "Removed Feature",
          text: nextStatus
            ? "This lesson will now flash on the landing page."
            : "Lesson removed from home page feature zone.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#0d101d",
          color: "#f4f4f5",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not update featured status.",
        icon: "error",
        background: "#0d101d",
        color: "#f4f4f5",
      });
    }
  };

  
  const handleMarkReviewed = async (lessonId) => {
    try {
      // ডাটাবেজে আপডেট কল (isReviewed: true পাঠানো হচ্ছে)
      const response = await updateLessonReview(lessonId, true);

      if (response.success) {
        // UI স্টেট আপডেট
        setLessons((prev) =>
          prev.map((l) => ((l._id || l.id) === lessonId ? { ...l, isReviewed: true } : l))
        );

        Swal.fire({
          title: "Content Approved",
          text: "Lesson has been marked as verified in the database.",
          icon: "success",
          timer: 1300,
          showConfirmButton: false,
          background: "#0d101d",
          color: "#f4f4f5",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Could not update review status.",
        icon: "error",
        background: "#0d101d",
        color: "#f4f4f5",
      });
    }
  };

  
  const filteredLessons = lessons.filter((lesson) => {
    const matchCategory =
      categoryFilter === "all" || lesson.category === categoryFilter;
    const matchVisibility =
      visibilityFilter === "all" || lesson.visibility === visibilityFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "flagged" && lesson.flags > 0) ||
      (statusFilter === "reviewed" && lesson.isReviewed) ||
      (statusFilter === "pending" && !lesson.isReviewed);

    return matchCategory && matchVisibility && matchStatus;
  });

  

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-app-bg text-app-text relative overflow-hidden">
      {/* Ambient Radial Backgrounds */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-8 pb-2 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <MdOutlineLibraryBooks className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-purple-950/50 text-purple-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-purple-800/30 mb-1.5">
              Admin Access
            </div>
            <h1 className="text-3xl font-bold tracking-tight  text-app-text">
              Wisdom Moderation
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1">
              Review and approve contributions to the archive. Currently managing <span className="text-purple-400 font-bold">{lessons.length}</span> submissions.
            </p>
          </div>
        </div>
      </div>

      {/* --- STATS COUNTER ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 relative z-10">
        <div className="p-5 border border-zinc-900/60 bg-app-bg backdrop-blur-md rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Public Lessons
            </p>
            <h3 className="text-2xl font-black font-mono text-zinc-200 mt-1">
              {publicCount.length}
            </h3>
            <p className="text-[10px] text-purple-400 font-medium mt-1">✓ Active Catalog</p>
          </div>
          <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
            <MdOutlineVisibility className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        <div className="p-5 border border-zinc-900/60 bg-app-bg backdrop-blur-md rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Premium Lessons
            </p>
            <h3 className="text-2xl font-black font-mono text-zinc-400 mt-1">
              {premiumCount.length}
            </h3>
            <p className="text-[10px] text-zinc-500 font-medium mt-1">Drafts & Private</p>
          </div>
          <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
            <MdOutlineVisibility className="w-5 h-5 text-zinc-600" />
          </div>
        </div>

        <div className="p-5 border border-zinc-900/60 bg-app-bg backdrop-blur-md rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Pending Reports
            </p>
            <h3 className="text-2xl font-black font-mono text-rose-400 mt-1">
              {report.length}
            </h3>
            <p className="text-[10px] text-rose-400/80 font-medium mt-1">⚠️ Action Required</p>
          </div>
          <div className="p-2 bg-rose-950/20 rounded-xl border border-rose-900/30">
            <MdOutlineFlag className="w-5 h-5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* --- FILTERS CONTROLLER --- */}
      <div className="p-4 mb-6 border border-zinc-900/60 bg-app-bg/40 text-app-text backdrop-blur-md rounded-2xl flex flex-wrap gap-4 items-center relative z-10 shadow-sm">
        <div className="flex items-center gap-2 text-app-text/70 text-xs font-bold mr-2">
          <MdFilterList className="w-4 h-4  text-app-text" />
          <span>Filters Matrix:</span>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className=" border border-zinc-800 text-xs bg-app-bg text-app-text rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="Career">Career</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Philosophy">Philosophy</option>
        </select>

        <select
          value={visibilityFilter}
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className=" bg-app-bg text-app-text border border-zinc-800 text-xs rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all cursor-pointer"
        >
          <option value="all">All Visibility</option>
          <option value="public">Public Only</option>
          <option value="private">Private Only</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className=" border border-zinc-800 text-xs  bg-app-bg text-app-text rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="flagged">Flagged Content</option>
          <option value="reviewed">Reviewed</option>
          <option value="pending">Pending Review</option>
        </select>
      </div>

      {/* --- LESSONS MANAGEMENT TABLE --- */}
      <div className="w-full overflow-x-auto rounded-[24px] border border-zinc-900 bg-app-bg text-app-text backdrop-blur-xl relative z-10 shadow-2xl">
        <table className="w-full border-collapse text-left bg-app-bg text-app-text">
          <thead>
            <tr className="text-app-text uppercase text-[10px] tracking-widest border-b border-zinc-900/60 bg-app-bg/60">
              <th className="p-5 font-bold">Lesson Context</th>
              <th className="p-5 font-bold">Author</th>
              <th className="p-5 font-bold">Date Posted</th>
              <th className="p-5 font-bold text-center">Approval Status</th>
              <th className="p-5 font-bold text-right pr-8">Feature Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/40">
            {filteredLessons.map((lesson) => {
              const currentId = lesson._id || lesson.id;
              return (
                <tr
                  key={currentId}
                  className="hover:bg-app-bg/20 transition-colors group"
                >
                  {/* COLUMN 1: IMAGE, TITLE & CATEGORY TAG */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      {lesson.image ? (
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-12 h-10 rounded-xl object-cover border border-zinc-800 shrink-0 shadow-md transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-12 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500 text-xs shrink-0 font-bold uppercase">
                          No Img
                        </div>
                      )}
                      
                      <div>
                        <p className="font-bold text-sm   text-app-text group-hover:text-purple-400 transition-colors line-clamp-1">
                          {lesson.title}
                        </p>
                        <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 bg-zinc-900 border border-zinc-800/60 text-zinc-400 rounded-md">
                          {lesson.category || "Personal Growth"}
                        </span>
                        {lesson.flags > 0 && (
                          <span className="ml-2 text-[9px] font-bold px-2 py-0.5 bg-rose-950/40 border border-rose-900/30 text-rose-400 rounded-md animate-pulse">
                            ⚠️ {lesson.flags} Flags
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 2: AUTHOR WITH AVATAR IMAGE & EMAIL */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      {lesson.userImage ? (
                        <img
                          src={lesson.userImage}
                          alt={lesson.userName}
                          className="w-9 h-9 rounded-full object-cover border border-purple-500/20 shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-purple-950/60 text-purple-300 border border-purple-800/30 flex items-center justify-center text-xs font-bold uppercase shadow-md">
                          {lesson.userName ? lesson.userName.charAt(0) : "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-zinc-200">{lesson.userName || "Unknown Author"}</p>
                        <p className="text-[11px] text-zinc-500 font-medium tracking-tight mt-0.5">
                          {lesson.userEmail || "no-email@domain.com"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* COLUMN 3: DATE */}
                  <td className="p-5 text-xs text-zinc-400 font-mono">
                    {lesson.createdAt || lesson.date}
                  </td>

                  {/* COLUMN 4: APPROVAL STATUS (REVIEW & DELETE) */}
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* Mark Reviewed (Approval) */}
                      <button
                        onClick={() => handleMarkReviewed(currentId)}
                        disabled={lesson.isReviewed}
                        className={`p-2 border rounded-xl transition-all shadow-sm ${
                          lesson.isReviewed
                            ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400 cursor-not-allowed"
                            : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-950/40"
                        }`}
                        title={lesson.isReviewed ? "Approved & Cleared" : "Approve Lesson"}
                      >
                        <MdCheckCircleOutline className="w-4 h-4" />
                      </button>

                      {/* Delete Action */}
                      <button
                        onClick={() => handleDelete(currentId, lesson.title)}
                        className="p-2 bg-zinc-900/40 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-950/40 rounded-xl transition-all shadow-sm"
                        title="Delete Content"
                      >
                        <MdOutlineDeleteOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  {/* COLUMN 5: FEATURE TOGGLE */}
                  <td className="p-5 text-right pr-8">
                    <button
                      onClick={() => handleToggleFeature(currentId, lesson.isFeatured)}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all shadow-md ${
                        lesson.isFeatured
                          ? "bg-purple-950/40 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                          : "bg-zinc-900/40 border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      <MdOutlineStars className="w-3.5 h-3.5" />
                      <span>{lesson.isFeatured ? "Featured" : "Feature"}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredLessons.length === 0 && (
          <div className="p-16 text-center text-app-text font-mono text-xs tracking-widest">
            NO LESSONS INDEXED WITH CURRENT FILTER PARAMETERS.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessonPage;