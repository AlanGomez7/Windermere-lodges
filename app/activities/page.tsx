import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ActivitiesList } from "@/components/activities/activities-list"
import { ActivitiesMap } from "@/components/activities/activities-map"
import { SeasonalActivities } from "@/components/activities/seasonal-activities"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from "@/components/navbar-wrapper"

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Lake District Activities"
        description="Explore the endless adventures awaiting you"
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <ActivitiesList />
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore Activities By Location</h2>
            <ActivitiesMap />
          </div>
          <div className="mt-16">
            <SeasonalActivities />
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

