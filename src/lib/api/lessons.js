
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getLessons = async (lessonId) => {
    const res = await fetch(`${baseUrl}/api/lessons?lessonId=${lessonId}`);
    return res.json();
}


export const showLessons = async () => {
    const res = await fetch(`${baseUrl}/api/lessons`);
    return res.json();
}


export const getLessonById = async (lessonId) => {
    const res = await fetch(`${baseUrl}/api/lessons/${lessonId}`);
    const data = await res.json();
    return data.data;
}


export const getLessonByUserId = async (userId) => {
    const res = await fetch(`${baseUrl}/api/lessons/user/${userId}`);
    const data = await res.json();
    console.log("getLessonByUserId data:", data);
    return data.data;
}

