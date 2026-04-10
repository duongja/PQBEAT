import { NextResponse } from "next/server";
import { getBlogSubscribersCollection } from "@/lib/mongodb";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscriberSource = "pqbeat-blog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase() ?? "";

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const collection = await getBlogSubscribersCollection();
    const now = new Date();
    const result = await collection.updateOne(
      { email },
      {
        $set: {
          updatedAt: now,
          source: subscriberSource,
        },
        $setOnInsert: {
          createdAt: now,
          email,
        },
      },
      { upsert: true },
    );

    const alreadySubscribed = result.matchedCount > 0 && result.upsertedCount === 0;

    return NextResponse.json({
      message: alreadySubscribed
        ? "This email is already receiving PQBEAT’s weekly blog updates."
        : "Thanks. You’ll receive PQBEAT’s weekly blog updates at this address.",
    });
  } catch (error) {
    console.error("Failed to save blog update subscriber", error);

    return NextResponse.json({ message: "Could not save your email right now." }, { status: 500 });
  }
}
