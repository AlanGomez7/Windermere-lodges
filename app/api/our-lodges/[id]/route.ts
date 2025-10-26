import { getLodgeDetails } from "@/app/queries/properties";
import { getErrorMessage } from "@/lib/utils";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "Invalid lodge ID", ok: false }, { status: 400 });
  }


  try {
    const response = await getLodgeDetails(id);
    
    if (!response) {
      return notFound();
    }

    return NextResponse.json({ result: response, ok: true }, { status: 200 });
    
  } catch (err) {

    const message = getErrorMessage(err);
    return NextResponse.json({ message: message, ok: false }, { status: 500 });
  }
}
