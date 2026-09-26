/* eslint-disable react-hooks/immutability */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Star,
  Sparkles,
} from "lucide-react";

const carouselData = [
  {
    id: 1,
    badge: "Capture Your Journey",
    badgeIcon: <BookOpen size={14} />,
    title: "Preserve Your Life's Greatest Lessons",
    description:
      "Don't let wisdom fade. DigitalLesson is your secure vault for storing personal growth insights, meaningful moments, and the philosophy that guides you.",
    ctaText: "Start Your Journal",
    secondaryCtaText: "How it works",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", // পাহাড় ও প্রকৃতির থিম
    rating: "4.9",
    stats: [
      { label: "Active Learners", value: "10K+" },
      { label: "Lessons Shared", value: "5K+" },
      { label: "Growth Rate", value: "98%" },
    ],
  },
  {
    id: 2,
    badge: "Reflect & Grow",
    badgeIcon: <Sparkles size={14} />,
    title: "Transform Experiences Into Infinite Wisdom",
    description:
      "Review your daily insights with deep AI-powered analytics. Understand patterns in your thinking, track emotional growth, and build consistency every single day.",
    ctaText: "Explore Features",
    secondaryCtaText: "Watch Demo",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200", // মেডিটেশন/রিফ্লেকশন থিম
    rating: "4.8",
    stats: [
      { label: "Daily Journalers", value: "8K+" },
      { label: "AI Insights Generated", value: "25K+" },
      { label: "Satisfaction", value: "99%" },
    ],
  },
  {
    id: 3,
    badge: "Secure Vault",
    badgeIcon: <Star size={14} />,
    title: "Your Private Thought Sanctuary",
    description:
      "Zero-knowledge encryption ensures that your personal wisdom journal remains entirely yours. Access your cloud vault securely from any device, anytime.",
    ctaText: "Secure Account",
    secondaryCtaText: "Privacy Policy",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", // টেকনোলজি/সিকিউরিটি থিম
    rating: "5.0",
    stats: [
      { label: "Encryption Level", value: "AES-256" },
      { label: "Uptime Guarantee", value: "99.9%" },
      { label: "Data Backups", value: "Hourly" },
    ],
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // অটো-প্লে লজিক (প্রতি ৫ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselData.length - 1 : prev - 1,
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 lg:px-16 bg-background overflow-hidden">
      {/* Background Glows (আপনার ডিজাইনের সাথে ম্যাচিং গ্লো) */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-orange-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute -bottom-40 -right-40 w-125 h-125 bg-violet-500/5 rounded-full blur-[120px] -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        {/* Left Side: Content Section */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-default-200/60 bg-default-100/40 backdrop-blur-md text-xs font-medium text-foreground/80 animate-fadeIn">
            {carouselData[currentSlide].badgeIcon}
            <span>{carouselData[currentSlide].badge}</span>
          </div>

          {/* Title & Description with smooth content transitions */}
          <div className="space-y-4 min-h-55 md:min-h-45">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground bg-clip-text transition-all duration-500 ease-in-out">
              {carouselData[currentSlide].title}
            </h1>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-xl transition-all duration-500">
              {carouselData[currentSlide].description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              radius="full"
              className="font-medium bg-linear-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all px-6 py-6"
              endContent={<ArrowRight size={16} />}
            >
              {carouselData[currentSlide].ctaText}
            </Button>
            <Button
              variant="bordered"
              radius="full"
              className="font-medium border-default-300 hover:bg-default-100/50 text-foreground px-6 py-6"
            >
              {carouselData[currentSlide].secondaryCtaText}
            </Button>
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-default-200/40">
            {carouselData[currentSlide].stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-default-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Section / Image Card */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative w-full">
          <div className="relative w-full aspect-square max-w-120 md:max-w-125 rounded-[32px] overflow-hidden p-1 bg-linear-to-b from-violet-500/20 to-orange-500/20 shadow-2xl backdrop-blur-xs">
            {/* Slide Image Wrapper with fade effect */}
            <div className="relative w-full h-full rounded-[28px] overflow-hidden group">
              <img
                src={carouselData[currentSlide].image}
                alt={carouselData[currentSlide].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out scale-100 group-hover:scale-105"
              />
              {/* Overlay Gradient to make it premium */}
              <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Rating Badge Overlay (Top Left) */}
            <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-background/60 backdrop-blur-md border border-default-200/50 shadow-md">
              <div className="p-1 rounded-lg bg-warning-500 text-white">
                <Star size={12} fill="currentColor" />
              </div>
              <span className="text-sm font-bold text-foreground">
                {carouselData[currentSlide].rating}
              </span>
              <span className="text-xs text-default-400">Rating</span>
            </div>

            
          </div>

          {/* Navigation Controls (Dots & Arrows) */}
          <div className="flex items-center justify-between w-full max-w-120 md:max-w-125 mt-6 px-2">
            {/* Progress Dots Indicators */}
            <div className="flex gap-2.5">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-indigo-500"
                      : "w-2 bg-default-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Icon Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-default-200 bg-background/50 backdrop-blur-md text-foreground hover:bg-default-200 transition-colors shadow-xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-default-200 bg-background/50 backdrop-blur-md text-foreground hover:bg-default-200 transition-colors shadow-xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
