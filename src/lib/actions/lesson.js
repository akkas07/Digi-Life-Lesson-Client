'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createLesson = async (newLessonData) => {
    const res = await fetch(`${baseUrl}/api/lessons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLessonData),
    });
    return res.json();
}