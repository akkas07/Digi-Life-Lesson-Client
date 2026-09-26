'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllUsers = async () => {
    const res = await fetch(`${baseUrl}/api/users`);
    return res.json();
};


export const getUserReports = async () => {
    const res = await fetch(`${baseUrl}/api/reports`);
    return res.json();
}


// ১. রোল আপডেট করার ফাংশন (PATCH Method)
export const updateUserRole = async (userId, newRole) => {
    const res = await fetch(`${baseUrl}/api/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
    });
    return res.json();
};

// ২. ইউজার ডিলিট করার ফাংশন (DELETE Method)
export const deleteUserManage = async (userId) => {
    const res = await fetch(`${baseUrl}/api/users/${userId}`, { // স্পেস ফিক্স করা হয়েছে
        method: "DELETE",
    });
    return res.json();
};     
          