import { getProperties } from "@/app/queries/properties";
import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getProperties();
    return NextResponse.json({ lodges: response, ok: true }, { status: 200 });
  } catch (err) {
    const message = getErrorMessage(err);
    return NextResponse.json({ message, ok: false }, { status: 400 });
  }
}
