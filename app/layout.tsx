import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/navbar-wrapper";
import { AppWrapper } from "./context/context";
import { SessionProvider } from "next-auth/react";
import { ChatbotButton } from "@/components/chatbot/chatbot-button";


export const metadata: Metadata = {
  title: "Windermere Lodges",
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
