import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import contactBanner from "@/public/contact.jpg"
import { auth } from "@/auth"

export default async function ContactPage() {
  const session = await auth();
  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Contact Us"
        description="We're here to help plan your perfect getaway"
        backgroundImage={contactBanner}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm email={session?.user?.email || ""} name={session?.user?.name || ""}/>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

