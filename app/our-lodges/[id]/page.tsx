// import { lodges } from '@/data/lodges';
import { LodgeDetails } from "@/components/lodges/LodgeDetails";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { fetchPropertyDetails } from "@/lib/api";


export default async function LodgeDetailsPage({
  params,
}: {
  params:  { id: string }
  searchParams: any;
}) {
  const session = await auth();
  const { id } = params;
  const lodge = await fetchPropertyDetails(id);
  
  if (!lodge) return notFound();
  return <LodgeDetails lodge={lodge} session={session}/>
}
