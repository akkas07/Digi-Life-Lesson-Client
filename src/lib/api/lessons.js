
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getLessons = async (lessonId) => {
    const res = await fetch(`${baseUrl}/api/lessons?lessonId=${lessonId}`);
    return res.json();
}

