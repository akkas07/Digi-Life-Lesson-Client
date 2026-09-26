'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFeaturedLessons = async () => {
    const res = await fetch(`${baseUrl}/api/lessons/featured`);
    return res.json();
}
