"use client";

import React from "react";
import {
  Check,
  Leaf,
  Crown,
  ShieldCheck,
  ArrowRight,
  Copy,
} from "lucide-react";


const PricingPage = () => {
 
  const handleCopyCard = () => {
    navigator.clipboard.writeText("4242424242424242");
    alert("Demo Test Card copied to clipboard!");
  };

  const tableFeatures = [
    {
      name: "Access to Public Lessons",
      guest: "✓",
      member: "✓",
      guestCheck: true,
    },
    {
      name: "Premium 'Deep Dive' Articles",
      guest: "—",
      member: "✓",
      guestCheck: false,
    },
    { name: "Ad-Free Experience", guest: "—", member: "✓", guestCheck: false },
    {
      name: "Lesson Creation Limit",
      guest: "3 / month",
      member: "Unlimited",
      guestCheck: false,
      isText: true,
    },
    {
      name: "Golden Contributor Badge",
      guest: "—",
      member: "✓",
      guestCheck: false,
    },
    {
      name: "Priority Community Listing",
      guest: "—",
      member: "✓",
      guestCheck: false,
    },
    {
      name: "Direct Support to Authors",
      guest: "—",
      member: "✓",
      guestCheck: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#040712] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-[-10%] right-[-15%] w-125 h-125 bg-purple-950/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-112.5 h-112.5 bg-fuchsia-950/10 rounded-full blur-[140px] pointer-events-none" />

      {/* SECTION 1: HERO & INVITATION CARD */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-20">
        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/40 border border-purple-900/30 px-3 py-1 rounded-full">
          👑 Membership Invitation
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100 mt-4 mb-4">
          Invest in your{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400 italic font-serif">
            legacy.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Join Lessonly Premium. Unlock the full archive, support the mission,
          and elevate your mind.
        </p>

        {/* Main Purchase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 text-left max-w-4xl mx-auto items-stretch">
          {/* LEFT SIDE: Main Lifetime Access Box */}
          <div className="md:col-span-7 bg-[#090b14]/50 border border-zinc-900 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-purple-900/40 transition-colors">
            <div>
              <h2 className="text-xl font-bold text-zinc-100 tracking-tight mb-2">
                Lifetime Access
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                One simple payment. No subscriptions. No hidden fees. Just pure
                wisdom, forever.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-xs text-zinc-300">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Unlimited access to Lessonly Premium</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-zinc-300">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>
                    Unlock exclusive Deep Dive&lsquo; psychological breakdowns
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs text-zinc-300">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-950/50 border border-emerald-900/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>Support the creators and curators directly</span>
                </li>
              </ul>
            </div>

            {/* Price & Checkout Trigger Block */}
            <div className="mt-8 pt-6 border-t border-zinc-900/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">
                  Total Price
                </span>
                <span className="text-3xl font-black font-mono text-zinc-100">
                  ৳1500
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-purple-600 hover:bg-purple-500 text-zinc-100 text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-[0_4px_20px_rgba(147,51,234,0.2)] flex items-center gap-1.5 group-hover:scale-[1.02]">
                  Accept Invite <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyCard}
                  className="p-3 bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-xl transition-all flex items-center gap-1.5"
                  title="Copy Demo Card"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium hidden sm:inline">
                    Demo Card
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Sub-features and Large Action Trigger */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Box 1: Creation Unlimited */}
            <div className="bg-[#090b14]/30 border border-zinc-900/60 rounded-[20px] p-5 flex gap-4 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-900/30 flex items-center justify-center text-purple-400 shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wide mb-1">
                  Creation Unlimited
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Create and publish without limits. Your wisdom has no bounds.
                </p>
              </div>
            </div>

            {/* Box 2: Golden Badge */}
            <div className="bg-[#090b14]/30 border border-zinc-900/60 rounded-[20px] p-5 flex gap-4 backdrop-blur-md">
              <div className="w-9 h-9 rounded-xl bg-fuchsia-950/40 border border-fuchsia-900/30 flex items-center justify-center text-fuchsia-400 shrink-0">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wide mb-1">
                  Golden Badge
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Stand out in the community with the prestigious Gold status.
                </p>
              </div>
            </div>

            {/* Large Quick Upgrade Area */}
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button  type="submit" role="link">
                  <div className="grow rounded-[20px] bg-linear-to-br from-purple-950/40 to-fuchsia-950/30 border border-purple-900/30 p-6 flex flex-col justify-center items-center text-center backdrop-blur-md relative overflow-hidden shadow-xl group">
                    <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-xl mb-1">⭐</span>
                    <h3 className="text-base font-black text-zinc-100 tracking-tight">
                      Upgrade Now
                    </h3>
                    <p className="text-[10px] text-purple-400 font-medium font-mono tracking-wider mt-1 uppercase">
                      Join 1,000+ members
                    </p>
                  </div>
                </button>
              </section>
            </form>
            
          </div>
        </div>

        <div className="mt-4 text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-500/40" />
          <span>Secure Stripe Checkout • 100% Money-back guarantee</span>
        </div>
      </div>

      {/* SECTION 2: COMPARISON TABLE ("The Distinction") */}
      <div className="relative z-10 max-w-4xl mx-auto mt-28">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-200">
            The Distinction
          </h2>
          <p className="text-xs text-zinc-500 mt-1">Why the upgrade matters</p>
        </div>

        {/* Table Core Structure */}
        <div className="w-full overflow-hidden rounded-[24px] border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md shadow-2xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-900 bg-[#0d101d]/60 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <th className="p-5 w-1/2">Feature</th>
                <th className="p-5 text-center">Guest</th>
                <th className="p-5 text-center text-purple-400 bg-purple-950/10 border-l border-zinc-900/60 relative">
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-purple-500" />
                  👑 Member
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50 text-xs">
              {tableFeatures.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#121626]/20 transition-colors group"
                >
                  {/* Feature Name */}
                  <td className="p-4 font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {row.name}
                  </td>

                  {/* Guest Access State */}
                  <td className="p-4 text-center text-zinc-500 font-medium font-mono">
                    {row.isText ? (
                      row.guest
                    ) : row.guestCheck ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-900 text-zinc-600 text-[10px]">
                        ✓
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Premium Member State (Highlighted Column) */}
                  <td className="p-4 text-center font-bold bg-purple-950/5 border-l border-zinc-900/60 text-purple-400 font-mono">
                    {row.isText ? (
                      <span className="text-emerald-400 font-sans tracking-wide">
                        {row.member}
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-950 text-purple-400 border border-purple-900/50 text-[10px]">
                        ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Center Text */}
        <p className="text-center text-[11px] text-zinc-500 mt-8 hover:text-zinc-400 transition-colors cursor-pointer">
          Questions? Contact Support
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
