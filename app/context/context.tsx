"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Lodge } from "@/types/lodge";

interface SearchParams {
  dates: DateRange | undefined;
  guests: {
    adults: number;
    children: number;
  };
  lodge: Lodge | undefined;
}

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  let [user, setUser] = useState("Alan");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    dates: undefined,
    guests: { adults: 2, children: 0 },
    lodge: undefined,
  });

  return (
    <AppContext.Provider value={{ user, setUser, searchParams, setSearchParams }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
