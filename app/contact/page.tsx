import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import contactBanner from "@/public/contact.jpg"
import { auth } from "@/auth"

export const metadata = {
  title: "Contact Us | Windermere Lodges",
  description:
    "Get in touch with Windermere Lodges for inquiries, bookings, or assistance. We're here to help you plan your perfect Lake District getaway.",
    
  openGraph: {
    title: "Contact Us | Windermere Lodges",
    description:
      "Reach out to Windermere Lodges to ask questions, request information, or manage your bookings. Luxury lodges and exceptional service await you.",
    url: "https://windermerelodges.co.uk/contact",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/contact",
  },
};



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
      {/* <ChatbotButton /> */}
    </main>
  )
}

