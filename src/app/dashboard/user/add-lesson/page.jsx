/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  Send,
  UploadCloud,
  Sparkles,
  Smile,
  Layers,
  Eye,
  ArrowRight,
  ArrowLeft,
  X,
  FileText,
} from "lucide-react";
import { createLesson } from "@/lib/actions/lesson";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AddLessonPage() {
  // Current Step Tracker
  const [currentStep, setCurrentStep] = useState(1);

  const { data: session } = useSession();
  const user = session?.user || null;

  const router = useRouter();

  // Form States
  const [headline, setHeadline] = useState("");
  const [lesson, setLesson] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");
  const [selectedTone, setSelectedTone] = useState("Motivational");
  const [visibility, setVisibility] = useState("Public");

  // Image Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(""); // <-- নতুন ইমেজ এরর স্টেট যুক্ত করা হলো

  // UI Options
  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
    "Philosophy",
  ];

  const emotionalTones = [
    {
      name: "Motivational",
      emoji: "🔥",
      color: "from-orange-500/10 to-amber-500/10 border-amber-500/30 text-amber-400",
    },
    {
      name: "Sad & Heavy",
      emoji: "🔮",
      color: "from-purple-500/10 to-indigo-500/10 border-purple-500/30 text-purple-400",
    },
    {
      name: "Gratitude",
      emoji: "☕",
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    },
    {
      name: "Realization",
      emoji: "✨",
      color: "from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-cyan-400",
    },
    {
      name: "Ambition",
      emoji: "🚀",
      color: "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/30 text-fuchsia-400",
    },
    {
      name: "Philosophical",
      emoji: "🌌",
      color: "from-sky-500/10 to-indigo-500/10 border-sky-400/30 text-sky-400",
    },
    {
      name: "Vulnerable",
      emoji: "🩹",
      color: "from-rose-500/10 to-red-500/10 border-rose-500/30 text-rose-400",
    },
    {
      name: "Calm & Mindful",
      emoji: "🧘",
      color: "from-lime-500/10 to-green-500/10 border-green-500/30 text-green-400",
    },
  ];

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("⚠️ Please select a valid image file (PNG, JPG).");
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(""); // ফাইল সঠিকভাবে সিলেক্ট হলে এরর চলে যাবে
    }
  };

  // Upload Image to ImgBB and return URL
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey)
      throw new Error("ImgBB API key is missing in environment variables");

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed to ImgBB");
    }
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(""); // ড্রপ সাকসেস হলে এরর ক্লিয়ার হবে
    } else {
      setImageError("⚠️ Dropped file is not a valid image.");
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setImageError("");
  };

  // Step Validation & Navigation
  const nextStep = () => {
    if (currentStep === 1 && (!headline.trim() || !lesson.trim())) {
      toast.error("Please fill in the headline and core lesson first.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const mockLessonId = "lesson_123";

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // কাস্টম ইমেজ রিকোয়ার্ড ভ্যালিডেশন চেক
    if (!selectedFile) {
      setImageError("⚠️ Image attachment is required to commit this lesson!");
      toast.error("Please upload a contextual image.");
      return; // সাবমিশন ব্লক করা হলো
    }

    setIsUploading(true);
    let uploadedImageUrl = "";

    try {
      if (selectedFile) {
        uploadedImageUrl = await uploadToImgBB(selectedFile);
      }

      const payload = {
        title: headline,
        shortDescription: lesson,
        category: selectedCategory,
        emotionalTone: selectedTone,
        accessLevel: visibility,
        lessonId: mockLessonId,
        createdAt: new Date().toISOString().split("T")[0],
        image: uploadedImageUrl,
        userId: user?.id || null, 
        userName: user?.name || null, 
        userImage: user?.image || null, 
        userEmail: user?.email || null, 
      };

      console.log(payload);

      const res = await createLesson(payload);

      if (res?.insertedId || res?.success) {
        toast.success("Lesson successfully added to your vault!");
        setHeadline("");
        setLesson("");
        setSelectedCategory("Personal Growth");
        setSelectedTone("Motivational");
        setVisibility("Public");
        setSelectedFile(null);
        setImagePreview(null);
        setImageError("");
        setCurrentStep(1);
        router.push("/dashboard/user/my-lessons");
      } else {
        toast.error("Failed to commit lesson data.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong during submission.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 md:p-8 font-sans antialiased selection:bg-purple-500/30 relative">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Framework Box */}
      <div className="w-full max-w-5xl bg-zinc-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-800/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[80vh] z-10">
      
        {/* LEFT PANEL */}
        <div className="md:col-span-4 bg-linear-to-b from-[#180828] via-[#0d0614] to-[#09040e] p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800/60 relative">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/20 text-xs font-medium tracking-wide text-purple-300">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-purple-400" />{" "}
              Digital Vault
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight leading-tight">
                Share Your <br />
                <span className="bg-linear-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent italic">
                  Wisdom.
                </span>
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Your lived experience is a blueprint for someone else&apos;s
                breakthrough. Secure it here forever.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2 hidden md:block backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                <FileText className="h-3.5 w-3.5" />
                <span>Step Insight</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                {currentStep === 1 &&
                  "Start with a crystalline headline that captures the immediate lesson."}
                {currentStep === 2 &&
                  "Categorizing helps eager minds discover your thought patterns seamlessly."}
                {currentStep === 3 &&
                  "Adding a visual safe-keeps the context. Set standard public or gated access."}
              </p>
            </div>
          </div>

          {/* Stepper Dots/Buttons */}
          <div className="flex items-center gap-4 pt-8 md:pt-0">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (step > 1 && (!headline.trim() || !lesson.trim()))
                        return;
                      setCurrentStep(step);
                    }}
                    className={`flex items-center justify-center h-9 w-9 rounded-xl font-bold text-xs transition-all duration-300 ${
                      currentStep === step
                        ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 scale-105 border border-purple-400/30"
                        : currentStep > step
                          ? "bg-purple-950/40 text-purple-400 border border-purple-500/30"
                          : "bg-zinc-900 text-zinc-600 border border-zinc-800"
                    }`}
                  >
                    {step}
                  </button>
                </div>
                {step < 3 && (
                  <div
                    className={`h-0.5 w-6 md:w-8 rounded transition-all duration-300 ${
                      currentStep > step ? "bg-purple-600" : "bg-zinc-800"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-8 p-6 md:p-10 flex flex-col justify-between bg-zinc-950/20">
          <div className="min-h-[46vh] flex flex-col justify-center">
            {/* STEP 1: Inputs */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 block pl-0.5">
                    The Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g., The Art of Saying No Without Feeling Guilty"
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 focus:border-purple-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 block pl-0.5">
                    The Core Lesson
                  </label>
                  <textarea
                    rows="5"
                    value={lesson}
                    onChange={(e) => setLesson(e.target.value)}
                    placeholder="Unpack your raw realization, the setup, and the outcome..."
                    className="w-full bg-zinc-900/60 border border-zinc-800/80 focus:border-purple-500/50 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Categories & Tone */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 flex items-center gap-1.5 pl-0.5">
                    <Layers className="h-3.5 w-3.5" /> Select Metadata Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs px-4 py-2.5 rounded-xl font-medium border transition-all duration-200 ${
                          selectedCategory === cat
                            ? "bg-purple-600 text-white border-transparent shadow-lg shadow-purple-600/10"
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 flex items-center gap-1.5 pl-0.5">
                    <Smile className="h-3.5 w-3.5" /> Emotional Frequency
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {emotionalTones.map((tone) => (
                      <button
                        key={tone.name}
                        type="button"
                        onClick={() => setSelectedTone(tone.name)}
                        className={`text-xs p-3 rounded-xl font-medium border flex flex-col items-center justify-center gap-2 transition-all duration-200 bg-linear-to-b ${
                          selectedTone === tone.name
                            ? "from-purple-950/50 to-zinc-900 border-purple-500 text-purple-300 ring-1 ring-purple-500/30 scale-[1.02]"
                            : "from-zinc-900/30 to-zinc-900/80 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-xl">{tone.emoji}</span>
                        <span className="text-[11px] tracking-wide">
                          {tone.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Images & Access */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 block pl-0.5">
                    Visual Context Attachment
                  </label>

                  {!imagePreview ? (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className={`border border-dashed rounded-xl p-8 text-center bg-zinc-900/20 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                        imageError 
                          ? "border-red-500/50 bg-red-500/2" 
                          : "border-zinc-800 hover:border-purple-500/40"
                      }`}
                    >
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className={`p-3 rounded-xl bg-zinc-900 border text-zinc-400 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all ${imageError ? "border-red-500/30 text-red-400" : "border-zinc-800"}`}>
                        <UploadCloud className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-zinc-300">
                          Drop your contextual image or browse
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          Supports PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-zinc-800 max-h-44 bg-zinc-950 flex items-center justify-center group shadow-inner">
                      <img
                        src={imagePreview}
                        alt="Attached Context"
                        className="object-contain max-h-44 w-full"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" /> Remove Image
                        </button>
                      </div>
                    </div>
                  )}

                  {/* লাইভ ডাইনামিক এরর মেসেজ কম্পোনেন্ট */}
                  {imageError && (
                    <p className="text-[11px] font-semibold text-red-400 animate-pulse pl-1 pt-1 flex items-center gap-1">
                      {imageError}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80 flex items-center gap-1.5 pl-0.5">
                    <Eye className="h-3.5 w-3.5" /> Vault Accessibility Level
                  </label>
                  <div className="relative">
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-purple-500/40 rounded-xl px-4 py-3.5 text-sm text-zinc-300 appearance-none focus:outline-none cursor-pointer font-medium transition-colors"
                    >
                      <option value="Public" className="bg-zinc-900">
                        Public — Stream to all system discoverers
                      </option>
                      <option value="Premium" className="bg-zinc-900">
                        Premium — Gate behind elite membership token
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LOWER SECTION: Form Steering Actions */}
          <div className="pt-5 border-t border-zinc-800/60 flex items-center justify-between gap-4 mt-6">
            <button
              type="button"
              disabled={currentStep === 1 || isUploading}
              onClick={prevStep}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentStep === 1 || isUploading
                  ? "text-zinc-700 cursor-not-allowed"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                disabled={
                  currentStep === 1 && (!headline.trim() || !lesson.trim())
                }
                onClick={nextStep}
                className={`text-xs font-semibold py-2.5 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-md ${
                  currentStep === 1 && (!headline.trim() || !lesson.trim())
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20"
                }`}
              >
                Proceed <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isUploading}
                className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-purple-500/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading to Vault..." : "Commit to Vault"}
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}