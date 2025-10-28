import { auth } from "@/auth";
import BookingWrapper from "@/components/booking/booking-wrapper";
import Footer from "@/components/footer";
import GuestInformationSkeleton from "@/components/ui/shimmers/info-shimmer";
import { Suspense } from "react";

export const metadata = {
  title: "Booking | Windermere Lodges",
  description:
    "Book your perfect stay at Windermere Lodges. Select your lodge, dates, and preferences for a seamless Lake District getaway.",

  openGraph: {
    title: "Booking | Windermere Lodges",
    description:
      "Reserve your luxury lodge at Windermere Lodges easily online. Enjoy the best Lake District retreats with comfort and style.",
    url: "https://windermerelodges.co.uk/booking",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-booking.jpg",
        width: 1200,
        height: 630,
        alt: "Booking at Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/booking",
  },
};

export default async function BookingPage() {
  const session = await auth();
  return (
    <>
      <Suspense fallback={<GuestInformationSkeleton />}>
        <BookingWrapper auth={session} />
      </Suspense>
      <Footer />
    </>
  );
}
