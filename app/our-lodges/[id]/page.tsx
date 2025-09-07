// import { lodges } from '@/data/lodges';
import { data } from "@/data/lodges";
import { included } from "@/data/includes";
import { LodgeDetails } from "@/components/lodges/LodgeDetails";
import { notFound, useSearchParams } from "next/navigation";
import { auth } from "@/auth";
import { fetchPropertyDetails } from "@/lib/api";
import { hydrateResourceById } from "@/lib/utils";
import { useAppContext } from "@/app/context/context";

export default async function LodgeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: any;
}) {
  const session = await auth();
  const { id } = await params;
  const lodge = await fetchPropertyDetails(id);
  
  if (!lodge) return notFound();
  return <LodgeDetails lodge={lodge} session={session}/>;
}
