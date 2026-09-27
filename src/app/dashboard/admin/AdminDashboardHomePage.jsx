/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  MdOutlinePeople,
  MdOutlineLibraryBooks,
  MdOutlineFiberNew,
  MdOutlineReportProblem,
} from "react-icons/md";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- মক ডাটা (Mock Data) ---
const userGrowthData = [
  { name: "Dec 17", users: 5 },
  { name: "Dec 22", users: 1.5 },
  { name: "Dec 23", users: 9 },
  { name: "Dec 24", users: 3 },
  { name: "Jun 11", users: 1 },
  { name: "Jun 13", users: 1 },
];

const lessonOutputData = [
  { name: "Jun 13", lessons: 1 },
  { name: "Jun 11", lessons: 4 },
  { name: "May 31", lessons: 2 },
  { name: "Dec 23", lessons: 7 },
  { name: "Dec", lessons: 10 },
];

const AdminDashboardHome = ({
  users,
  lessons,
  last24HoursCount,
  userReportsCount,
  contributors = [],
}) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-app-bg text-app-text relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Section */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6 relative z-10">
        <div>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-900/30 px-2.5 py-1 rounded-md">
            Admin Access
          </span>
          <h1 className="text-3xl font-bold tracking-tight  text-app-text mt-2">
            Dashboard Overview
          </h1>
        </div>

        {/* Live Date Badge */}
        <div className="text-xs text-zinc-400 font-medium font-mono bg-[#090b14]/60 border border-zinc-850 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
          📅 {currentDate}, 2026
        </div>
      </div>

      {/* --- SECTION 1: METRICS CARDS (4 Column Layout) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 relative z-10">
        {/* Card 1: Total Users */}
        <div className="p-5 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[20px] shadow-2xl flex flex-col justify-between group hover:border-purple-900/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Total Users
            </span>
            <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
              <MdOutlinePeople className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-mono tracking-tight text-zinc-100">
              {users?.data?.length || 0}
            </h3>
            <p className="text-[10px] text-emerald-400 font-medium mt-1">
              📈 Community Growing
            </p>
          </div>
        </div>

        {/* Card 2: Total Public Lessons */}
        <div className="p-5 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[20px] shadow-2xl flex flex-col justify-between group hover:border-purple-900/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Active Lessons
            </span>
            <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
              <MdOutlineLibraryBooks className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-mono tracking-tight text-zinc-100">
              {lessons?.length || 0}
            </h3>
            <p className="text-[10px] text-purple-400 font-medium mt-1">
              ✨ +Daily Knowledge
            </p>
          </div>
        </div>

        {/* Card 3: New Today */}
        <div className="p-5 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[20px] shadow-2xl flex flex-col justify-between group hover:border-purple-900/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              New Today
            </span>
            <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
              <MdOutlineFiberNew className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-mono tracking-tight text-zinc-100">
              {last24HoursCount}
            </h3>
            <p className="text-[10px] text-zinc-400 font-medium mt-1">
              ⚡ Fresh Insights
            </p>
          </div>
        </div>

        {/* Card 4: Pending Reports */}
        <div className="p-5 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[20px] shadow-2xl flex flex-col justify-between group hover:border-rose-950/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              Pending Reports
            </span>
            <div className="p-2.5 bg-rose-950/40 border border-rose-900/30 rounded-xl text-rose-400">
              <MdOutlineReportProblem className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-black font-mono tracking-tight text-rose-400">
              {userReportsCount}
            </h3>
            <p className="text-[10px] text-rose-500 font-medium mt-1 animate-pulse">
              ⚠️ Action Required
            </p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: ANALYTICS GRAPHS (2 Column Layout) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 relative z-10">
        {/* User Growth Graph */}
        <div className="p-6 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[24px] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold tracking-tight text-zinc-200">
              User Growth
            </h4>
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              Last 7 Days
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userGrowthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="userGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#18181b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d101d",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#userGlow)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lesson Output Graph */}
        <div className="p-6 border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[24px] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold tracking-tight text-zinc-200">
              Lesson Output
            </h4>
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
              Last 7 Days
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={lessonOutputData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#18181b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d101d",
                    borderColor: "#27272a",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="lessons"
                  fill="#c084fc"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- SECTION 3: TOP CONTRIBUTORS --- */}
      <div className="p-6 border border-zinc-900 bg-[#0d131f]/30 backdrop-blur-md rounded-[24px] shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-6 border-b border-zinc-900/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-sm">👑</span>
            <h4 className="text-sm font-bold tracking-tight text-zinc-200">
              Top Contributors
            </h4>
          </div>
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-lg font-mono">
            This Week
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contributors.map((contributor, index) => (
            <div
              key={contributor._id || index}
              className="flex items-center gap-3 p-3 bg-[#0a1120] border border-zinc-900/50 rounded-xl group hover:border-purple-500/20 transition-all duration-200"
            >
              <div className="relative">
                <div className="avatar placeholder">
                  <div className="bg-linear-to-br from-cyan-500/10 to-purple-600/20 text-cyan-400 border border-purple-500/20 rounded-xl w-10 h-10 flex items-center justify-center font-bold text-sm overflow-hidden">
                    {contributor.userImage ? (
                      <img
                        src={contributor.userImage}
                        alt={contributor.userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm uppercase">
                        {contributor.userName?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rank Badge */}
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-purple-950 border border-purple-500/40 text-[9px] font-black text-purple-300 flex items-center justify-center font-mono">
                  {index + 1}
                </span>
              </div>

              <div>
                <h5 className="text-xs font-bold text-zinc-200 group-hover:text-purple-400 transition-colors">
                  {contributor.userName || "Anonymous User"}
                </h5>
                <p className="text-[10px] text-zinc-500 font-medium font-mono mt-0.5">
                  {contributor.lessonCount || 0}{" "}
                  {(contributor.lessonCount || 0) > 1 ? "Lessons" : "Lesson"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
