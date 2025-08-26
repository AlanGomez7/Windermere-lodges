import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import NavbarWrapper from "@/components/navbar-wrapper"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Contact Us"
        description="We're here to help plan your perfect getaway"
        backgroundImage="https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

