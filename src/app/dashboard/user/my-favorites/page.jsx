/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getFavoriteLessons } from "@/lib/api/favorite";
import { ArrowRight, Trash2, Bookmark, FolderHeart } from "lucide-react";
import { deleteFavoriteLesson } from "@/lib/actions/favorite";
import Link from "next/link";
import { DeleteFavorite } from "./DeleteFavorite";

const MyFavoritePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const userId = session?.user?.id;
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const result = await getFavoriteLessons(userId);
        setFavorites(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [userId]);
  // const handleDelete = async (fav) => {
  //   const currentFavId = fav._id;

  //   const targetLessonId = fav.lessonId || fav.lessonDetails?._id;

  //   if (!userId || !targetLessonId) {
  //     alert("Invalid user or lesson identifiers.");
  //     return;
  //   }

  //   if (!confirm("Are you sure you want to remove this from your favorites?"))
  //     return;

  //   try {
  //     setDeletingId(currentFavId);

  //     const response = await deleteFavoriteLesson(userId, targetLessonId);

  //     if (response.success) {
  //       setFavorites((prev) =>
  //         prev.filter((item) => item._id !== currentFavId),
  //       );
  //     } else {
  //       alert(response.message || "Failed to delete item");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting favorite:", error);
  //     alert("Something went wrong while removing the item.");
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040712] flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest">
        LOADING COLLECTION...
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#040712] text-zinc-100 relative overflow-hidden">
      {/* Background Subtle Ambient Glows - Matching your brand layout */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-10 border-b border-zinc-900 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              Saved Collection
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1">
              Your personal index of wisdom. You have bookmarked{" "}
              <span className="text-purple-400 font-bold font-mono">
                {favorites.length}
              </span>{" "}
              entries.
            </p>
          </div>
        </div>
      </div>

      {/* Core Table Section with clean Dark Luxury Borders */}
      <div className="w-full overflow-x-auto rounded-[20px] border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md relative z-10 shadow-2xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-zinc-500 uppercase text-[10px] tracking-widest border-b border-zinc-900 bg-[#0d101d]/60">
              <th className="p-5 font-bold">Wisdom Context</th>
              <th className="p-4 font-bold">Author</th>
              <th className="p-4 font-bold">Saved Date</th>
              <th className="p-4 font-bold text-right pr-6">Actions</th>
            </tr>
          </thead>

          {favorites.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={4} className="p-16 text-center bg-[#090b14]/20">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-zinc-900/40 border border-zinc-800/60 rounded-full text-zinc-600">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400">
                        No favorites found.
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">
                        Please add some lessons to your favorites list.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-zinc-900/50">
              {favorites.map((fav) => (
                <tr
                  key={fav._id}
                  className="hover:bg-[#121626]/30 transition-colors group"
                >
                  {/* COLUMN 1: IMAGE & TEXT BANNER */}
                  <td className="p-4 flex items-center gap-4 max-w-sm">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl border border-zinc-850 overflow-hidden shrink-0 flex items-center justify-center text-zinc-400 shadow-inner">
                      {fav.lessonDetails?.image ? (
                        <img
                          src={fav.lessonDetails.image}
                          alt={fav.lessonDetails.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-base">📄</span>
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest block">
                        {fav.lessonDetails?.category || "Lesson"}
                      </span>
                      <p
                        className="font-bold text-sm text-zinc-200 truncate"
                        title={fav.lessonDetails?.title}
                      >
                        {fav.lessonDetails?.title || "Untitled Lesson"}
                      </p>
                    </div>
                  </td>

                  {/* COLUMN 2: AUTHOR RADIAL INITIALS */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-800/30 text-purple-300 flex items-center justify-center text-xs font-black uppercase overflow-hidden">
                        {fav.lessonDetails?.userImage ? (
                          <img
                            src={fav.lessonDetails.userImage}
                            alt={fav.lessonDetails?.userName || "Author"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>
                            {fav.lessonDetails?.userName
                              ? fav.lessonDetails.userName.substring(0, 1)
                              : "A"}
                          </span>
                        )}
                      </div>

                      <span className="font-medium text-xs text-zinc-400">
                        {fav.lessonDetails?.userName || "Admin"}
                      </span>
                    </div>
                  </td>

                  {/* COLUMN 3: TIME BADGE */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-lg border border-zinc-850/40">
                      <span className="w-1 h-1 rounded-full bg-purple-500" />
                      {fav.createdAt
                        ? new Date(fav.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </td>

                  {/* COLUMN 4: ACTION ICON BUTTONS */}

                  <td className="p-4 text-right pr-10">
                    <div className="flex items-center gap-2.5 justify-end">
                      <Link
                        href={`/public-lessons`}
                        className="p-2 bg-zinc-900/40 border border-zinc-800/50 text-zinc-400 hover:text-purple-400 hover:border-purple-900/50 rounded-xl transition-all shadow-sm"
                        title="View Lesson"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* 💡 এখানে onDeleteSuccess প্রপসটি পাস করুন */}
                      <DeleteFavorite
                        lessonId={fav.lessonId}
                        onDeleteSuccess={(deletedId) => {
                          setFavorites((prev) =>
                            prev.filter((item) => item.lessonId !== deletedId),
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default MyFavoritePage;
