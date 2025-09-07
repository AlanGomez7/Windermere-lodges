"use server";

import { updateProfile } from "@/app/queries/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = await params;
    console.log(id)

    if (!id) {
      throw new Error("id not valid");
    }

    const { userName, email, phone, address } = await request.json();

    const response = await updateProfile({ userName, address, phone, email, userId:id });

    return NextResponse.json({
      message: "Profile updated successfully",
      ok: true,
    },{status:201});

  } catch (e: any) {
    const message = getErrorMessage(e);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
