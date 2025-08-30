"use server";

import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUplistingUrl = process.env.UPLISTING_URL;

interface AvailabilityResponse {
  ok: boolean;
  data: any[];
  included: any[];
  message?: string;
}

export const fetchProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: "GET",
  });
  const res = await response.json();
  if (res.ok) {
    return res.lodges;
  }
  return { message: res.message, ok: false };
};

export const fetchPropertyDetails = async (id: string) => {
  const response = await fetch(`${baseUrl}/api/our-lodges/${id}`, {
    method: "GET",
  });

  const res = await response.json();

  if (res.ok) {
    return res.result;
  } else {
    return null;
  }
};

export const checkAvailableLodges= async (params: any):Promise<AvailabilityResponse>  => {
  if (!params.dates || !params.dates) {
    return {
      data: [],
      included: [],
      message: "please select a date",
      ok: false,
    };
  }

  if (!params.lodge) {
    return {
      data: [],
      included: [],
      message: "Please select a lodge",
      ok: false,
    };
  }

  try {
    const fromDate = params.dates.from;
    const toDate = params.dates.to;

    const checkIn = new Date(fromDate).toISOString().split("T")[0];
    const checkOut = new Date(toDate).toISOString().split("T")[0];

    const response = await fetch(
      `${baseUplistingUrl}/availability?check_in=${checkIn}&check_out=${checkOut}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${process.env.UPLISTING_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // const text = await response.text(); // fallback for non-JSON errors
      // throw new Error(`Uplisting API error: ${text}`);
      return {
        data: [],
        included: [],
        message: "Uplisting key error",
        ok: false,
      };
    }

    const result = await response.json() as AvailabilityResponse;
    const { data, included } = result;

    if (data.length === 0) return { data, included, ok: false };

    const { lodge } = params;

    const selectedLodge = data.find((d: any) => d.id === lodge.id);

    console.log(selectedLodge, "oooooooo");
    return { data: selectedLodge, ok: true, included };
  } catch (err) {
    console.log(err);
    return {data:[],included:[],message:'Something went wrong',ok:false}
  }
};

export const registerUser = async (values: any) => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const res = response.json();
  return res;
};

export const submitReview = async (reviews: any) => {
  await fetch(`${baseUrl}/api/create-review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviews),
  });
};
