"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../navbar";
import Footer from "../footer";
import { PageHeader } from "../page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons";
import { type LucideIcon as Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import { galleryImagesByLodge } from "../gallery/gallery-data";

const amenityIconMap: Record<string, string> = {
  'Lake Access': '/icons/water.png',
  'Wifi': '/icons/wifi.png',
  'Shared Pool': '/icons/swim.png',
  'Washing Machine': '/icons/w_machine.png',
  'Hair Dryer': '/icons/dryer.png',
  'Kitchen': '/icons/cook.png',
  'TV': '/icons/tv.png',
};

const policyIconMap: Record<string, keyof typeof Icons> = {
  'Check-in & Check-out': 'calendarClock',
  'Cancellation Policy': 'ban',
  'Property Maintenance & Damage Policy': 'wrench',
};

const amenitiesToDisplay = [
  'Lake Access',
  'Wifi',
  'Shared Pool',
  'Washing Machine',
  'Hair Dryer',
  'Kitchen',
  'TV',
  '+11 More',
];

const ratingSummary = {
  average: 4.0,
  label: 'Very Good',
  total: 250,
  breakdown: [
    { stars: 5, label: 'Excellent', count: 100, color: 'bg-green-700' },
    { stars: 4, label: 'Very Good', count: 74, color: 'bg-green-600' },
    { stars: 3, label: 'Good', count: 53, color: 'bg-green-400' },
    { stars: 2, label: 'Average', count: 10, color: 'bg-orange-400' },
    { stars: 1, label: 'Poor', count: 13, color: 'bg-red-600' },
  ],
};
const maxCount = Math.max(...ratingSummary.breakdown.map(b => b.count));

function Gallery({ images, lodgeName }: { images: string[]; lodgeName: string }) {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = images.length;
  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);
  const handleThumbClick = (idx: number) => setCurrent(idx);
  const openModal = (idx: number) => { setCurrent(idx); setModalOpen(true); };

  // Keyboard navigation in modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen, current]);

  return (
    <div className="flex gap-0">
      {/* Main Image with overlays */}
      <div className="relative flex-1 min-w-0">
        <Image
          src={images[current]}
          alt={lodgeName}
          width={800}
          height={500}
          className="object-cover w-full h-[400px] rounded-none"
          onClick={() => openModal(current)}
        />
        {/* Left Arrow */}
        {total > 1 && (
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M15 18l-6-6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        {/* Right Arrow */}
        {total > 1 && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path d="M9 6l6 6-6 6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        {/* View Larger Image Button */}
        <button className="absolute left-3 bottom-3 bg-white opacity-65 text-gray-800 rounded shadow px-3 py-2 text-sm flex items-center gap-2 border border-gray-200 hover:bg-gray-100 z-10 hover:opacity-80" onClick={() => openModal(current)}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
          
        </button>
        {/* Image Count */}
        <div className="absolute right-3 bottom-3 bg-black/80 text-white rounded px-3 py-1 text-sm z-10 font-semibold">
          {current + 1} / {total}
        </div>
        {/* Modal/Lightbox */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none flex flex-col items-center justify-center">
            <VisuallyHidden asChild>
              <DialogTitle>Gallery images for {lodgeName}</DialogTitle>
            </VisuallyHidden>
            {/* Add DialogTitle for accessibility, hidden visually */}
            <h2 id="gallery-dialog-title" className="sr-only">Gallery images for {lodgeName}</h2>
            <div className="relative w-full flex items-center justify-center" style={{ minHeight: 500 }}>
              {/* Left Arrow */}
              {total > 1 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
              )}
              {/* Main Zoomed Image */}
              <Image
                src={images[current]}
                alt={lodgeName + 'zoomed'}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto mx-auto rounded"
                draggable={false}
              />
              {/* Right Arrow */}
              {total > 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
                </button>
              )}
              {/* Image Count */}
              <div className="absolute right-4 bottom-4 bg-black/80 text-white rounded px-3 py-1 text-sm z-20">
                {current + 1} / {total}
              </div>
            </div>
            {/* Thumbnails in Modal */}
            <div className="flex gap-2 mt-4 max-w-full overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  className={`relative rounded overflow-hidden border-2 ${idx === current ? 'border-emerald-600' : 'border-transparent'}`}
                  onClick={() => handleThumbClick(idx)}
                  tabIndex={0}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={lodgeName + ' thumbnail'}
                    width={80}
                    height={60}
                    className={`object-cover w-20 h-14 ${idx === current ? '' : 'opacity-80'}`}
                  />
                  {idx === current && <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 mx-2" />
      {/* Thumbnails: single vertical column */}
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-40 pr-3 py-2">
        {(images.length > 0 ? images : ["/placeholder.jpg"]).map((img, idx) => (
          <button
            key={img + idx}
            className={`relative rounded overflow-hidden border-2 w-full min-h-[100px] aspect-[4/3] ${idx === current ? 'border-emerald-600' : 'border-transparent'}`}
            onClick={() => handleThumbClick(idx)}
            tabIndex={0}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={lodgeName + ' thumbnail'}
              width={120}
              height={90}
              className={`object-cover w-full h-full ${idx === current ? '' : 'opacity-80'}`}
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.jpg'; }}
            />
            {idx === current && <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export function LodgeDetails({ lodge }: { lodge: any }) {
  const router = useRouter();
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    new Date("2025-10-07T00:00:00")
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date("2025-10-12T00:00:00")
  );

  // Map lodge name or id to gallery-data key
  const lodgeKey =
    lodge.name === "Glenridding Lodge"
      ? "lodge1"
      : lodge.name === "Water's Reach"
      ? "lodge2"
      : lodge.name === "Serenity"
      ? "lodge3"
      : null;

  const galleryImages =
    (lodgeKey && galleryImagesByLodge[lodgeKey]?.map(img => img.src)) ||
    [lodge.image, "/placeholder.jpg", "/placeholder-user.jpg", "/activities/4.png"];

  return (
    <>
      <Navbar />
      <PageHeader
        title={lodge.headerTitle}
        description={lodge.headerDescription}
        backgroundImage={lodge.headerImage}
      />
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-18">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-white" onClick={() => router.push('/our-lodges')}>
              <Icons.chevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-gray-800">
                {lodge.name}
              </h1>
              <p className="text-sm text-gray-600">{lodge.address}</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex-shrink-0">
            <div className="flex items-center gap-2 rounded-lg bg-green-100 p-2 text-green-800">
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg">{lodge.rating}</span>
                <span className="text-lg">★</span>
              </div>
              <div className="text-xs">
                <p className="font-semibold">Very Good</p>
                <p>{lodge.ratingCount} rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Gallery images={galleryImages} lodgeName={lodge.name} />
          </div>
          <div className="w-full md:w-96">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold">${lodge.price}.00</span>
                  <span className="text-sm text-gray-500">/per night</span>
                  <span className="line-through text-gray-400 ml-auto">${lodge.oldPrice}</span>
                  <Badge variant="destructive" className="bg-green-600 text-white">60% off</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Check-In</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                          )}
                        >
                          {checkInDate ? format(checkInDate, "LLL dd, yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Check-Out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground"
                          )}
                        >
                          {checkOutDate ? format(checkOutDate, "LLL dd, yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-sm text-gray-500">Guest</label>
                  <Select defaultValue="2-adults-1-children">
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-adult">1 Adult</SelectItem>
                      <SelectItem value="2-adults">2 Adults</SelectItem>
                      <SelectItem value="2-adults-1-children">2 Adults, 1 Children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* DISCOUNT AND OFFER CODE TO BE APPLIED ON CLIENT's CONFIRMATION */}
                {/* <div className="flex flex-col gap-1 mb-4">
                  <label className="text-sm text-gray-500">Discount Code</label>
                  <Select defaultValue="first20">
                    <SelectTrigger>
                      <SelectValue placeholder="Select code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first20">First20</SelectItem>
                      <SelectItem value="summer24">Summer24</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}


                <div className="border-t my-4" />

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>5 Night</span>
                    <span>$745</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span className="text-green-600">-${lodge.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service fee</span>
                    <span>$5</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total Payment</span>
                    <span>${lodge.price * 5 - lodge.price + 5}</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-base">Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* All sections always visible except FAQ */}
        <div className="mt-8">
          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {amenitiesToDisplay.map((amenity: string, i: number) => {
                const iconKey = Object.keys(amenityIconMap).find(key => amenity.toLowerCase().includes(key.toLowerCase()));
                const iconSrc = iconKey ? amenityIconMap[iconKey] : null;

                if (amenity.startsWith('+')) {
                  return (
                    <div key={i} className="flex items-center space-x-2 flex-shrink-0">
                       <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                         <span className="text-sm font-semibold">{amenity.split(' ')[0]}</span>
                       </div>
                       <span className="text-gray-700">{amenity.split(' ').slice(1).join(' ')}</span>
                    </div>
                  )
                }
                
                return (
                  <div key={i} className="flex items-center space-x-2 flex-shrink-0">
                    {iconSrc && (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Image src={iconSrc} alt={amenity} width={24} height={24} />
                      </div>
                    )}
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* About */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About {lodge.name}</h2>
            <p className="text-gray-700">{lodge.about}</p>
          </div>
          {/* Location */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <iframe src={lodge.locationMap} width="100%" height="350" className="rounded-xl border" loading="lazy"></iframe>
          </div>
          {/* Rating & Review */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Rating & Reviews</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Summary Card */}
              <div className="flex items-center min-w-[220px]">
                <span className="bg-[#059669] text-white font-bold rounded-sm px-5 py-2 text-lg flex items-center gap-2">
                  {ratingSummary.average.toFixed(1)}
                  <Star className="inline-block w-3 h-4 fill-white text-white ml-1" />
                </span>
                <div className="flex flex-col justify-center ml-4">
                  <span className="font-bold text-gray-800 text-md leading-tight">{ratingSummary.label}</span>
                  <span className="text-sm text-green-700 leading-tight">{ratingSummary.total} ratings</span>
                </div>
              </div>
              {/* Breakdown Bars */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                {ratingSummary.breakdown.map((b) => (
                  <div key={b.stars} className="flex flex-col items-center w-full">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold text-gray-700">{b.stars}</span>
                      <span className="text-gray-500">★</span>
                      <span className="text-xs text-gray-500">({b.label})</span>
                      <span className="ml-2 font-bold text-gray-700">{b.count}</span>
                    </div>
                    <div className="w-full h-2 rounded bg-gray-200 flex items-center">
                      <div className={`${b.color} h-2 rounded`} style={{ width: `${(b.count / maxCount) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Rules and Policies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Rules & Policies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lodge.policies.map((policy: any, i: number) => {
                const IconComponent = Icons[policyIconMap[policy.label]] as Icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    {IconComponent && <IconComponent className="h-8 w-8 text-emerald-600 mt-1" />}
                    <div>
                      <h3 className="font-bold text-sm">{policy.label}</h3>
                      <p className="text-gray-800 font-light">{policy.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* FAQ (accordion) */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div>
              {lodge.faqs.map((faq: any, i: number) => (
                <div key={i} className="mb-2 border-b">
                  <button
                    className="w-full text-left font-semibold py-3 flex justify-between items-center focus:outline-none"
                    onClick={() => setShowFAQ(i === showFAQ ? null : i)}
                  >
                    {faq.q}
                    <span className={`ml-2 transition-transform ${showFAQ === i ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  {showFAQ === i && (
                    <div className="text-gray-700 pb-3 pl-2">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 