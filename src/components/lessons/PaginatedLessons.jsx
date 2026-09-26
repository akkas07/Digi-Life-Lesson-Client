"use client";

import React, { useState } from "react";
import LessonCard from "@/components/dashboard/LessonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const PaginatedLessons = ({ lessons = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(lessons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLessons = lessons.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build visible page numbers: show up to 5 around the current page
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  if (!lessons.length) {
    return (
      <div className="text-center py-24 border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/20">
        <p className="text-zinc-500 font-medium">
          No lessons available in the vault stream.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Results meta */}
      <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
        <span>
          Showing{" "}
          <span className="text-zinc-300 font-semibold">{startIndex + 1}</span>–
          <span className="text-zinc-300 font-semibold">
            {Math.min(endIndex, lessons.length)}
          </span>{" "}
          of{" "}
          <span className="text-zinc-300 font-semibold">{lessons.length}</span>{" "}
          lessons
        </span>
        <span className="hidden sm:inline">
          Page{" "}
          <span className="text-purple-400 font-bold">{currentPage}</span> of{" "}
          <span className="text-zinc-300 font-semibold">{totalPages}</span>
        </span>
      </div>

      {/* Cards grid */}
      <div className="flex flex-wrap">
        {currentLessons.map((lesson, index) => (
          <LessonCard key={lesson._id ?? index} lesson={lesson} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {/* Prev */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 bg-[#0a1120] hover:border-purple-700 hover:text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={14} /> Prev
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-2 py-2 text-xs text-zinc-600 select-none"
              >
                •••
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all duration-200 ${
                  currentPage === page
                    ? "bg-purple-700 border-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]"
                    : "border-zinc-800 text-zinc-400 bg-[#0a1120] hover:border-purple-700 hover:text-purple-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 bg-[#0a1120] hover:border-purple-700 hover:text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedLessons;
