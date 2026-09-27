const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getLessons = async (lessonId) => {
    try {
        const res = await fetch(`${baseUrl}/api/lessons?lessonId=${lessonId}`, { cache: "no-store" });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export const showLessons = async () => {
    try {
        const res = await fetch(`${baseUrl}/api/lessons`, { cache: "no-store" });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export const getLessonById = async (lessonId) => {
    try {
        const res = await fetch(`${baseUrl}/api/lessons/${lessonId}`, { cache: "no-store" });
        const data = await res.json();
        return data?.data ?? null;
    } catch (error) {
        return null;
    }
}

export const getLessonByUserId = async (userId) => {
    try {
        const res = await fetch(`${baseUrl}/api/lessons/user/${userId}`, { cache: "no-store" });
        const data = await res.json();
        return data?.data ?? null;
    } catch (error) {
        return null;
    }
}
