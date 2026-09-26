'use server';

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

export const getFeaturedLessons = async () => {
  return (await fetchJsonSafe("/api/lessons/featured")) || null;
};

export const getTopContributors = async () => {
  return (await fetchJsonSafe("/api/users/top-contributors")) || [];
};
