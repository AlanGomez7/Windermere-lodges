import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AmenitiesDetails } from "@/components/amenities/amenities-details"
import { AmenitiesGallery } from "@/components/amenities/amenities-gallery"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from "@/components/navbar-wrapper"

export default function AmenitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Lodge Amenities"
        description="Luxury features for an unforgettable stay"
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
      />

      <AmenitiesDetails />
      <AmenitiesGallery />

      <Footer />
      <ChatbotButton />
    </main>
  )
}

