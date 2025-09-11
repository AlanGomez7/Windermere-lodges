import { auth } from "@/auth";
import { PageHeader } from "@/components/page-header";
import { getUserBookings } from "../queries/order";
import EmptyList from "@/components/empty-ui";
import UserNotFound from "@/components/no-user-found";
import BookingCard from "@/components/cards/bookings-card";

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
        <EmptyList />
      ) : (
        <section className="py-20 bg-white px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
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
