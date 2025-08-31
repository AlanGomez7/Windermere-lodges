"use server";

import { createUser } from "@/app/queries/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    await createUser({ name, email, password, role: "user" });
    return NextResponse.json({
      message: "user registered successfully",
      status: 201,
      ok: true,
    });
  } catch (e: any) {
    const message = getErrorMessage(e);
    console.log(message);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
