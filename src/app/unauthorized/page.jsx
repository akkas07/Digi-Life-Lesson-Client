"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client"; // 💡 সেশন হুক ইম্পোর্ট করা হয়েছে
import { MdOutlineLock, MdArrowBack, MdOutlineHome } from "react-icons/md";

const UnauthorizedPage = () => {
  const { data: session, isPending } = useSession(); // 💡 ইউজারের সেশন ডাটা নেওয়া হলো
  const userRole = session?.user?.role; // 'admin' অথবা 'user'

  // 💡 রোল অনুযায়ী ডাইনামিক ড্যাশবোর্ড রুট নির্ধারণ
  const dashboardHref = userRole === "admin" ? "/dashboard/admin" : "/dashboard/user";

  return (
    <div className="min-h-screen bg-[#040712] text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glows - Matching your brand layout */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="max-w-md w-full border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md rounded-[24px] p-8 text-center relative z-10 shadow-2xl space-y-6">
        
        {/* Animated Lock Icon with Gradient Border */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
            <div className="relative p-4 bg-[#0d101d] border border-purple-900/40 rounded-2xl text-purple-400">
              <MdOutlineLock className="w-12 h-12 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Error Code & Typography */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400 uppercase tracking-widest font-mono">
            Error Code: 401
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Access Unauthorized
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            You don&apos;t have permission to view this section of the <span className="text-purple-400 font-medium">Book of Wisdom</span>. Please log in with an authorized account.
          </p>
        </div>

        {/* Decorative Neon Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          
         
          <Link
            href={isPending ? "#" : dashboardHref}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-900/50 to-fuchsia-900/50 border border-purple-500/30 text-xs font-semibold text-zinc-200 hover:from-purple-800/60 hover:to-fuchsia-800/60 hover:border-purple-400/50 transition-all shadow-lg ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <MdOutlineHome className="w-4 h-4" />
            {isPending ? "Checking..." : "Dashboard"}
          </Link>
          
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all"
          >
            <MdArrowBack className="w-4 h-4" />
            Go Back
          </button>
        </div>

      </div>

      {/* Techy Footer Deco */}
      <div className="mt-8 font-mono text-[9px] text-zinc-600 tracking-widest uppercase z-10 pointer-events-none">
        Digital Life Lesson Indexing System // 2026
      </div>
    </div>
  );
};

export default UnauthorizedPage;