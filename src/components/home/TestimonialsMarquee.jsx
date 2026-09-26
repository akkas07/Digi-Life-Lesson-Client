/* eslint-disable @next/next/no-img-element */
"use client";

import { Star, Quote, ArrowUpRight, Sparkles, Shield, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
    quote: "DigitalLesson has completely transformed how I reflect on my career journey. The wisdom shared here has helped me make better decisions daily. It's an indispensable asset for intentional growth.",
    rating: 5,
    tag: "Career Growth",
    icon: <Sparkles size={16} className="text-violet-400" />,
    gridClass: "md:col-span-2 md:row-span-1" // বড় কার্ড (Width-wise)
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    quote: "Finding a community that values life lessons is rare. This platform keeps me accountable and grounded.",
    rating: 5,
    tag: "Accountability",
    icon: <Shield size={16} className="text-orange-400" />,
    gridClass: "md:col-span-1 md:row-span-1" // ছোট স্কয়ার কার্ড
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    quote: "The stories and insights from other users have been invaluable in my personal and professional development. It acts as my private thought sanctuary and external brain.",
    rating: 5,
    tag: "Productivity",
    icon: <ArrowUpRight size={16} className="text-cyan-400" />,
    gridClass: "md:col-span-1 md:row-span-1" // ছোট স্কয়ার কার্ড
  },
  {
    id: 4,
    name: "David Kim",
    role: "Teacher",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    quote: "I've been able to capture and share my teaching experiences in a meaningful way. Highly recommended for anyone seeking true self-evolution and structural diary entries. The privacy encryption levels are top notch.",
    rating: 5,
    tag: "Self Evolution",
    icon: <Heart size={16} className="text-rose-400" />,
    gridClass: "md:col-span-2 md:row-span-1" // বড় কার্ড (Width-wise)
  }
];

export default function PremiumBentoTestimonials() {
  return (
    <section className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden border-t border-default-100">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-125 h-125 bg-violet-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-125 h-125 bg-orange-500/5 rounded-full blur-[140px] -z-10" />

      {/* Main Container - mx-auto used strictly */}
      <div className="w-full max-w-7xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs font-semibold text-violet-400">
              Trusted Voices
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              What Our <span className="bg-linear-to-r from-violet-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Community</span> Says
            </h2>
          </div>
          <p className="text-base text-foreground/60 max-w-md leading-relaxed">
            Join thousands of learners who are turning fleeting, daily experiences into structured, lifelong wisdom.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`relative p-6 md:p-8 rounded-[32px] border border-default-200/50 bg-default-50/10 backdrop-blur-md shadow-xl hover:border-default-400 hover:bg-default-50/30 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer ${item.gridClass}`}
            >
              {/* Decorative Big Subtle Quote on Card Background */}
              <Quote size={120} className="absolute -right-4 -bottom-6 text-default-200/5 opacity-[0.02] group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-300" />

              <div className="space-y-6">
                {/* Card Top Row: Badge/Tag & Stars */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-background/60 border border-default-200/60 text-xs font-medium text-foreground/80 shadow-xs">
                    {item.icon}
                    <span>{item.tag}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#eab308" className="text-yellow-500" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm md:text-base text-foreground/80 font-medium italic leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-default-200/40 z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-default-200 grayscale-300 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-violet-400 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-default-400 font-medium">{item.role}</p>
                  </div>
                </div>
                
                {/* Premium Accent Tiny Arrow Icon */}
                <div className="p-2 rounded-full bg-default-100 text-default-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}