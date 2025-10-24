"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Image {
  url: string;
  tag?: string;
}

interface ImageViewerProps {
  images: Image[];
  selectedIndex: number;
  onClose: () => void;
}

export default function ImageViewer({
  images,
  selectedIndex,
  onClose,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [lens, setLens] = useState({ x: 0, y: 0, visible: false });

  const nextImage = () =>
    setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLens({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setLens({ ...lens, visible: false });
  };

  if (!images[currentIndex]) return null;

  const imageUrl = images[currentIndex].url;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
        <VisuallyHidden>
          <DialogTitle>Image Viewer</DialogTitle>
          <DialogDescription>
            A dialog showing a larger version of the selected image with navigation controls.
          </DialogDescription>
        </VisuallyHidden>

        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Image */}
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={images[currentIndex].tag || "Image"}
            className="w-full max-h-[80vh] object-contain"
          />

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Magnifier Lens */}
          {lens.visible && (
            <div
              className="absolute w-40 h-40 rounded-full border-2 border-gray-300 overflow-hidden pointer-events-none"
              style={{
                top: lens.y - 80,
                left: lens.x - 80,
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "200% 200%", // 2x zoom
                backgroundPosition: `-${lens.x * 2 - 80}px -${lens.y * 2 - 80}px`,
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
