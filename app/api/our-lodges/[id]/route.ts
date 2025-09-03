import { getLodgeDetails } from "@/app/queries/properties";
import { getErrorMessage } from "@/lib/utils";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { id } = await params;
  if (!id) {
    throw new Error("id not valid");
  }

  try {
    const response = await getLodgeDetails(id);
    // console.log(response, "uuuu")
    if (!response) {
      return notFound();
    }

    return NextResponse.json({ result: response, ok: true }, { status: 200 });
    
  } catch (err) {

    const message = getErrorMessage(err);
    return NextResponse.json({ message: message, ok: false }, { status: 200 });
  }
}
