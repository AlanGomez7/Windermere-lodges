import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/navbar-wrapper";
import { AppWrapper } from "./context/context";
import { SessionProvider } from "next-auth/react";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";


export const metadata = {
  title: "Windermere Lodges | Luxury Lake District Escapes",
  description:
    "Escape to Windermere Lodges — luxury self-catering lodges with hot tubs, nestled in the heart of the Lake District. Perfect for couples, families, and peaceful getaways.",

  keywords: [
    "Windermere Lodges",
    "Lake District Lodges",
    "Luxury Lodges with Hot Tubs",
    "Holiday Lodges in Windermere",
    "Lake District Getaways",
    "Cottages in Windermere",
    "Lodges for Couples Lake District"
  ],
  icons: '/favicon.png',

  metadataBase: new URL("https://windermerelodges.co.uk"),

  openGraph: {
    title: "Windermere Lodges | Luxury Lake District Escapes",
    description:
      "Experience lakeside luxury at Windermere Lodges — hot tubs, scenic views, and peaceful stays in the Lake District.",
    url: "https://windermerelodges.co.uk",
    siteName: "Windermere Lodges",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury lodges at Windermere overlooking the lake",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Windermere Lodges | Luxury Lake District Escapes",
    description:
      "Luxury lakeside lodges with hot tubs and panoramic views in the Lake District. Book your perfect retreat at Windermere Lodges.",
    images: ["https://windermerelodges.co.uk/og-image.jpg"],
  },

  alternates: {
    canonical: "https://windermerelodges.co.uk",
  },
};




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-white">
          <NavbarWrapper />
          <SessionProvider>
            <AppWrapper>{children}</AppWrapper>
          </SessionProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{ style: { maxWidth: "500px" } }}
          />
        </main>
        <ChatbotButton />
      </body>
    </html>
  );
}
