/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import { 
  MdOutlineReportProblem, 
  MdOutlineRemoveRedEye, 
  MdCheck, 
  MdOutlineDeleteOutline,
  MdClose,
  MdOutlineSecurity,
  MdOutlineWarningAmber
} from 'react-icons/md';
import Swal from 'sweetalert2';


const ReportedLessons = ({ report = [] }) => {
 
  const [flaggedLessons, setFlaggedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (report) {
      setFlaggedLessons(report);
      setLoading(false);
    }
  }, [report]);

 
  const handleIgnore = (lessonId, title) => {
    Swal.fire({
      title: "Dismiss Reports?",
      text: `This will clear all active flags for "${title}" and keep it live.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, dismiss/ignore"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:8000/api/reports/action/ignore/${lessonId}`, {
            method: "PATCH"
          });
          const data = await res.json();
          if (data.success) {
            setFlaggedLessons(prev => prev.filter(item => item.id !== lessonId));
            setSelectedLesson(null);
            Swal.fire("Reports Cleared", "The lesson reports have been archived.", "success");
          }
        } catch (err) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  // --- ডিলিট লেসন অ্যাকশন ---
  const handleDeleteLesson = (lessonId, title) => {
    Swal.fire({
      title: "Permanently Delete?",
      text: `This will completely wipe "${title}" from the entire platform!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete permanently"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:8000/api/reports/action/delete/${lessonId}`, {
            method: "DELETE"
          });
          const data = await res.json();
          if (data.success) {
            setFlaggedLessons(prev => prev.filter(item => item.id !== lessonId));
            setSelectedLesson(null);
            Swal.fire("Deleted", "The offending content has been permanently removed.", "success");
          }
        } catch (err) {
          Swal.fire("Error", "Could not delete lesson.", "error");
        }
      }
    });
  };

  if (loading) {
    return <div className="p-10 text-center text-zinc-500 font-mono text-xs">LOADING REPORT METRICS...</div>;
  }

  return (
    <div className="p-6 sm:p-10 min-h-screen  bg-app-bg text-app-text relative overflow-hidden ">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-rose-950/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-10 border-b border-zinc-900 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-950/40 border border-rose-900/30 rounded-xl text-rose-400">
            <MdOutlineReportProblem className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-app-text">Report Center</h1>
            <p className="text-xs text-zinc-400 font-medium mt-1">
              Community safety alerts. There are <span className="text-rose-400 font-bold font-mono">{flaggedLessons.length}</span> lessons currently flagged for review.
            </p>
          </div>
        </div>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="w-full overflow-x-auto rounded-[24px] border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md relative z-10 shadow-2xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className=" uppercase text-[10px] tracking-widest border-b border-zinc-900  bg-app-bg text-app-text">
              <th className="p-5 font-bold">Flagged Lesson</th>
              <th className="p-5 font-bold">Severity</th>
              <th className="p-5 font-bold">Latest Report</th>
              <th className="p-5 font-bold text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y bg-app-bg">
            {flaggedLessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-[#1a131a]/10 transition-colors group">
                {/* COLUMN 1: TITLE & ID */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-500 text-sm shrink-0">
                      📄
                    </div>
                    <div>
                      <p className="font-bold text-sm text-app-text  group-hover:text-rose-400 transition-colors">
                        {lesson.title}
                      </p>
                      <span className="inline-block mt-1 font-mono text-[9px] text-app-text  bg-app-bg px-2 py-0.5 rounded border border-zinc-850">
                        ID: {lesson.id}
                      </span>
                    </div>
                  </div>
                </td>

                {/* COLUMN 2: REPORT COUNT (SEVERITY) */}
                <td className="p-5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-amber-950/20 px-2.5 py-1 rounded-xl border border-amber-900/30">
                    <MdOutlineWarningAmber className="w-3.5 h-3.5" />
                    {lesson.reportCount} Reports
                  </span>
                </td>

                {/* COLUMN 3: LATEST REPORT DATE */}
                <td className="p-5">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {lesson.latestReportDate}
                  </div>
                </td>

                {/* COLUMN 4: ACTION ZONE */}
                <td className="p-5 text-right pr-8">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-zinc-800  bg-app-bg text-app-text text-[10px] font-bold uppercase tracking-wider  hover:text-zinc-500 hover:border-zinc-500 transition-all shadow-sm"
                    >
                      <MdOutlineRemoveRedEye className="w-3.5 h-3.5" />
                      View Details
                    </button>

                    <div className="h-4 w-px bg-zinc-850" />

                    <button
                      onClick={() => handleIgnore(lesson.id, lesson.title)}
                      className="p-2  border border-zinc-850  bg-app-bg text-app-text hover:text-emerald-400 hover:border-emerald-950/40 rounded-xl transition-all"
                      title="Ignore Reports"
                    >
                      <MdCheck className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                      className="p-2  bg-app-bg text-app-text border border-zinc-850 hover:text-rose-400 hover:border-rose-950/40 rounded-xl transition-all"
                      title="Delete Content"
                    >
                      <MdOutlineDeleteOutline className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {flaggedLessons.length === 0 && (
          <div className="p-16 text-center text-zinc-500 font-mono text-xs tracking-widest">
            🎉 EXCELLENT! REPORT CORE IS COMPLETELY CLEAN.
          </div>
        )}
      </div>

      {/* --- MODAL DIALOGUE --- */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-[#020307]/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className="max-w-xl w-full border border-zinc-850 bg-app-bg rounded-[24px] overflow-hidden shadow-2xl shadow-rose-950/10">
            {/* Modal Header */}
            <div className="p-5 bg-app-bg border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-app-text ">
                <MdOutlineSecurity className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Moderation Case File</h3>
                  <p className="text-[10px] font-mono text-app-text  mt-0.5">ID: {selectedLesson.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="p-1.5 rounded-lg  bg-app-bg text-app-text hover:text-zinc-200 transition-colors"
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Flagged Content</span>
                <h2 className="text-xl font-bold text-app-text tracking-tight">
                  &ldquo;{selectedLesson.title}&rdquo;
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black font-mono tracking-widest uppercase text-rose-400">
                  Reporter Statements ({selectedLesson.reports?.length || 0})
                </p>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                  {selectedLesson.reports?.map((report, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-app-bg border border-zinc-900/60 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-app-text  font-medium font-mono">{report.reporter}</span>
                        <span className="text-app-text  font-mono">
                          {report.date ? new Date(report.date).toLocaleString() : "N/A"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-rose-400 tracking-wide flex items-center gap-1">
                          ⚠️ {report.reason}
                        </p>
                        <p className="text-xs text-app-text  leading-relaxed italic pl-3.5">
                          {report.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 bg-app-bg border-t border-zinc-900 flex flex-col sm:flex-row items-center gap-3 justify-end">
              <button
                onClick={() => handleIgnore(selectedLesson.id, selectedLesson.title)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-app-bg border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-400 hover:text-black transition-all"
              >
                Dismiss / Ignore
              </button>
              <button
                onClick={() => handleDeleteLesson(selectedLesson.id, selectedLesson.title)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-all shadow-md shadow-rose-900/20"
              >
                Delete Lesson
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;