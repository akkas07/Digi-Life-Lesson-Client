"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const  totalUserLessons = async (userId) => {
  const res = await fetch(`${baseUrl}/api/lessons/${userId}`);
  return res.json();

};

// lib/api/like.js
export const getLikeCount = async (userId) => {
  try {
    const res = await fetch(`${baseUrl}/api/like/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) return 0;
    const data = await res.json();
    
    // ডাটা আসার পর লগ দিয়ে দেখুন কনসোলে কি আসছে
    console.log("API Response:", data); 
    
    // যদি আপনার সার্ভার { "result": [...] } পাঠায়
    return data.result || []; 
  } catch (error) {
    console.error("Fetch error:", error);
    return 0;
  }
}