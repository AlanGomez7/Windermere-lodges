import { lodges } from '@/data/lodges';
import { LodgeDetails } from '@/components/lodges/LodgeDetails';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';

export default async function LodgeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lodge = lodges.find(l => l.id === id);
  const session = await auth()
  if (!lodge) return notFound();
  return <LodgeDetails lodge={lodge} session={session}/>;
}