'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Changed parameters order to (userId, lessonId) to match your UI Component layout!
export const deleteFavoriteLesson = async (userId, lessonId) => {
    try {
        const res = await fetch(`${baseUrl}/api/favorites`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, lessonId }) // Matches expected backend keys
        });

        if (!res.ok) {
            const errorMsg = await res.json();
            return { success: false, message: errorMsg?.message || "Failed to delete item" };
        }

        return await res.json();
    } catch (error) {
        console.error("Network or internal error:", error);
        return { success: false, message: "Something went wrong while removing the item." };
    }
}