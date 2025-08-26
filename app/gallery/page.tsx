import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { GalleryTabs } from "@/components/gallery/gallery-tabs"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from "@/components/navbar-wrapper"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Our Gallery"
        description="Experience the beauty of Windermere Lodges"
        backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <GalleryTabs />
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

