import { getLodgeDetails } from "@/app/queries/properties";
import { getErrorMessage } from "@/lib/utils";
import { NextApiRequest } from "next";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import placeholder from "../../../../public/placeholder.svg";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Invalid lodge ID", ok: false },
      { status: 400 }
    );
  }

  try {
    const response = await getLodgeDetails(id);

    if (!response) {
      return notFound();
    }

    const featuredImages = response?.images ?? [];
    const galleryImages =
      response?.PropertyGalleryImage.map((img) => img.url) ?? [];

    const fullImages:string[] = [...featuredImages, ...galleryImages];

    response.images =
      fullImages?.length === 0 ? [placeholder.src] : fullImages;

    return NextResponse.json({ result: response, ok: true }, { status: 200 });
  } catch (err) {
    const message = getErrorMessage(err);
    return NextResponse.json({ message: message, ok: false }, { status: 500 });
  }
}
