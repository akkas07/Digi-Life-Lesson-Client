"use client";

import React, { useState } from 'react';
import { 
  MdOutlineLibraryBooks, 
  MdOutlineDeleteOutline, 
  MdOutlineStars,
  MdCheckCircleOutline,
  MdOutlineVisibility,
  MdOutlineFlag,
  MdFilterList
} from 'react-icons/md';
import Swal from 'sweetalert2';

// --- মক ডাটা (Mock Data) ---
const initialLessons = [
  { id: "1", title: "fadfasdf", category: "Career", author: "Ahashan Habib Utsho", date: "Jun 13, 2026", visibility: "public", isFeatured: false, isReviewed: false, flags: 0 },
  { id: "2", title: "Dolor officiis quis", category: "Personal Growth", author: "Programming-Hero Instructors", date: "Jun 11, 2026", visibility: "public", isFeatured: true, isReviewed: true, flags: 0 },
  { id: "3", title: "Repudiandae aut aute", category: "Personal Growth", author: "Instructor", date: "Jun 11, 2026", visibility: "private", isFeatured: false, isReviewed: false, flags: 3 },
  { id: "4", title: "Aspernatur nisi ipsa", category: "Philosophy", author: "Admin", date: "May 31, 2026", visibility: "public", isFeatured: false, isReviewed: true, flags: 0 }
];

const ManageLessonPage = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // --- স্ট্যাটাস কাউন্টার হিসাব ---
  const publicCount = lessons.filter(l => l.visibility === "public").length;
  const privateCount = lessons.filter(l => l.visibility === "private").length;
  const flaggedCount = lessons.filter(l => l.flags > 0).length;

  // --- অ্যাকশন ফাংশনসমূহ ---
  const handleDelete = (lessonId, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}". This action is permanent!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setLessons(prev => prev.filter(l => l.id !== lessonId));
        Swal.fire("Deleted!", "Lesson has been permanently removed.", "success");
      }
    });
  };

  const handleToggleFeature = (lessonId, currentStatus) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, isFeatured: !l.isFeatured } : l));
    Swal.fire({
      title: currentStatus ? "Removed Feature" : "Marked as Featured!",
      text: currentStatus ? "Lesson removed from home page feature zone." : "This lesson will now flash on the landing page.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleMarkReviewed = (lessonId) => {
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, isReviewed: true } : l));
    Swal.fire({
      title: "Content Reviewed",
      text: "Lesson has been marked as verified by admin.",
      icon: "success",
      timer: 1300,
      showConfirmButton: false
    });
  };

  // --- ফিল্টারিং লজিক ---
  const filteredLessons = lessons.filter(lesson => {
    const matchCategory = categoryFilter === "all" || lesson.category === categoryFilter;
    const matchVisibility = visibilityFilter === "all" || lesson.visibility === visibilityFilter;
    const matchStatus = 
      statusFilter === "all" || 
      (statusFilter === "flagged" && lesson.flags > 0) ||
      (statusFilter === "reviewed" && lesson.isReviewed) ||
      (statusFilter === "pending" && !lesson.isReviewed);

    return matchCategory && matchVisibility && matchStatus;
  });

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#040712] text-zinc-100 relative overflow-hidden">
      {/* Ambient Radial Backgrounds */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-8 border-b border-zinc-900 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
            <MdOutlineLibraryBooks className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Wisdom Moderation</h1>
            <p className="text-xs text-zinc-400 font-medium mt-1">Review, feature, and audit all distributed community lessons.</p>
          </div>
        </div>
      </div>

      {/* --- STATS COUNTER ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 relative z-10">
        <div className="p-4 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Public Lessons</p>
            <h3 className="text-2xl font-black font-mono text-zinc-200 mt-1">{publicCount}</h3>
          </div>
          <MdOutlineVisibility className="w-5 h-5 text-purple-400" />
        </div>
        <div className="p-4 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Private Lessons</p>
            <h3 className="text-2xl font-black font-mono text-zinc-400 mt-1">{privateCount}</h3>
          </div>
          <MdOutlineVisibility className="w-5 h-5 text-zinc-600" />
        </div>
        <div className="p-4 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Flagged Content</p>
            <h3 className="text-2xl font-black font-mono text-rose-400 mt-1">{flaggedCount}</h3>
          </div>
          <MdOutlineFlag className="w-5 h-5 text-rose-400 animate-pulse" />
        </div>
      </div>

      {/* --- FILTERS CONTROLLER --- */}
      <div className="p-4 mb-6 border border-zinc-900 bg-[#090b14]/60 rounded-2xl flex flex-wrap gap-4 items-center relative z-10">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold mr-2">
          <MdFilterList className="w-4 h-4 text-purple-400" />
          <span>Filters Matrix:</span>
        </div>

        {/* Category Filter */}
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-[#0d101d] border border-zinc-850 text-xs text-zinc-300 rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all"
        >
          <option value="all">All Categories</option>
          <option value="Career">Career</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Philosophy">Philosophy</option>
        </select>

        {/* Visibility Filter */}
        <select 
          value={visibilityFilter} 
          onChange={(e) => setVisibilityFilter(e.target.value)}
          className="bg-[#0d101d] border border-zinc-850 text-xs text-zinc-300 rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all"
        >
          <option value="all">All Visibility</option>
          <option value="public">Public Only</option>
          <option value="private">Private Only</option>
        </select>

        {/* Status Filter */}
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0d101d] border border-zinc-850 text-xs text-zinc-300 rounded-xl px-3 py-2 outline-none focus:border-purple-500/50 transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="flagged">Flagged Content</option>
          <option value="reviewed">Reviewed</option>
          <option value="pending">Pending Review</option>
        </select>
      </div>

      {/* --- LESSONS MANAGEMENT TABLE --- */}
      <div className="w-full overflow-x-auto rounded-[24px] border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md relative z-10 shadow-2xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-zinc-500 uppercase text-[10px] tracking-widest border-b border-zinc-900 bg-[#0d101d]/60">
              <th className="p-5 font-bold">Lesson Context</th>
              <th className="p-5 font-bold">Author</th>
              <th className="p-5 font-bold">Date Posted</th>
              <th className="p-5 font-bold">Audit Audit</th>
              <th className="p-5 font-bold text-right pr-8">Feature Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/40">
            {filteredLessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-[#121626]/20 transition-colors group">
                
                {/* COLUMN 1: TITLE & CATEGORY TAG */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400 text-sm shrink-0">
                      📄
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-200 group-hover:text-purple-400 transition-colors">
                        {lesson.title}
                      </p>
                      <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-md">
                        {lesson.category}
                      </span>
                      {lesson.flags > 0 && (
                        <span className="ml-2 text-[9px] font-bold px-2 py-0.5 bg-rose-950/40 border border-rose-900/30 text-rose-400 rounded-md animate-pulse">
                          ⚠️ {lesson.flags} Flags
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* COLUMN 2: AUTHOR */}
                <td className="p-5 text-xs text-zinc-400 font-medium">
                  {lesson.author}
                </td>

                {/* COLUMN 3: DATE */}
                <td className="p-5 text-xs text-zinc-500 font-mono">
                  {lesson.date}
                </td>

                {/* COLUMN 4: AUDIT CONTROLS (REVIEW & DELETE) */}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    {/* Mark Reviewed */}
                    <button
                      onClick={() => handleMarkReviewed(lesson.id)}
                      disabled={lesson.isReviewed}
                      className={`p-2 border rounded-xl transition-all shadow-sm ${
                        lesson.isReviewed 
                          ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400 cursor-not-allowed" 
                          : "bg-zinc-900/40 border-zinc-850/60 text-zinc-400 hover:text-emerald-400 hover:border-emerald-950/40"
                      }`}
                      title={lesson.isReviewed ? "Reviewed & Cleared" : "Mark as Reviewed"}
                    >
                      <MdCheckCircleOutline className="w-4 h-4" />
                    </button>

                    {/* Delete Action */}
                    <button
                      onClick={() => handleDelete(lesson.id, lesson.title)}
                      className="p-2 bg-zinc-900/40 border border-zinc-850/60 text-zinc-500 hover:text-rose-400 hover:border-rose-950/40 rounded-xl transition-all shadow-sm"
                      title="Delete Content"
                    >
                      <MdOutlineDeleteOutline className="w-4 h-4" />
                    </button>
                  </div>
                </td>

                {/* COLUMN 5: FEATURE TOGGLE */}
                <td className="p-5 text-right pr-8">
                  <button
                    onClick={() => handleToggleFeature(lesson.id, lesson.isFeatured)}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all shadow-md ${
                      lesson.isFeatured
                        ? "bg-purple-950/40 border-purple-500/40 text-purple-300"
                        : "bg-zinc-900/40 border-zinc-850 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <MdOutlineStars className="w-3.5 h-3.5" />
                    <span>{lesson.isFeatured ? "Featured" : "Feature"}</span>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredLessons.length === 0 && (
          <div className="p-16 text-center text-zinc-500 font-mono text-xs tracking-widest">
            NO LESSONS INDEXED WITH CURRENT FILTER PARAMETERS.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLessonPage;