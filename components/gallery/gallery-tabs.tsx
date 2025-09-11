"use client"

import { useState, useEffect, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGallery } from "./image-gallery"
import { useSearchParams } from "next/navigation"

export function GalleryTabs() {

  const searchParams = useSearchParams();
  const lodgeId = searchParams.get("id");


  const [activeTab, setActiveTab] = useState("images")
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch with useEffect
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }


  return (

    <Tabs defaultValue={lodgeId?`${lodgeId}`:"6514f268-d14a-42aa-89bb-2e6ac51b14c5"} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-auto grid-cols-3">
          <TabsTrigger value="6514f268-d14a-42aa-89bb-2e6ac51b14c5">Glenridding Lodge</TabsTrigger>
          <TabsTrigger value="465ec739-ab41-4e72-923c-bcf7925ea899">Water's Reach</TabsTrigger>
          <TabsTrigger value="5f2b3b3f-04e5-4a45-9c4e-2591711f23c9">Serenity</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="5f2b3b3f-04e5-4a45-9c4e-2591711f23c9" className="mt-0">
        <ImageGallery lodgeKey="5f2b3b3f-04e5-4a45-9c4e-2591711f23c9" />
      </TabsContent>
      <TabsContent value="6514f268-d14a-42aa-89bb-2e6ac51b14c5" className="mt-0">
        <ImageGallery lodgeKey="6514f268-d14a-42aa-89bb-2e6ac51b14c5" />
      </TabsContent>
      <TabsContent value="465ec739-ab41-4e72-923c-bcf7925ea899" className="mt-0">
        <ImageGallery lodgeKey="465ec739-ab41-4e72-923c-bcf7925ea899" />
      </TabsContent>
    </Tabs>
  )
}

