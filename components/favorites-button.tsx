// components/WishlistButton.tsx
"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavorites } from "@/lib/api";

type Props = {
  lodgeId: string;
  isFavorite: boolean;
};

export default function WishlistButton({ lodgeId, isFavorite }: Props) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const updated = await toggleFavorites(lodgeId);
      setFavorite(updated);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
    >
      <Heart
        size={20}
        className={
          favorite ? "fill-red-500 text-red-500" : "text-gray-400"
        }
      />
    </button>
  );
}
