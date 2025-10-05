// import { lodges } from '@/data/lodges';
import { LodgeDetails } from "@/components/lodges/LodgeDetails";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { fetchPropertyDetails } from "@/lib/api";
import Footer from "@/components/footer";

export default async function LodgeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const lodge = await fetchPropertyDetails(id);

  if (!lodge) return notFound();
  return (
    <>
      <LodgeDetails lodge={lodge} session={session} />
      <Footer/>
    </>
  );
}
