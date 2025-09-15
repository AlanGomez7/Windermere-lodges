"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { GalleryImage } from "./gallery-data";

export function ImageGallery({
  images,
}: {
  lodgeKey: string;
  images: any;
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const galleryCategories = [
    { id: "all", name: "All Photos" },
    { id: "interior", name: "Interior" },
    { id: "exterior", name: "Exterior" },
    { id: "surroundings", name: "Surroundings" },
  ];

  const galleryImages: GalleryImage[] = images || [];

  const filteredImages =
    category === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.tag === category);

  const featuredImages = galleryImages.filter((img) => img.featured);
  const visibleImages = filteredImages.slice(0, visibleCount);

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage(
      (selectedImage - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center mb-8">
        <Tabs defaultValue="all" onValueChange={setCategory}>
          <TabsList className="grid grid-cols-4">
            {galleryCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredImages.length === 0 && (
        <>
          {/* <!-- Plain HTML + Tailwind --> */}
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/60">
            {/* <!-- Icon --> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5v-9zM8 11l2 2 3-3 4 4"
              />
            </svg>

            {/* <!-- Title --> */}
            <h3 className="text-lg font-semibold text-gray-800">
              No images to show
            </h3>

            {/* <!-- Description --> */}
            <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
              There aren’t any images for this property yet.Try selecting another property.
            </p>

            {/* <!-- Action buttons --> */}
            {/* <div className="mt-4 flex gap-3">
    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button">Upload images</button>
    <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
            type="button">Try again</button>
  </div> */}
          </div>
        </>
      )}

      {category === "all" && (
        <div className="mb-12 bg-white">
          {/* <h3 className="text-2xl font-bold mb-6 text-center">Featured Images</h3> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {featuredImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.tag}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
                  <VisuallyHidden>
                    <DialogTitle>Image Viewer</DialogTitle>
                    <DialogDescription>
                      A dialog showing a larger version of the selected image.
                    </DialogDescription>
                  </VisuallyHidden>
                  <div className="relative">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.tag}
                      className="w-full max-h-[80vh] object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-[6/3] overflow-hidden">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.tag}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card>
          ))}
        </div>
        {/* Subtle gradient overlay at the bottom for 'hidden' look */}
        {/* <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent z-10 shadow-6xl" /> */}
      </div>
      {visibleCount < filteredImages.length && (
        <div className="flex justify-center mt-6">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setVisibleCount(visibleCount + 8)}
          >
            Load More
          </Button>
        </div>
      )}

      {selectedImage !== null && (
        <Dialog
          open={selectedImage !== null}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
            <VisuallyHidden>
              <DialogTitle>Image Viewer</DialogTitle>
              <DialogDescription>
                A dialog showing a larger version of the selected image with
                navigation controls.
              </DialogDescription>
            </VisuallyHidden>
            <div className="relative">
              <img
                src={filteredImages[selectedImage].url || "/placeholder.svg"}
                alt={filteredImages[selectedImage].tag}
                className="w-full max-h-[80vh] object-contain"
              />
              <button
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* <div className="text-center mt-8">
        <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
          Load More
        </Button>
      </div> */}
    </div>
  );
}
