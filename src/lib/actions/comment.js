'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const postComment = (comment) => {

    const res = fetch(`${baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },      
        body: JSON.stringify(comment)
    });
    return res.json();
}