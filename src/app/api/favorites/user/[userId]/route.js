const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text || "Unknown response" };
  }
}

export async function GET(request, { params }) {
  try {
    const response = await fetch(`${BASE_URL}/api/favorites/user/${params.userId}`, {
      cache: "no-store",
    });
    const data = await parseResponse(response);
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Favorites proxy GET error:", error);
    return Response.json({ message: "Backend unreachable", success: false }, { status: 503 });
  }
}
