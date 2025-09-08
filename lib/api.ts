"use server";

import { createBooking } from "@/app/queries/order";
import { auth } from "@/auth";

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

export const updateUserDetails = async (data: {
  userName: string;
  email: string;
  phone: string;
  address: string;
}) => {
  const session = await auth();

  console.log(session);
  const response = await fetch(
    `${baseUrl}/api/auth/update-user-details/${session?.user?.email}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const changePassword = async ({
  passwordData,
  id,
}: {
  passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  id: string;
}) => {
  
  try {
    const response = await fetch(`${baseUrl}/api/auth/update-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordData),
    });

    return response.json()
  } catch (err) {
    console.log(err);
    throw err;
  }
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

export const checkAvailableLodges = async (
  params: any
): Promise<AvailabilityResponse> => {
  if (!params.dates) {
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
    const result = (await response.json()) as AvailabilityResponse;
    console.log(result);

    if (!response.ok) {
      return {
        data: [],
        included: [],
        message: "Uplisting key error",
        ok: false,
      };
    }

    const { data, included } = result;

    if (data.length === 0)
      return { data, included, ok: false, message: "Lodge not available" };

    const { lodge } = params;

    const selectedLodge = data.find((d: any) => d.id === lodge.id);

    return { data: selectedLodge, ok: true, included };
  } catch (err) {
    return {
      data: [],
      included: [],
      message: "Something went wrong",
      ok: false,
    };
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

export const confirmBooking = async ({ form, searchParams }: any) => {
  const fromDate = searchParams.dates.from;
  const toDate = searchParams.dates.to;

  const checkIn = new Date(fromDate).toISOString().split("T")[0];
  const checkOut = new Date(toDate).toISOString().split("T")[0];

  const reqBody = {
    data: {
      type: "bookings",
      attributes: {
        check_in: `${checkIn}`,
        check_out: `${checkOut}`,
        guest_name: `${form.firstName} ${form.lastName}`,
        guest_email: `${form.email}`,
        guest_phone: `${form.phone}`,
        number_of_guests: 3,
      },
      relationships: {
        property: {
          data: {
            type: "properties",
            id: `${searchParams.lodge.refNo}`,
          },
        },
      },
    },
  };

  const response = await fetch(`${baseUplistingUrl}/v2/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${process.env.UPLISTING_KEY}`,
      "X-Uplisting-Client-Id": `${process.env.UPLISTING_CLIENT_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  const result = await response.json();

  if (result.data.id) {
    const response = await createBooking({ form, searchParams, result });
    return { ok: true, response, message: "Booking Successful" };
  } else {
    return { ok: false, response: result, message: "Something went wrong" };
  }
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
