import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { X, Search } from "lucide-react";


export default function Gallery({
  images,
  lodgeName,
  lodgeId,
}: {
  lodgeId: string;
  images: string[];
  lodgeName: string;
}) {  
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = images.length;

  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);
  const handleThumbClick = (idx: number) => setCurrent(idx);
  const openModal = (idx: number) => {
    setCurrent(idx);
    setModalOpen(true);
  };

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
    <div className="flex flex-col gap-0">
      <div className="relative flex-1 min-w-0">
        <Image
          src={images[current] }
          alt={lodgeName}
          width={800}
          height={500}
          className="object-cover w-full h-[400px] rounded-md"
          onClick={() => openModal(current)}
        />

        {/* Previous / Next Arrows */}
        {total > 1 && (
          <>
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              {/* SVG */}
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
              onClick={handleNext}
              aria-label="Next image"
            >
              {/* SVG */}
            </button>
          </>
        )}

        {/* View Larger Button */}
        <button
          className="absolute left-3 bottom-3 bg-white opacity-65 text-gray-800 rounded shadow px-3 py-2 text-sm flex items-center gap-2 border border-gray-200 hover:bg-gray-100 z-10 hover:opacity-80"
          onClick={() => openModal(current)}
          aria-label="View larger image"
        >
          <Search size={16} />
        </button>

        {/* Show All Images */}
        <Link href={`/gallery?id=${lodgeId}`} passHref>
          <Button
            className="absolute right-3 bottom-3 bg-gray-100 hover:bg-gray-200 text-black rounded px-3 text-sm z-10 font-light"
            aria-label="Show all images in gallery"
          >
            Show all images
          </Button>
        </Link>

        {/* Modal / Lightbox */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl max-h-dvh p-0 bg-black/95 border-none flex flex-col items-center justify-center">
            <button
              className="text-white cursor-pointer mt-5 ml-5 mr-auto"
              onClick={() => setModalOpen(false)}
              aria-label="Close gallery"
            >
              <X />
            </button>

            <VisuallyHidden asChild>
              <DialogTitle>Gallery images for {lodgeName}</DialogTitle>
            </VisuallyHidden>

            <div
              className="relative w-full flex items-center justify-center"
              style={{ minHeight: 500 }}
            >
              {/* Left Arrow */}
              {total > 1 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-20"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  {/* SVG */}
                </button>
              )}
              <Image
                src={images[current]}
                alt={lodgeName + " zoomed"}
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
                  {/* SVG */}
                </button>
              )}
              <div className="absolute right-4 bottom-4 bg-black/80 text-white rounded px-3 py-1 text-sm z-20">
                {current + 1} / {total}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-nowrap gap-2 mt-4 max-w-full overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img + idx}
                  className={`relative rounded overflow-hidden border-2 flex-shrink-0 ${
                    idx === current
                      ? "border-emerald-600"
                      : "border-transparent"
                  }`}
                  onClick={() => handleThumbClick(idx)}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={lodgeName + " thumbnail"}
                    width={80}
                    height={60}
                    className={`object-cover w-20 h-14 ${
                      idx === current ? "" : "opacity-80"
                    }`}
                  />
                  {idx === current && (
                    <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>
                  )}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vertical Thumbnails */}
      <div className="flex gap-2 max-h-[400px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full  lg:w-[800px] pr-3 py-2">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            className={`relative shrink-0 rounded bg-gray-200 overflow-hidden border-2 w-[120px] h-[90px] ${
              idx === current ? "border-emerald-600" : "border-transparent"
            }`}
            onClick={() => handleThumbClick(idx)}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={lodgeName + " thumbnail"}
              width={120}
              height={90}
              loading="lazy"
              className={`object-cover w-full h-full ${
                idx === current ? "" : "opacity-80"
              }`}
              onError={(e) =>
                ((e.target as HTMLImageElement).src = "../../public/placeholder.svg")
              }
            />
            {idx === current && (
              <span className="absolute inset-0 ring-2 ring-emerald-600 rounded pointer-events-none"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
