"use client";

import { useState } from "react";
import { Brain, Award, Network, ArrowUpRight, Zap, Flame, ShieldAlert } from "lucide-react";

const spotlightData = [
  {
    id: 0,
    title: "Preserved Insights",
    metric: "42,890+",
    subtitle: "Active Breakthroughs Registered",
    desc: "Fleeting ideas are now permanent mental assets. Our users are capturing raw, unwritten lessons and transforming them into searchable intelligence vaults.",
    tag: "Cognitive Archiving",
    icon: <Brain className="text-purple-400" size={24} />,
    colorClass: "from-purple-500/20 to-transparent",
    glowColor: "bg-purple-500/10",
    badge: <Zap size={12} className="text-purple-400 animate-pulse" />
  },
  {
    id: 1,
    title: "Pattern Protection",
    metric: "94.2%",
    subtitle: "Error Repetition Deflection Rate",
    desc: "By cross-referencing past historical failures using our pattern alarm algorithms, users successfully sidestep repeating toxic productivity or project traps.",
    tag: "Failure Architecture",
    icon: <ShieldAlert className="text-pink-400" size={24} />,
    colorClass: "from-pink-500/20 to-transparent",
    glowColor: "bg-pink-500/10",
    badge: <Flame size={12} className="text-pink-400 animate-pulse" />
  },
  {
    id: 2,
    title: "Global Mind-Mesh",
    metric: "180+ Trades",
    subtitle: "Makers, Devs & Thinkers Synced",
    desc: "From advanced system engineers to creative directors, diverse intellects are selectively sharing cryptographic public links to compound the collective growth loop.",
    tag: "Intellectual Network",
    icon: <Network className="text-cyan-400" size={24} />,
    colorClass: "from-cyan-500/20 to-transparent",
    glowColor: "bg-cyan-500/10",
    badge: <Award size={12} className="text-cyan-400" />
  }
];

export default function MetricSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = spotlightData[activeIndex];

  return (
    <section className="relative py-24 px-6 lg:px-16 bg-[#0c0c0b] overflow-hidden border-t border-white/5">
      
      {/* Dynamic Ambient Background Light - Fully Integrated */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-125 rounded-full blur-[160px] -z-10 transition-all duration-700 ${
        activeIndex === 0 ? "bg-purple-500/10" : activeIndex === 1 ? "bg-pink-500/10" : "bg-cyan-500/10"
      }`} />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Controls & Description */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs font-mono tracking-widest uppercase text-purple-400">
                System Health & Scale
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight text-white leading-tight">
                Quantifying the <br />
                <span className="text-purple-400 italic">Evolution Loop</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-md">
                We monitor the speed of wisdom preservation. Watch how daily raw observations accumulate into massive emotional and technical efficiency milestones.
              </p>
            </div>

            {/* Interactive Control Tabs */}
            <div className="flex flex-col gap-3 w-full max-w-md">
              {spotlightData.map((tab) => {
                const isSelected = activeIndex === tab.id;
                return (
                  <div
                    key={tab.id}
                    onMouseEnter={() => setActiveIndex(tab.id)}
                    onClick={() => setActiveIndex(tab.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "border-purple-500/30 bg-white/3 shadow-xl shadow-purple-500/2"
                        : "border-white/5 bg-transparent hover:border-white/10 hover:bg-white/1"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl border transition-all ${
                        isSelected 
                          ? "bg-[#0c0c0b] border-purple-500/40 text-white" 
                          : "border-white/5 text-gray-400 group-hover:text-white"
                      }`}>
                        {tab.icon}
                      </div>
                      <div className="text-left">
                        <h4 className={`text-sm font-semibold transition-colors ${isSelected ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                          {tab.title}
                        </h4>
                        <p className="text-[11px] font-mono text-gray-500 tracking-wide uppercase mt-0.5">{tab.tag}</p>
                      </div>
                    </div>
                    
                    {/* Tiny Indicator Dot */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isSelected ? "bg-purple-500 scale-125 shadow-sm shadow-purple-500" : "bg-white/10 scale-100"
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Huge Display Card */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-145 p-8 md:p-12 rounded-[40px] border border-white/10 bg-white/2 backdrop-blur-xl relative overflow-hidden group/card shadow-2xl flex flex-col justify-between min-h-105 transition-all duration-500">
              
              {/* Corner Ambient Gradient (V3 & V4 both compatible setup) */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-bl rounded-bl-full pointer-events-none -z-10 opacity-40 transition-all duration-700 ${activeData.colorClass}`} />
              
              {/* Top Row: Badge & Action */}
              <div className="flex items-center justify-between relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0c0c0b]/80 border border-white/5 text-xs font-medium text-white">
                  {activeData.badge}
                  <span>{activeData.tag}</span>
                </div>
                <div className="p-2.5 rounded-full bg-[#0c0c0b]/50 border border-white/5 text-gray-400 group-hover/card:text-purple-400 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Middle Big Metric Data */}
              <div className="space-y-2 py-8 relative z-10 text-left">
                <h3 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-md">
                  <span className={`transition-all duration-500 ${
                    activeIndex === 0 ? "text-purple-400" : activeIndex === 1 ? "text-pink-400" : "text-cyan-400"
                  }`}>
                    {activeData.metric}
                  </span>
                </h3>
                <p className="text-sm md:text-base font-mono font-medium text-gray-400 tracking-wide">
                  {activeData.subtitle}
                </p>
              </div>

              {/* Bottom Row Description Panel */}
              <div className="pt-6 border-t border-white/5 text-left relative z-10">
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  {activeData.desc}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}