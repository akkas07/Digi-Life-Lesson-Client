"use client";

import { Brain, ShieldAlert, Compass, Lightbulb } from "lucide-react";

const benefitsData = [
  {
    id: 1,
    icon: <Brain className="text-violet-500" size={24} />,
    title: "Prevent Wisdom Fade",
    description: "Human memory is fragile. By documenting your break-throughs and lessons immediately, you create an indestructible external brain that stays with you forever.",
    tag: "Memory"
  },
  {
    id: 2,
    icon: <ShieldAlert className="text-orange-500" size={24} />,
    title: "Stop Repeating Mistakes",
    description: "History repeats itself if ignored. Reviewing your past failure journals acts as a shield, helping you recognize bad patterns before they happen again.",
    tag: "Protection"
  },
  {
    id: 3,
    icon: <Compass className="text-emerald-500" size={24} />,
    title: "Clearer Decision Making",
    description: "When life gets overwhelming, look back at your structured philosophy. Your documented experiences serve as a personal compass for your career and relationships.",
    tag: "Clarity"
  },
  {
    id: 4,
    icon: <Lightbulb className="text-indigo-500" size={24} />,
    title: "Compound Your Growth",
    description: "Just like financial investments, self-reflection compounds over time. Small daily insights accumulate into profound, lifelong wisdom and high emotional intelligence.",
    tag: "Compounding"
  },
];

export default function WhyItMatters() {
  return (
    <section className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden border-t border-default-100">
      {/* Background Subtle Gradient Lights */}
      <div className="absolute top-0 right-1/4 w-100 h-100 bg-orange-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-100 h-100 bg-violet-500/5 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-16">
        
        {/* Section Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-default-200/40">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-500">
              The Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why Learning From Life Matters
            </h2>
          </div>
          <p className="text-base text-foreground/60 max-w-md leading-relaxed">
            Unexamined life is just lost data. Preserving your unique life patterns 
            is the fastest way to accelerate personal evolution.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.id}
              className="p-6 md:p-8 rounded-[28px] border border-default-200/60 bg-default-50/20 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 hover:bg-default-50/50 flex flex-col justify-between group gap-6"
            >
              <div className="space-y-4">
                {/* Icon & Mini Tag */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-background/80 border border-default-200/60 text-foreground shadow-xs group-hover:scale-105 transition-transform">
                    {benefit.icon}
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-default-100 text-default-600 uppercase tracking-wider">
                    {benefit.tag}
                  </span>
                </div>

                {/* Card Title & Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Decorative Subtle Line Arrow simulation */}
              <div className="w-full h-px bg-default-200/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-violet-500 -translate-x-full group-hover:translate-x-[0%] transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}