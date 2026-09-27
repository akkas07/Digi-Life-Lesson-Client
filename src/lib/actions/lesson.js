'use server';

import { revalidatePath } from "next/cache";

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

//  লেসন আপডেট করার Server Action (Edit Form-এর জন্য)
export async function updateLessonAction(lessonId, updatedData) {
  try {
    const response = await fetch(`${baseUrl}/api/lessons/${lessonId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update lesson from backend");
    }

    // ডাটা আপডেট হওয়ার পর ক্যাশ ক্লিয়ার করবে
    revalidatePath("/dashboard/user/my-lessons");
    
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Update Action Error:", error);
    return { success: false, error: error.message };
  }
}

//  লেসন ডিলিট করার Server Action
export async function deleteLessonAction(lessonId) {
  try {
    const response = await fetch(`${baseUrl}/api/lessons/${lessonId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to delete lesson from backend");
    }

    revalidatePath("/dashboard/user/my-lessons");

    return { success: true, message: data.message || "Lesson deleted successfully." };
  } catch (error) {
    console.error("Delete Action Error:", error);
    return { success: false, error: error.message };
  }
}