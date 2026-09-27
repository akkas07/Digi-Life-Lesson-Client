'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

const readResponse = async (res) => {
  const text = await res.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Unexpected response from the server." };
  }
};

export const getAllUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });

  if (!res.ok) {
    const data = await readResponse(res);
    throw new Error(data.message || data.error || "Unable to fetch users.");
  }

  return readResponse(res);
};

export const getUserReports = async () => {
  const res = await fetch(`${baseUrl}/api/reports`, { cache: "no-store" });

  if (!res.ok) {
    const data = await readResponse(res);
    throw new Error(data.message || data.error || "Unable to fetch reports.");
  }

  return readResponse(res);
};

export const updateUserRole = async (userId, newRole) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: newRole }),
    cache: "no-store",
  });

  const data = await readResponse(res);

  if (!res.ok) {
    throw new Error(data.message || data.error || "Could not update role.");
  }

  return data;
};

export const deleteUserManage = async (userId) => {
  const res = await fetch(`${baseUrl}/api/users/${userId}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await readResponse(res);

  if (!res.ok) {
    throw new Error(data.message || data.error || "Could not delete user.");
  }

  return data;};          


// রিভিউ স্ট্যাটাস আপডেট
export const updateLessonReview = async (id, isReviewed) => {
  const res = await fetch(`${baseUrl}/api/lessons/review/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isReviewed }),
  });
  return res.json();
};


// ফিচারড স্ট্যাটাস আপডেট
export const updateLessonFeatured = async (id, isFeatured) => {
  const res = await fetch(`${baseUrl}/api/lessons/featured/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFeatured }),
  });
  return res.json();
};

// লেসন ডিলিট
export const deleteLessonAdmin = async (id) => {
  const res = await fetch(`${baseUrl}/api/lessons/${id}`, { method: "DELETE" });
  return res.json();
};

// রিপোর্ট ফেচ
export const fetchReports = async () => {
  const res = await fetch(`${baseUrl}/api/reports`, { cache: "no-store" });
  return res.json();
}

// top contributors
export const getTopContributors = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/top-contributors`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch top contributors");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
};

// tMostSavedLessons
export const getMostSavedLessons = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/most-saved-lessons`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch most saved lessons");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
};