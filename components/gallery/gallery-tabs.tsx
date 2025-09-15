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

  async function loadImages(id:string) {
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
      defaultValue={activeTab ? activeTab : lodgeIds[0].id}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-auto grid-cols-3">
          {lodgeIds.map((l: any) => (
            <TabsTrigger value={l.id} key={l.id}>
              {l.nickname}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent
        value={activeTab}
        className="mt-0"
      >
        {loading ? (
          <ImageShimmer/>
          // <p className="text-center text-gray-500">Loading images…</p>
        ) : (
          <ImageGallery lodgeKey={activeTab} images={images} />
        )}
      </TabsContent>
    </Tabs>
  );
}
