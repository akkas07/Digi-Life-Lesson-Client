const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(`${BASE_URL}/api/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { message: "Backend error", liked: false, count: 0 },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { message: "Backend unreachable", liked: false, count: 0 },
      { status: 503 }
    );
  }
}
