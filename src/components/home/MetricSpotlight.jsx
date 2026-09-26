"use client";

import { useState } from "react";
import { Brain, Award, Network, Eye, ArrowUpRight, Zap, Flame, ShieldAlert } from "lucide-react";

const spotlightData = [
  {
    id: 0,
    title: "Preserved Insights",
    metric: "42,890+",
    subtitle: "Active Breakthroughs Registered",
    desc: "Fleeting ideas are now permanent mental assets. Our users are capturing raw, unwritten lessons and transforming them into searchable intelligence vaults.",
    tag: "Cognitive Archiving",
    icon: <Brain className="text-violet-400" size={24} />,
    colorClass: "from-violet-500/20 to-purple-500/0",
    glowColor: "bg-violet-500/10",
    badge: <Zap size={12} className="text-violet-400 animate-pulse" />
  },
  {
    id: 1,
    title: "Pattern Protection",
    metric: "94.2%",
    subtitle: "Error Repetition Deflection Rate",
    desc: "By cross-referencing past historical failures using our pattern alarm algorithms, users successfully sidestep repeating toxic productivity or project traps.",
    tag: "Failure Architecture",
    icon: <ShieldAlert className="text-orange-400" size={24} />,
    colorClass: "from-orange-500/20 to-amber-500/0",
    glowColor: "bg-orange-500/10",
    badge: <Flame size={12} className="text-orange-400 animate-pulse" />
  },
  {
    id: 2,
    title: "Global Mind-Mesh",
    metric: "180+ Trades",
    subtitle: "Makers, Devs & Thinkers Synced",
    desc: "From advanced system engineers to creative directors, diverse intellects are selectively sharing cryptographic public links to compound the collective growth loop.",
    tag: "Intellectual Network",
    icon: <Network className="text-cyan-400" size={24} />,
    colorClass: "from-cyan-500/20 to-blue-500/0",
    glowColor: "bg-cyan-500/10",
    badge: <Award size={12} className="text-cyan-400" />
  }
];

export default function MetricSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeData = spotlightData[activeIndex];

  return (
    <section className="relative py-24 px-6 lg:px-16 bg-[#0c0c0b]  overflow-hidden border-t border-default-100/10">
      
      {/* Dynamic Ambient Background Light synced with active state */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-125 rounded-full blur-[160px] -z-10 transition-all duration-700 ${
        activeIndex === 0 ? "bg-violet-500/5" : activeIndex === 1 ? "bg-orange-500/5" : "bg-cyan-500/5"
      }`} />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Controls & Description */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-orange-500/5 text-xs font-mono tracking-widest uppercase text-violet-400/90">
                System Health & Scale
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight leading-tight">
                Quantifying the <br />
                <span className="text-violet-400 italic">Evolution Loop</span>
              </h2>
              <p className="text-sm md:text-base text-white leading-relaxed max-w-md">
                We monitor the speed of wisdom preservation. Watch how daily raw observations accumulate into massive emotional and technical efficiency milestones.
              </p>
            </div>

            {/* Interactive Control Tabs / Navigation */}
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
                        ? "border-violet-500/40 bg-[#241F18]/40 shadow-xl"
                        : "border-default-200/5 bg-transparent hover:border-default-300/20 hover:bg-violet-50/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl border transition-all ${
                        isSelected 
                          ? "bg-[#0B0A08] border-violet-500/30 text-[#706f6b]" 
                          : "bg-default-50/5 border-default-100/10 text-violet-50 group-hover:text-violet-400"
                      }`}>
                        {tab.icon}
                      </div>
                      <div className="text-left">
                        <h4 className={`text-sm font-semibold transition-colors ${isSelected ? "text-[#F3EAD8]" : "text-violet-50 group-hover:text-violet-400"}`}>
                          {tab.title}
                        </h4>
                        <p className="text-[11px] font-mono text-default-300 tracking-wide uppercase mt-0.5">{tab.tag}</p>
                      </div>
                    </div>
                    
                    {/* Tiny Indicator Dot */}
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isSelected ? "bg-violet-500 scale-125 shadow-sm shadow-violet-500" : "bg-default-300/20 scale-100"
                    }`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Huge Display Card */}
          <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-145 p-8 md:p-12 rounded-[40px] border border-default-200/10 bg-[#241F18]/20 backdrop-blur-xl relative overflow-hidden group/card shadow-2xl flex flex-col justify-between min-h-105 transition-all duration-500 animate-fadeIn">
              
              {/* Corner Ambient Top Highlight Layer */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-bl rounded-bl-full pointer-events-none -z-10 opacity-30 transition-all duration-700 ${activeData.colorClass}`} />
              
              {/* Top Row: Badge & Action */}
              <div className="flex items-center justify-between relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0B0A08]/80 border border-default-200/10 text-xs font-medium text-violet-50">
                  {activeData.badge}
                  <span>{activeData.tag}</span>
                </div>
                <div className="p-2.5 rounded-full bg-[#0B0A08]/50 border border-default-200/5 text-violet-50 group-hover/card:text-violet-400 transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Middle Big Metric Data */}
              <div className="space-y-2 py-8 relative z-10 text-left">
                <h3 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-violet-400 drop-shadow-md transition-all duration-500 animate-scaleUp">
                  {activeData.metric}
                </h3>
                <p className="text-sm md:text-base font-mono font-medium text-white tracking-wide">
                  {activeData.subtitle}
                </p>
              </div>

              {/* Bottom Row Description Panel */}
              <div className="pt-6 border-t border-default-200/10 text-left relative z-10">
                <p className="text-xs md:text-sm text-violet-50 leading-relaxed transition-opacity duration-500">
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