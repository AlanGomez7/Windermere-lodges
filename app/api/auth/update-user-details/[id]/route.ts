"use server";

import { updateProfile } from "@/app/queries/auth";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error("id not valid");
    }

    const { userName, email, phone, address } = await request.json();

    const response = await updateProfile({ userName, address, phone, email, userId:id });

    console.log(response,"000000000000000000000000000000000000")
    return NextResponse.json({
      message: "Profile updated successfully",
      status: 201,
      ok: true,
    });

  } catch (e: any) {
    const message = getErrorMessage(e);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
