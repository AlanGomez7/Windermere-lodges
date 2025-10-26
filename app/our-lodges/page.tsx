import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { LodgeList } from "@/components/lodges/lodge-list";
import { fetchProperties } from "@/lib/api";
import { Suspense } from "react";
import Loading from "@/components/loading";

export const metadata = {
  title: "Our Lodges | Windermere Lodges",
  description:
    "Explore our collection of luxury lodges at Windermere Lodges — your perfect Lake District retreat surrounded by nature and comfort.",
  openGraph: {
    title: "Our Lodges | Windermere Lodges",
    description:
      "Discover our range of beautiful, handpicked lodges at Windermere Lodges — ideal for peaceful getaways in the heart of the Lake District.",
    url: "https://windermerelodges.co.uk/our-lodges",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-our-lodges.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury lodges at Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/our-lodges",
  },
};


export default async function OurLodgesPage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const ids: string[] | boolean = (await searchParams).ids?.split(",") ?? [];
  let lodges: Promise<any>;

  lodges = fetchProperties();


  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Our Lodges"
        description="Discover your perfect Lake District retreat"
        backgroundImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-row">
            <Suspense fallback={<Loading />}>
              <LodgeList
                properties={lodges}
                available={ids}
                showBadge={ids.length === 0 ? false : true}
              />
            </Suspense>
          </div>
        </div>
      </section>
      <Footer />
      {/* <ChatbotButton /> */}
    </main>
  );
}
