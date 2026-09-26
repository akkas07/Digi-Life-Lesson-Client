'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteFavoriteLesson = async (userId, lessonId) => {
    try {
        const res = await fetch(`${baseUrl}/api/favorites/${userId}/${lessonId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            const errorMsg = await res.json();
            return { success: false, message: errorMsg?.message || "Failed to delete item" };
        }

        const data = await res.json();
        
        
        if (data && data.success) {
            return { success: true, message: data.message || "Deleted successfully" };
        } else {
            return { success: false, message: data.message || "Item not found" };
        }
        
    } catch (error) {
        console.error("Network or internal error:", error);
        return { success: false, message: "Something went wrong while removing the item." };
    }
}