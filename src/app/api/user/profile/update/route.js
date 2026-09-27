import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(request) {
  try {
    const body = await request.json();

    await auth.api.updateUser({
      headers: await headers(),
      body,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile update failed", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to update profile at this time.",
      },
      { status: 500 }
    );
  }
}
