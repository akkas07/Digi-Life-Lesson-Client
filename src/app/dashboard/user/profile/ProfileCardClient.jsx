/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Chip } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { X, Check, Camera, Star, BookOpen, Bookmark, Edit2, ExternalLink } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// Mock data for user's lessons
const mockLessons = [
  {
    id: "1",
    title: "Embracing Failure as a Stepping Stone",
    description: "I used to fear failure more than anything. It wasn't until I hit rock bottom that I realized failure is just feedback in disguise. Here is what I learned...",
    category: "Personal Growth",
    emotionalTone: "Realization",
    createdAt: "2026-06-21",
    accessLevel: "Free",
    likesCount: 124,
  },
  {
    id: "2",
    title: "The Art of Saying No",
    description: "For years, I was a chronic people-pleaser. Saying yes to everything meant saying no to my own priorities. Learning this one word changed my life...",
    category: "Mindset",
    emotionalTone: "Motivational",
    createdAt: "2026-06-18",
    accessLevel: "Premium",
    likesCount: 342,
  },
  {
    id: "3",
    title: "Navigating Career Transitions",
    description: "Switching careers at 30 was the most terrifying and rewarding experience. This lesson outlines the actionable steps I took to pivot successfully...",
    category: "Career",
    emotionalTone: "Gratitude",
    createdAt: "2026-06-15",
    accessLevel: "Free",
    likesCount: 89,
  }
];

const ProfileCardClient = () => {
  const { data: session, isPending } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState("");

  // Mocking user stats and premium status since it might not be in session yet
  const isPremium = session?.user?.isPremium || true; 
  const lessonsCreated = session?.user?.lessonsCreated || 12;
  const lessonsSaved = session?.user?.lessonsSaved || 45;

  useEffect(() => {
    const savedName = localStorage.getItem("profile_name");
    const savedImage = localStorage.getItem("profile_image");

    if (savedName || savedImage) {
      if (savedName) setProfileName(savedName);
      if (savedImage) setProfileImage(savedImage);
    } else if (session?.user) {
      setProfileName(session.user.name || "");
      setProfileImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="w-full flex items-center justify-center py-20 min-h-screen bg-[#0d0e12]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-zinc-800"></div>
          <div className="h-6 w-32 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setTempName(profileName);
    setTempImage(profileImage);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!tempName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setProfileName(tempName);
    setProfileImage(tempImage);

    localStorage.setItem("profile_name", tempName);
    localStorage.setItem("profile_image", tempImage);

    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0e12] text-zinc-300 pb-20 font-sans selection:bg-purple-500/30">
      <Toaster position="top-right" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' } }} />
      
      {/* Top Banner / Gradient */}
      <div className="w-full h-48 md:h-64 bg-linear-to-br from-indigo-900/40 via-purple-900/20 to-zinc-900 relative overflow-hidden">
      
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0d0e12] to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-32 relative z-10">
        
        {/* Profile Details Card */}
        <div className="bg-[#15161a] border border-zinc-800/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 mb-12">
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left w-full">
            
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-linear-to-tr from-purple-600 to-blue-500 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden border-4 border-[#15161a]">
                  {profileImage ? (
                    <img
                      src={isEditing ? tempImage || profileImage : profileImage}
                      alt={profileName}
                      className={`w-full h-full object-cover transition-all ${isEditing ? "blur-[2px] brightness-50" : ""}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-4xl text-zinc-500 bg-zinc-800">
                      {profileName ? profileName.substring(0, 2).toUpperCase() : "US"}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/80 z-10">
                      <Camera width={32} height={32} />
                    </div>
                  )}
                </div>
              </div>
              {isPremium && !isEditing && (
                <div className="absolute bottom-2 right-2 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-amber-500/30 border-2 border-[#15161a] z-20">
                  <Star width={12} height={12} fill="currentColor" />
                  Premium
                </div>
              )}
            </div>

            {/* User Info & Stats */}
            <div className="flex flex-col justify-center w-full grow pt-2">
              {isEditing ? (
                <div className="space-y-5 w-full max-w-md bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-zinc-400">Edit Profile</h3>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">Display Name</label>
                    <Input
                      variant="bordered"
                      placeholder="Enter profile name"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      classNames={{ input: "text-zinc-200" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">Photo URL</label>
                    <Input
                      placeholder="https://example.com/your-photo.jpg"
                      value={tempImage}
                      onChange={(e) => setTempImage(e.target.value)}
                      variant="bordered"
                      classNames={{ input: "text-zinc-200 text-sm" }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase mb-2 block">Email Address</label>
                    <Input
                      value={session?.user?.email || "user@example.com"}
                      isDisabled
                      variant="faded"
                      description="Email cannot be changed."
                      classNames={{ input: "text-zinc-500" }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {profileName || "Anonymous User"}
                    </h2>
                    {isPremium && (
                      <Chip 
                        size="sm" 
                        variant="shadow" 
                        className="bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 font-medium md:ml-2 mx-auto md:mx-0"                        
                      >
                        Premium Member
                      </Chip>
                    )}
                  </div>
                  
                  <p className="text-zinc-400 font-medium flex items-center justify-center md:justify-start gap-2 mb-6">
                    {session?.user?.email || "user@example.com"}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 mt-2">
                    <div className="flex items-center gap-3 bg-zinc-900/60 px-5 py-3 rounded-2xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <BookOpen width={20} height={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold text-white">{lessonsCreated}</span>
                        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">Lessons Created</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-zinc-900/60 px-5 py-3 rounded-2xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <Bookmark width={20} height={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-2xl font-bold text-white">{lessonsSaved}</span>
                        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">Lessons Saved</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="shrink-0 flex items-start self-center lg:self-start mt-6 lg:mt-0">
            {isEditing ? (
              <div className="flex items-center gap-3">
                <Button
                  isIconOnly
                  variant="flat"
                  onPress={() => setIsEditing(false)}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl"
                >
                  <X width={18} height={18} />
                </Button>
                <Button
                  isIconOnly
                  variant="shadow"
                  onPress={handleSaveChanges}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-emerald-500/30"
                >
                  <Check width={18} height={18} />
                </Button>
              </div>
            ) : (
              <Button
                onPress={handleStartEdit}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-2 rounded-xl flex items-center gap-2 border border-zinc-700 transition-all shadow-lg"
              >
                <Edit2 width={14} height={14} />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Public Lessons Section */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-800/60">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                My Public Lessons
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                Lessons you have shared with the community
              </p>
            </div>
            <Button variant="light" className="text-purple-400 font-medium">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLessons.map((lesson) => (
              <div key={lesson.id} className="bg-[#15161a] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all group flex flex-col h-full">
                <div className="p-6 grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <Chip size="sm" className="bg-zinc-800 text-zinc-300 font-medium text-[10px] uppercase tracking-wider">
                      {lesson.category}
                    </Chip>
                    {lesson.accessLevel === "Premium" && (
                      <Chip size="sm" variant="flat" className="bg-amber-500/10 text-amber-500 border border-amber-500/20" >
                        Premium
                      </Chip>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                    {lesson.title}
                  </h4>
                  
                  <p className="text-zinc-400 text-sm line-clamp-3 mb-6 grow">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
                    <div className="flex items-center gap-4 text-zinc-500 text-sm">
                      <span className="flex items-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 text-rose-500/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {lesson.likesCount}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded-md">
                      {lesson.emotionalTone}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-900/40 p-4 border-t border-zinc-800/50 flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-medium">
                    {new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Button size="sm" variant="light" className="text-zinc-300 hover:text-white" endContent={<ExternalLink width={14} height={14} />}>
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileCardClient;
