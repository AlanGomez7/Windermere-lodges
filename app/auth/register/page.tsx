"use client"
import Link from "next/link"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { SocialLogin } from "@/components/auth/social-login"
import { ChatbotButton } from "@/components/chatbot/chatbot-button"
import { RegisterForm } from "@/components/auth/register-form"


export default function RegisterPage() {

  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Register"
        description="Hey! welcome to windermere lodges"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

            <RegisterForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm mb-6">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <SocialLogin />
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotButton />
    </main>
  )
}

