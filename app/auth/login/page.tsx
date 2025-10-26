import Link from "next/link"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { LoginForm } from "@/components/auth/login-form"
import { SocialLogin } from "@/components/auth/social-login"

export const metadata = {
  title: "Login | Windermere Lodges",
  description:
    "Access your Windermere Lodges account to manage bookings, preferences, and personal details securely.",
    
  openGraph: {
    title: "Login | Windermere Lodges",
    description:
      "Log in to your Windermere Lodges account to view and manage your bookings and preferences for a seamless Lake District experience.",
    url: "https://windermerelodges.co.uk/login",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-login.jpg",
        width: 1200,
        height: 630,
        alt: "Login to Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/login",
  },
};


export default function LoginPage() {

  return (
    <main className="min-h-screen bg-white">
      {/* <NavbarWrapper /> */}
      <PageHeader
        title="Login"
        description="Access your account to manage bookings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

            <LoginForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <SocialLogin />
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {/* <ChatbotButton /> */}
    </main>
  )
}

