
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

const buildUrl = (path) => (baseUrl ? `${baseUrl}${path}` : path);

const parseJsonSafe = async (res) => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const fetchJsonSafe = async (path, options = {}) => {
  const res = await fetch(buildUrl(path), { cache: "no-store", ...options });
  if (!res.ok) return null;
  return parseJsonSafe(res);
};

export const getLessons = async (lessonId) => {
    return await fetchJsonSafe(`/api/lessons?lessonId=${lessonId}`);
}


export const showLessons = async () => {
    return await fetchJsonSafe("/api/lessons");
}


export const getLessonById = async (lessonId) => {
    const data = await fetchJsonSafe(`/api/lessons/${lessonId}`);
    return data?.data ?? null;
}


export const getLessonByUserId = async (userId) => {
    const data = await fetchJsonSafe(`/api/lessons/user/${userId}`);
    console.log("getLessonByUserId data:", data);
    return data?.data ?? null;
}

