import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
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
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{ style: { maxWidth: "500px" } }}
        />
      </body>
    </html>
  );
}
