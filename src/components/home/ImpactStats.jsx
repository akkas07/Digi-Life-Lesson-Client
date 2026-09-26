"use client";

import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const statsData = [
  {
    id: 1,
    icon: <Users className="text-violet-500" size={24} />,
    value: "10K+",
    label: "Active Learners",
    description: "Global minds tracking and capturing daily wisdom.",
  },
  {
    id: 2,
    icon: <BookOpen className="text-orange-500" size={24} />,
    value: "5K+",
    label: "Lessons Shared",
    description: "Meaningful life experiences stored safely in private vaults.",
  },
  {
    id: 3,
    icon: <TrendingUp className="text-emerald-500" size={24} />,
    value: "98%",
    label: "Growth Rate",
    description: "Average consistency improvement seen in our active users.",
  },
  {
    id: 4,
    icon: <Award className="text-indigo-500" size={24} />,
    value: "4.9/5",
    label: "User Rating",
    description: "Top-rated journal platform trusted by high achievers.",
  },
];

export default function ImpactStats() {
  return (
    <section className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden border-t border-default-100">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-indigo-500/5 rounded-full blur-[140px] -z-10" />

      <div className="w-full max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs font-semibold text-violet-400">
            Platform Insights
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Our Impact in Numbers
          </h2>
          <p className="text-base text-foreground/60 leading-relaxed">
            We are more than just a journal. See how our community is transforming 
            daily life experiences into structured, lifelong wisdom.
          </p>
        </div>

        {/* Stats Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="relative p-6 md:p-8 rounded-[24px] border border-default-200/50 bg-background/40 backdrop-blur-md shadow-xl hover:border-default-300 hover:bg-default-50/50 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Top Row: Icon */}
              <div className="p-3 rounded-xl bg-default-100/80 w-fit group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Middle Row: Numbers & Label */}
              <div className="mt-6 space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-base font-semibold text-foreground/90">
                  {stat.label}
                </div>
              </div>

              {/* Bottom Row: Description */}
              <p className="mt-2 text-sm text-foreground/50 leading-relaxed">
                {stat.description}
              </p>
              
              {/* Subtle card bottom accent glow on hover */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-linear-to-r from-violet-500/0 via-violet-500/20 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}