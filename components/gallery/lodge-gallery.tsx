import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

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
    <div className="flex flex-col gap-0">
      {/* Main Image with overlays */}
      <div className="relative flex-1 min-w-0">
        <Image
          src={images[current]}
          alt={lodgeName}
          width={800}
          height={500}
          className="object-cover w-full h-[400px] rounded-md"
          onClick={() => openModal(current)}
        />
        {/* Left Arrow */}
        {total > 1 && (
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m15 19-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {/* Right Arrow */}
        {total > 1 && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 shadow-lg text-white rounded-full p-3 z-10"
            onClick={handleNext}
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </button>
        )}
        {/* View Larger Image Button */}
        <button
          className="absolute left-3 bottom-3 bg-white opacity-65 text-gray-800 rounded shadow px-3 py-2 text-sm flex items-center gap-2 border border-gray-200 hover:bg-gray-100 z-10 hover:opacity-80"
          onClick={() => openModal(current)}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        {/* Image Count */}
        <Link href={`/gallery?id=${lodgeId}`}>
          <Button className="absolute  right-3 bottom-3 bg-gray-100 hover:bg-gray-200 text-black rounded px-3 text-sm z-10 font-light">
            Show all images
          </Button>
        </Link>
        {/* Modal/Lightbox */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none flex flex-col items-center justify-center">
            <VisuallyHidden asChild>
              <DialogTitle>Gallery images for {lodgeName}</DialogTitle>
            </VisuallyHidden>
            {/* Add DialogTitle for accessibility, hidden visually */}
            <h2 id="gallery-dialog-title" className="sr-only">
              Gallery images for {lodgeName}
            </h2>
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
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {/* Main Zoomed Image */}
              <Image
                src={images[current]}
                alt={lodgeName + "zoomed"}
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
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
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
                  className={`relative rounded overflow-hidden border-2 ${
                    idx === current
                      ? "border-emerald-600"
                      : "border-transparent"
                  }`}
                  onClick={() => handleThumbClick(idx)}
                  tabIndex={0}
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
      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 mx-2" />
      {/* Thumbnails: single vertical column */}
      <div className="flex gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-full pr-3 py-2">
        {(images.length > 0 ? images : ["/placeholder.jpg"]).map((img, idx) => (
          <button
            key={img + idx}
            className={`relative rounded overflow-hidden border-2 w-full min-h-[100px] aspect-[4/3] ${
              idx === current ? "border-emerald-600" : "border-transparent"
            }`}
            onClick={() => handleThumbClick(idx)}
            tabIndex={0}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={lodgeName + " thumbnail"}
              width={120}
              height={90}
              className={`object-cover w-full h-full ${
                idx === current ? "" : "opacity-80"
              }`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.jpg";
              }}
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