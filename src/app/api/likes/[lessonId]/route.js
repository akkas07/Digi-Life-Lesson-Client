const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export async function GET(request, { params }) {
  const { lessonId } = await params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const url = `${BASE_URL}/api/likes/${lessonId}${userId ? `?userId=${userId}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      return Response.json({ liked: false, count: 0 }, { status: 200 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    // Backend unreachable — return safe defaults so UI still works
    return Response.json({ liked: false, count: 0 }, { status: 200 });
  }
}
