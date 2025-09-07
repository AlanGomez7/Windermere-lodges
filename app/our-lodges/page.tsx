import Footer from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { LodgeList } from "@/components/lodges/lodge-list";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";
import { fetchProperties } from "@/lib/api";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function OurLodgesPage() {
  const lodges = fetchProperties();
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
            <Suspense fallback={<Loading/>}>
              <LodgeList properties={lodges}/>
            </Suspense>
          </div>
        </div>
      </section>
      <Footer />
      <ChatbotButton />
    </main>
  );
}
