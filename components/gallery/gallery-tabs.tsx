"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGallery } from "./image-gallery";
import { useSearchParams } from "next/navigation";
import { fetchLodgeImages } from "@/lib/api";
import { ImageShimmer } from "./image-shimmer";

export function GalleryTabs({ lodgeIds }: { lodgeIds: any }) {
  const searchParams = useSearchParams();
  const lodgeId = searchParams.get("id");

  const [loading, setLoading] = useState(false);

  async function loadImages(id: string) {
    try {
      setLoading(true);
      const data = await fetchLodgeImages(id);

      if (data) {
        setImages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const [activeTab, setActiveTab] = useState(lodgeId ?? lodgeIds[0].id);
  
  const [images, setImages] = useState<
    {
      id: string;
      propertyId: string;
      url: string;
      tag: string;
      uploadedAt: Date;
    }[]
  >([]);

  useEffect(() => {
    loadImages(activeTab);
  }, [activeTab]);

  return (
    <Tabs
      defaultValue={activeTab ?? lodgeIds[0]?.id}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="mb-6 sm:mb-8">
        <div className="w-full overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none]">
          <TabsList className="flex w-max gap-2 sm:w-auto sm:grid sm:grid-cols-3 sm:gap-0 sm:mx-auto" >
            {lodgeIds.map((l: any) => (
              <TabsTrigger value={l.id} key={l.id} className="shrink-0" aria-label={`images for ${l?.nickname}`}>
                {l.nickname}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      <TabsContent value={activeTab} className="mt-0">
        {loading ? (
          <ImageShimmer />
        ) : (
          <ImageGallery lodgeKey={activeTab} images={images} />
        )}
      </TabsContent>
    </Tabs>

    // make this responsive
  );
}
