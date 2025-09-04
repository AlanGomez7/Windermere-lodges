import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "@/components/navbar-wrapper";
import { AppWrapper } from "./context/context";

export const metadata: Metadata = {
  title: "Windermere Lodges",
  description: "Created by coffee_coders",
  generator: "Ketan Kumar Shrivastava",
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
          <AppWrapper>{children}</AppWrapper>
          <Toaster
            position="bottom-center"
            toastOptions={{ style: { maxWidth: "500px" } }}
          />
        </main>
      </body>
    </html>
  );
}
