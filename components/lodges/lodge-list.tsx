"use client";

import { use } from "react";
import LandscapeLodgeCard from "../cards/landscape-lodge-card";

export function LodgeList({
  properties,
  available,
  showBadge
}: {
  properties: any;
  available: string[];
  showBadge: boolean
}) {
  
  const lodges: any = use(properties);

  if (lodges.length === 0) {
    return <>No lodges found</>;
  } 

  return (
    <div className="w-svw">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Lodges</h2>
        <div className="text-sm text-gray-500">
          Showing {lodges.length} lodges
        </div>
      </div>
      {/* grid h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
      <div className="flex flex-col justify-center items-center w-full pt-8 gap-4">
        {lodges?.map((lodge: any) => (
          
          <LandscapeLodgeCard
            lodge={lodge}
            key={lodge.id}
            needsButton={true}
            available={available.includes(lodge?.refNo) ?? false}
            showBadge={showBadge}
            />
            
        ))}
      </div>
    </div>
  );
}
