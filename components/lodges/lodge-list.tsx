"use client";

import { use } from "react";
import LandscapeLodgeCard from "../cards/landscape-lodge-card";
import { LodgeCardData } from "@/lib/types";

export function LodgeList({
  properties,
  available,
  showBadge,
}: {
  properties: Promise<LodgeCardData[]>;
  available: string[];
  showBadge: boolean;
}) {
  const lodges: LodgeCardData[] = use(properties);

  if (lodges.length === 0) {
    return <>No lodges found</>;
  }

  // Sort lodges: available ones come first
  const sortedLodges = [...lodges].sort((a, b) => {
    const aAvailable = available.includes(a?.refNo);
    const bAvailable = available.includes(b?.refNo);
    return aAvailable === bAvailable ? 0 : aAvailable ? -1 : 1;
  });

  return (
    <div className="w-svw">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Lodges</h2>
        <div className="text-sm text-gray-500">
          Showing {sortedLodges.length} lodges
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full pt-8 gap-4">
        {sortedLodges.map((lodge: any) => (
          <LandscapeLodgeCard
            key={lodge?.id}
            lodge={lodge}
            needsButton={true}
            available={available.includes(lodge?.refNo)}
            showBadge={showBadge}
          />
        ))}
      </div>
    </div>
  );
}
