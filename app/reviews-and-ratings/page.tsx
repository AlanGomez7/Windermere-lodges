import { PageHeader } from "@/components/page-header";
import ReviewCard from "@/components/cards/review-card";
import { auth } from "@/auth";
import { fetchReviews } from "@/lib/api";
import UserNotFound from "@/components/no-user-found";
import ReviewList from "@/components/ui/review-list";

export default async function YourReviews() {
  const session = await auth();
  let reviews: any[] = [];

  if (session?.user?.id) {
    reviews = await fetchReviews(session?.user?.id);
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Reviews & Ratings"
        description="Update or see your reviews and ratings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />

      {!session && <UserNotFound />}

      {session && <ReviewList reviews={reviews} />}
    </main>
  );
}
