"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import PaginatedLessons from "./PaginatedLessons";

const LessonsFilterWrapper = ({ initialLessons }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTone, setSelectedTone] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [filteredLessons, setFilteredLessons] = useState(initialLessons);
  const { data: session } = useSession();
  const isPremiumUser = session?.user?.plan === "premium" || session?.user?.isPremium || false;

  // স্ক্রিনশট থেকে নেওয়া ক্যাটেগরি ও ইমোশনাল টোন লিস্ট
  const categories = ["All", "Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned", "Philosophy"];
  const emotionalTones = ["All", "Motivational", "Sad & Heavy", "Gratitude", "Realization", "Ambition", "Philosophical", "Vulnerable", "Calm & Mindful"];

  useEffect(() => {
    let result = [...initialLessons];

    // ১. টেক্সট সার্চ লজিক (টাইটেল, ডেসক্রিপশন বা যেকোনো ওয়ার্ডের সাথে মিললে খুঁজবে)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lesson) =>
          lesson.title?.toLowerCase().includes(query) ||
          lesson.shortDescription?.toLowerCase().includes(query) ||
          lesson.category?.toLowerCase().includes(query) ||
          lesson.emotionalTone?.toLowerCase().includes(query)
      );
    }

    // ২. ক্যাটেগরি ফিল্টার
    if (selectedCategory !== "All") {
      result = result.filter(
        (lesson) => lesson.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // ৩. ইমোশনাল টোন ফিল্টার
    if (selectedTone !== "All") {
      result = result.filter(
        (lesson) => lesson.emotionalTone?.toLowerCase() === selectedTone.toLowerCase()
      );
    }

    // ৪. সর্টিং (Newest / Oldest)
    if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredLessons(result);
  }, [searchQuery, selectedCategory, selectedTone, sortBy, initialLessons]);

  return (
    <div className="space-y-8">
      {/* SEARCH AND FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-3 items-center  p-3 rounded-2xl border border-zinc-900 shadow-xl">
        
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <div className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search for wisdom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm bg-app-bg text-app-text pl-14 pr-4 py-3 rounded-xl border border-zinc-800/60 focus:outline-none focus:border-purple-600/70 transition placeholder:text-zinc-600"
          />
        </div>

        {/* Dropdowns Group */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium text-zinc-400 px-3 py-3 rounded-xl border border-zinc-800/60 focus:outline-none focus:border-purple-600 cursor-pointer min-w-32.5"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} >
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Emotional Tone Dropdown */}
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className=" text-xs font-medium text-zinc-400 px-3 py-3 rounded-xl border border-zinc-800/60 focus:outline-none focus:border-purple-600 cursor-pointer min-w-30"
          >
            {emotionalTones.map((tone) => (
              <option key={tone} value={tone} >
                {tone === "All" ? "All Tones" : tone}
              </option>
            ))}
          </select>

          {/* Sort Filter */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className=" text-xs font-medium text-zinc-400 px-3 py-3 rounded-xl border border-zinc-800/60 focus:outline-none focus:border-purple-600 cursor-pointer min-w-25"
          >
            <option value="Newest" >Newest</option>
            <option value="Oldest" >Oldest</option>
          </select>
        </div>
      </div>

      {/* রেন্ডারিং রেজাল্ট কাউন্টার */}
      <div className="text-xs text-zinc-500 font-mono flex justify-between items-center px-1">
        <span>SHOWING {filteredLessons.length} WISDOM BLOCKS</span>
        {searchQuery && <button onClick={() => setSearchQuery("")} className="text-purple-400 hover:underline">Clear Search</button>}
      </div>

      {/* PAGINATED CARDS COMPONENT */}
      {filteredLessons.length > 0 ? (
        <PaginatedLessons lessons={filteredLessons} isPremiumUser={isPremiumUser} />
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-900 rounded-[24px] bg-[#090c15]">
          <p className="text-zinc-500 text-sm">No match found for {searchQuery}. Try something else!</p>
        </div>
      )}
    </div>
  );
};

export default LessonsFilterWrapper;