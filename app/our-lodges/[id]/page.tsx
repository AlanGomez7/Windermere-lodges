import { LodgeDetails } from "@/components/lodges/LodgeDetails";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { fetchPropertyDetails } from "@/lib/api";
import Footer from "@/components/footer";
import { PropertyDetailsType } from "@/lib/types";

export async function generateMetadata({ params }:any) {
  const { id } = await params;

  // Try to fetch lodge data (safe for SEO, runs server-side)
  try {
    const lodge:PropertyDetailsType = await fetchPropertyDetails(id);

    if (!lodge) {
      return {
        title: "Lodge Not Found | Windermere Lodges",
        description:
          "This lodge is no longer available. Explore other luxury lodges at Windermere Lodges.",
      };
    }

    const title = `${lodge.name} | Windermere Lodges`;
    const description =
      lodge.description ||
      `Discover ${lodge.name} — a luxurious lakeside lodge at Windermere with modern comfort and breathtaking Lake District views.`;

    const imageUrl =
      lodge.images?.[0] ||
      "https://windermerelodges.co.uk/og-lodges.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://windermerelodges.co.uk/our-lodges/${id}`,
        siteName: "Windermere Lodges",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: lodge.name,
          },
        ],
        locale: "en_GB",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://windermerelodges.co.uk/our-lodges/${id}`,
      },
    };
  } catch (error) {
    return {
      title: "Lodge Details | Windermere Lodges",
      description:
        "Discover luxury lodges with hot tubs and lake views at Windermere Lodges.",
    };
  }
}

export default async function LodgeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;

  const lodge = await fetchPropertyDetails(id);

  if (!lodge) return notFound();

  return (
    <>
      <LodgeDetails lodge={lodge} session={session} />
      <Footer />
    </>
  );
}
