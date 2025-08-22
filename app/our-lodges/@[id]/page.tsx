import { lodges } from '@/data/lodges';
import { LodgeDetails } from '@/components/lodges/LodgeDetails';
import { notFound } from 'next/navigation';

export default async function LodgeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lodge = lodges.find(l => l.id === id);
  if (!lodge) return notFound();
  return <LodgeDetails lodge={lodge} />;
}