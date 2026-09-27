const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getFavoriteLessons = async (userId) => {
  const res = await fetch(`${baseUrl}/api/favorites/user/${userId}`, {
    cache: "no-store",
  });
  return res.json();
};

export const toggleFavorite = async (lessonId, userId) => {
  const res = await fetch(`${baseUrl}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId, userId }),
  });
  return res.json();
};

export const removeFavorite = async (lessonId, userId) => {
  // toggles off (same endpoint)
  return toggleFavorite(lessonId, userId);
};
