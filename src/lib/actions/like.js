"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const likeLesson = async (lessonId, userId) => {
  const res = await fetch(`${baseUrl}/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lessonId: lessonId, userId: userId }),
  });

  const data = await res.json();
  return data;
};
