import { PageHeader } from "@/components/page-header";

export default function YourReviews() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Reviews & Ratings"
        description="Update or see your reviews and ratings"
        backgroundImage="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1920&auto=format&fit=crop"
      />
      <div className="p-4 lg:p-6 space-y-6 bg-gray-50 min-h-full"></div>
    </main>
  );
}
