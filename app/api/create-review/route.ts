import { createReview } from "@/app/queries/feedback";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, rating, review, lodgeId } = await req.json();
    await createReview({ userId, rating, review, lodgeId });
    
    return NextResponse.json(
      { message: "Review added succefuly" },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json({ message: "received" }, { status: 400 });
  }
}
