"use server";

import { createUser } from "@/app/queries/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
  const { name, email, password } = await request.json();

  const encryptedPassword = await bcrypt.hash(password, 12);

  console.log({ name, email, password:encryptedPassword })
    await createUser({ name, email, password:encryptedPassword, role: "user" });
    return NextResponse.json({
      message: "user registered successfully",
      status: 201,
      ok: true,
    });
  } catch (e: any) {
    const message = getErrorMessage(e);
    console.log(message)
    return NextResponse.json({ message, ok: false}, {status: 409});
  }
}
