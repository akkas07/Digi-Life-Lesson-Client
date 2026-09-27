import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;

if (!MONGODB_URI || !MONGODB_DB_NAME) {
  throw new Error(
    "Missing MongoDB environment variables: MONGODB_URI and MONGODB_DB_NAME"
  );
}

async function getReportsCollection() {
  if (!globalThis.mongoClient) {
    globalThis.mongoClient = new MongoClient(MONGODB_URI);
    await globalThis.mongoClient.connect();
    globalThis.mongoDb = globalThis.mongoClient.db(MONGODB_DB_NAME);
  }

  return globalThis.mongoDb.collection("reports");
}

export async function GET() {
  try {
    const collection = await getReportsCollection();
    const reports = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error("GET /api/reports failed", error);
    return NextResponse.json(
      { success: false, message: "Unable to fetch reports." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId, userEmail, lessonId, reason, details } = await request.json();

    if (!userId || !lessonId || !reason) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields. userId, lessonId, and reason are mandatory.",
        },
        { status: 400 }
      );
    }

    const collection = await getReportsCollection();
    const newReport = {
      userId,
      userEmail: userEmail || "Anonymous",
      lessonId,
      reason,
      details: details || "No additional details provided.",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newReport);

    return NextResponse.json(
      {
        success: true,
        message: "Report submitted successfully. Admin will review it shortly.",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/reports failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while processing the report.",
      },
      { status: 500 }
    );
  }
}
