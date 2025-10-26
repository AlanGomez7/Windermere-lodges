import { auth } from "@/auth";
import { PageHeader } from "@/components/page-header";
import { getUserBookings } from "../queries/order";
import EmptyList from "@/components/empty-ui";
import UserNotFound from "@/components/no-user-found";
import BookingCard from "@/components/cards/bookings-card";

export const metadata = {
  title: "My Bookings | Windermere Lodges",
  description:
    "View and manage all your bookings at Windermere Lodges. Keep track of your stays, dates, and lodge preferences in one convenient place.",
    
  openGraph: {
    title: "My Bookings | Windermere Lodges",
    description:
      "Access your booking history and upcoming stays at Windermere Lodges. Plan and manage your perfect Lake District getaway easily.",
    url: "https://windermerelodges.co.uk/my-bookings",
    images: [
      {
        url: "https://windermerelodges.co.uk/og-image-my-bookings.jpg",
        width: 1200,
        height: 630,
        alt: "My Bookings at Windermere Lodges",
      },
    ],
  },
  alternates: {
    canonical: "https://windermerelodges.co.uk/my-bookings",
  },
};


export default async function MyBookings() {
  const session = await auth();
  const bookings = await getUserBookings(session && session.user?.id);

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="My Bookings"
        description="Manage your profile and personal settings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />

      {!session?.user?.id && (<UserNotFound/>)}
      {bookings?.length === 0 ? (
        <EmptyList type="Bookings"/>
      ) : (
        <section className="py-20 bg-white px-6">
          <div className="flex flex-col items-center gap-8">
            {bookings &&
              bookings.map((r, i: number) => (
                <BookingCard booking={r} key={i} />
              ))}
          </div>
        </section>
      )}
    </main>
  );
}

/**
 

 */
