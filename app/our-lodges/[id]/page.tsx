import { lodges } from '@/data/lodges';
import { LodgeDetails } from '@/components/lodges/LodgeDetails';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { fetchPropertyDetails } from '@/lib/api';

export default async function LodgeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params;

  const lodge = await fetchPropertyDetails(id);


  // const lodge = lodges.find()
  // const lodge = lodges.find(l => l.id === 3);
  if (!lodge) return notFound();
  return <LodgeDetails lodge={lodge} session={session}/>;
}