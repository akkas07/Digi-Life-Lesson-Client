const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

async function parseResponse(response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { message: text || "Unknown response" };
  }
}

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/api/most-saved-lessons`, {
      cache: "no-store",
    });

    const data = await parseResponse(response);
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error("Most saved lessons proxy GET error:", error);
    return Response.json(
      { success: false, message: "Backend unreachable", data: [] },
      { status: 503 }
    );
  }
}
