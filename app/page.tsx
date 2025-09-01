import { Hero } from "@/components/hero"
import { BookingSection } from "@/components/booking-section"
import { FeaturedLodges } from "@/components/featured-lodges"
import { Amenities } from "@/components/amenities"
import { Activities } from "@/components/activities"
import { Testimonials } from "@/components/testimonials"
import Footer from "@/components/footer"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"


export default function Home() {

  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper/> */}
      <Hero />
      <BookingSection />
      <FeaturedLodges />
      <Amenities />
      <Activities />
      <Testimonials />
      <Footer />
      <ChatbotButton />
    </main>
  )
}

