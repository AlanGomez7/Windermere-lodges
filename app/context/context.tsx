"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";
import type { Lodge } from "@/types/lodge";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  specialRequests: string;
}

interface SearchParams {
  dates: DateRange | undefined;
  guests: {
    adults: number;
    children: number;
    pets:number
  };
  lodge: Lodge | undefined;
  contactInfo:
    | ContactInfo
    | {
        firstName: "";
        lastName: "";
        email: "";
        phone: "";
        address: "";
        city: "";
        postalCode: "";
        country: "";
        specialRequests: "";
      };
  nights?: undefined | number;
}

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<any[]>();
  const [orderDetails, setOrderDetails] = useState<any>(undefined);
  const [isLodgeAvailable, setIsLodgeAvailable] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    dates: undefined,
    guests: { adults: 2, children: 0, pets:0 },
    lodge: undefined,
    nights: undefined,
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      specialRequests: "",
    },
  });

  return (
    <AppContext.Provider
      value={{
        isLodgeAvailable,
        setIsLodgeAvailable,
        searchParams,
        setSearchParams,
        setOrderDetails,
        orderDetails,
        properties,
        setProperties,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
