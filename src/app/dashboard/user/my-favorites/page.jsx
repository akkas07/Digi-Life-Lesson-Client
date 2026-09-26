"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getFavoriteLessons } from "@/lib/api/favorite";

const MyFavoritePage = () => {
  const { data: session } = useSession();
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6  min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Saved Collection</h1>
        <p className="text-gray-600">
          Your personal index of wisdom. You have bookmarked {favorites.length}
          entries.
        </p>
      </div>

      <table className="w-full  rounded-lg shadow-sm border border-gray-100">
        <thead>
          <tr className="text-left text-gray-400 uppercase text-[10px] tracking-wider">
            <th className="p-6">Wisdom Context</th>
            <th className="p-4">Author</th>
            <th className="p-4">Saved Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((fav) => (
            <tr key={fav._id} className="border-t hover:bg-gray-50 transition">
              <td className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded flex items-center justify-center text-green-700">
                  📄
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Lesson</p>
                  <p className="font-bold text-gray-800">
                    {fav.lessonDetails?.title || "Untitled"}
                  </p>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {fav.lessonDetails?.authorName?.[0] || "A"}
                  </div>
                  <span className="font-medium text-sm">
                    {fav.lessonDetails?.authorName || "Admin"}
                  </span>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-500">
                <span className="border px-2 py-1 rounded text-xs">
                  📅 {new Date(fav.createdAt).toLocaleDateString()}
                </span>
              </td>
              <td className="p-4">
                <button className="mr-3 text-green-800">➡️</button>
                <button className="text-gray-400 hover:text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFavoritePage;
