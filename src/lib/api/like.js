"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const  totalUserLessons = async (userId) => {
  const res = await fetch(`${baseUrl}/api/lessons/${userId}`);
  return res.json();

};

export const getLikeCount = async (userId) => {
    const res = await fetch(`${baseUrl}/api/like/${userId}`);
    const likeCount = await res.json();
    
    return likeCount;
}