import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { GalleryTabs } from "@/components/gallery/gallery-tabs";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { fetchProperties } from "@/lib/api";

export const metadata = {
  title: "Gallery | Windermere Lodges",
  description:
    "Browse our photo gallery to explore the luxury lodges, beautiful interiors, and stunning Lake District views at Windermere Lodges.",
    
  openGraph: {
    title: "Gallery | Windermere Lodges",
    description:
      "Discover our collection of images showcasing Windermere Lodges — perfect retreats in the heart of the Lake District.",
    url: "https://windermerelodges.co.uk/gallery",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-gallery.jpg",
        width: 1200,
        height: 630,
        alt: "Gallery of Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/gallery",
  },
};




export default async function GalleryPage() {
  const properties = await fetchProperties();

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Our Gallery"
        description="Experience the beauty of Windermere Lodges"
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<Loading />}>
            <GalleryTabs lodgeIds={properties} />
          </Suspense>
        </div>
      </section>

      <Footer />
      {/* <ChatbotButton /> */}
    </main>
  );
}
