/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
  "Philosophy",
];

const emotionalTones = [
  "Motivational",
  "Sad & Heavy",
  "Gratitude",
  "Realization",
  "Ambition",
  "Philosophical",
  "Vulnerable",
  "Calm & Mindful",
];

const visibilityOptions = ["Public", "Private", "Unlisted"];

// আপনার ImgBB API key এখানে বসান। (অথবা process.env.NEXT_PUBLIC_IMGBB_API_KEY ব্যবহার করতে পারেন)
const NEXT_PUBLIC_IMGBB_API_KEY = "61904dbe0c4861d4ab229fb294ed8526";

export default function EditLessonForm({ lesson }) {
  const router = useRouter();
  const [title, setTitle] = useState(lesson?.title || "");
  const [shortDescription, setShortDescription] = useState(
    lesson?.shortDescription || "",
  );
  const [category, setCategory] = useState(
    lesson?.category || "Personal Growth",
  );
  const [emotionalTone, setEmotionalTone] = useState(
    lesson?.emotionalTone || "Motivational",
  );
  const [accessLevel, setAccessLevel] = useState(
    lesson?.accessLevel || "Public",
  );
  const [imageUrl, setImageUrl] = useState(lesson?.image || "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // ইমেজ আপলোড হ্যান্ডলার (ImgBB)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ক্লায়েন্ট-সাইড ভ্যালিডেশন
    if (
      !NEXT_PUBLIC_IMGBB_API_KEY ||
      NEXT_PUBLIC_IMGBB_API_KEY === "YOUR_IMGBB_API_KEY_HERE"
    ) {
      toast.error("Please configure your ImgBB API Key first.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // ভেরিয়েবল নাম ফিক্স করা হয়েছে: IMGBB_API_KEY
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image updated successfully!");
      } else {
        throw new Error(data.message || "ImgBB upload failed");
      }
    } catch (err) {
      console.error("ImgBB Error:", err);
      toast.error("Failed to upload image. Please check API Key.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !shortDescription.trim()) {
      toast.error("Headline and lesson text are required.");
      return;
    }

    if (isUploading) {
      toast.error("Please wait until the image finishes uploading.");
      return;
    }

    setIsSubmitting(true);

    try {
      // এক্সপ্রেস ব্যাকএন্ডের ফুল এড্রেস (পোর্ট ৮০০০) সরাসরি উল্লেখ করুন
      const response = await fetch(
        `http://localhost:8000/api/lessons/${lesson?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            shortDescription: shortDescription.trim(),
            category,
            emotionalTone,
            accessLevel,
            image: imageUrl, // ImgBB থেকে পাওয়া ইমেজের লিঙ্ক যাচ্ছে
          }),
        },
      );

      // সার্ভার রেসপন্স টাইপ চেক (HTML নাকি JSON)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textError = await response.text();
        console.error("Server raw response:", textError);
        throw new Error(
          "Server returned HTML instead of JSON. Check backend terminal for crash logs.",
        );
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update the lesson.");
      }

      toast.success("Lesson updated successfully!");
      router.push("/dashboard/user/my-lessons");
      router.refresh(); // ডেটা রিফ্রেশ করার জন্য
    } catch (error) {
      console.error("Lesson update failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Unable to update the lesson.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-[#0b1220] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100">
              Edit lesson
            </h1>
            <p className="text-sm text-zinc-400">
              Update content and image settings of your lesson.
            </p>
          </div>
          <Button
            type="button"
            variant="light"
            size="sm"
            className="text-zinc-300 border-zinc-700 hover:text-white"
            onClick={() => router.push("/dashboard/user/my-lessons")}
          >
            Cancel
          </Button>
        </div>

        {/* নতুন ক্লিন সিঙ্গেল ইমেজ UI (ক্লিক টু চেঞ্জ) */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-zinc-100 block">
            Lesson Feature Image
          </span>

            <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070b14] flex flex-col items-center justify-center p-4 text-center group cursor-pointer transition hover:border-zinc-300 dark:hover:border-zinc-700">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Feature Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-200"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-indigo-600/10 opacity-30" />
            )}

            {/* ওভারলে টেক্সট লেয়ার */}
            <div className="relative z-10 bg-zinc-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800 max-w-50">
              <p className="text-xs font-semibold text-purple-400">
                {isUploading
                  ? "Uploading to ImgBB..."
                  : "Click to change picture"}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                JPG, PNG or GIF
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
            />
          </div>
        </div>
      </div>

      {/* বাকি ইনপুট ফিল্ড সমূহ */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">Headline</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070b14] px-4 py-3 text-sm text-foreground dark:text-zinc-100 outline-none transition focus:border-purple-500"
            placeholder="Lesson title"
          />
        </label>

        <label className="block text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070b14] px-4 py-3 text-sm text-foreground dark:text-zinc-100 outline-none focus:border-purple-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">Emotional Tone</span>
          <select
            value={emotionalTone}
            onChange={(e) => setEmotionalTone(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070b14] px-4 py-3 text-sm text-foreground dark:text-zinc-100 outline-none focus:border-purple-500"
          >
            {emotionalTones.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">Visibility</span>
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-zinc-800 bg-[#070b14] px-4 py-3 text-sm text-zinc-100 outline-none focus:border-purple-500"
          >
            {visibilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm text-zinc-300">
        <span className="font-medium text-zinc-100">Lesson text</span>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          rows={6}
          className="mt-2 w-full rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070b14] px-4 py-4 text-sm text-foreground dark:text-zinc-100 outline-none resize-none transition focus:border-purple-500"
          placeholder="Write your lesson here..."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-zinc-200 hover:bg-default-50"
          onClick={() => router.push("/dashboard/user/my-lessons")}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="w-full sm:w-auto rounded-2xl bg-purple-500 text-white hover:bg-purple-400 font-medium"
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
