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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { jsPDF } from "jspdf";

export function ImageGallery({ images }: { lodgeKey: string; images: any }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(8);

  const galleryCategories = [
    { id: "all", name: "All" },
    { id: "interior", name: "Interior" },
    { id: "exterior", name: "Exterior" },
    { id: "surroundings", name: "Surroundings" },
    { id: "Bedrooms", name: "Bedrooms" },
    { id: "Bathrooms", name: "Bathrooms" },
  ];

  const galleryImages = images || [];

  const filteredImages =
    category === "all"
      ? galleryImages
      : galleryImages.filter((img: any) => img.tag === category);

  const featuredImages = galleryImages.filter((img: any) => img.featured);
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

  const downloadImageAsPDF = async (url: string, tag?: string) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? "landscape" : "portrait",
          unit: "px",
          format: [img.width, img.height],
        });

        pdf.addImage(img, "PNG", 0, 0, img.width, img.height);

        const filename =
          (tag || url.split("/").pop()?.split(".")[0] || "image") + ".pdf";
        pdf.save(filename);
      };
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div className="bg-white">
      {/* Category Tabs */}
      <div className="flex justify-center flex-nowrap whitespace-nowrap mb-8 overflow-x-auto scrollbar-hide">
        <Tabs defaultValue="all" onValueChange={setCategory}>
          <TabsList
            className="flex flex-nowrap space-x-2 px-2"
            aria-label="Image categories"
          >
            {galleryCategories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                id={`tab-${cat.id}`}
                aria-controls={`tabpanel-${cat.id}`}
                aria-selected={category === cat.id}
                aria-label={`Show ${cat.name} images`}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryCategories.map((cat) => (
            <TabsContent
              key={cat.id}
              value={cat.id}
              id={`tabpanel-${cat.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${cat.id}`}
            ></TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/60">
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
          <h3 className="text-lg font-semibold text-gray-800">
            No images to show
          </h3>
          <p className="text-sm text-gray-500 mt-2 text-center max-w-xs">
            There aren’t any images for this property yet. Try selecting another
            category.
          </p>
        </div>
      )}

      {/* Featured Images */}
      {category === "all" && featuredImages.length > 0 && (
        <div className="mb-12 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {featuredImages.map((image: any, index: number) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    aria-label={`Open featured image ${image.tag || index + 1}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.tag || "Featured lodge image"}
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
                      alt={image.tag || "Lodge image"}
                      className="w-full max-h-[80vh] object-contain"
                    />
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                      aria-label="Close image viewer"
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

      {/* Gallery Grid */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {visibleImages.map((image: any, index: number) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedImage(index)}
              aria-label={`Open image ${image.tag || index + 1}`}
            >
              <div className="relative aspect-[6/3] overflow-hidden">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.tag || "Lodge image"}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {visibleCount < filteredImages.length && (
        <div className="flex justify-center mt-6">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setVisibleCount(visibleCount + 8)}
            aria-label="Load more images"
          >
            Load More
          </Button>
        </div>
      )}

      {/* Image Viewer Modal */}
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
                alt={filteredImages[selectedImage].tag || "Lodge image"}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Close */}
              <button
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                aria-label="Close image viewer"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </button>

              {/* Download */}
              <button
                onClick={() =>
                  downloadImageAsPDF(
                    filteredImages[selectedImage].url,
                    filteredImages[selectedImage].tag
                  )
                }
                className="absolute top-2 right-12 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                aria-label={`Download ${filteredImages[selectedImage]?.tag || "image"}`}
              >
                <Download />
              </button>

              {/* Previous */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next */}
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                aria-label="Next image"
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
    </div>
  );
}
