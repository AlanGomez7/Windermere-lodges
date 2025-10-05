import { createEnquiryData } from "@/app/queries/feedback";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, subscribe, message, subject } =
      await request.json();

      console.log({ name, phone, email, subscribe, message, subject }, "kKKKK")

    if (!name || !phone || !email || !message || !subject) {
      throw new Error("invalid inputs");
    }

    const response = await createEnquiryData({
      name,
      phone,
      email,
      subscribe,
      message,
      subject,
    });

    return NextResponse.json({
      message: "Your message has been received",
      ok: true,
    }, {status: 200});

  } catch (e: any) {
    console.log(e)
    const message = getErrorMessage(e);
    return NextResponse.json({ message, ok: false }, { status: 409 });
  }
}
