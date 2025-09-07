"use server";

import {
  credentialCheck,
  updatePassword,
  updateProfile,
} from "@/app/queries/auth";

import { getErrorMessage } from "@/lib/getErrorMessage";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: any) {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error("id not valid");
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json();

    if (newPassword !== confirmPassword)
      throw new Error("Passwords are not the same");

    const user = await credentialCheck({
      email: id,
      password: currentPassword,
    });


    if (!user) {
      throw new Error("User not found");
    }

    await updatePassword({ email: id, newPassword });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        ok: true,
      },
      { status: 201 }
    );
  } catch (e: any) {
    const message = getErrorMessage(e);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
