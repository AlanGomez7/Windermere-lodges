"use server";

import { deleteUserComment } from "@/app/queries/feedback";
import {
  cancelBooking,
  createBooking,
  fetchOrderedLodge,
  getPropertiesWithId,
  getRatingInfo,
  updateOrderPaymentStatus,
} from "@/app/queries/order";
import {
  getAllLodgeComments,
  getLodgeComments,
  getLodgeGalleryImages,
  getPropertyReviews,
  getUserReviews,
} from "@/app/queries/properties";
import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUplistingUrl = process.env.UPLISTING_URL;

interface AvailabilityResponse {
  ok: boolean;
  data: Record<string, any>[];
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

export const fetchPropertiesWithIds = async (ids: string[]) => {
  try {
    if (!ids || ids.length === 0) {
      throw new Error("No ids found");
    }
    const res = await getPropertiesWithId(ids);
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateUserDetails = async (data: {
  userName: string;
  email: string;
  phone: string;
  address: string;
}) => {
  const session = await auth();

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

    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const cancelUserBooking = async (orderId: string) => {
  try {
    if (!orderId) {
      throw new Error("Invalid id");
    }

    const response = await cancelBooking(orderId);
    return response;
  } catch (err) {
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
  params: any,
  id:string
): Promise<AvailabilityResponse> => {
  if (!params?.dates?.from || !params?.dates?.to) {
    return {
      data: [],
      included: [],
      message: "Please select both check-in and check-out dates.",
      ok: false,
    };
  }

  try {
    const checkIn = new Date(params.dates.from);
    const checkOut = new Date(params.dates.to);

    const diffTime = checkOut.getTime() - checkIn.getTime(); // milliseconds
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // convert ms → days

    if (diffDays < 3) {
      return {
        data: [],
        included: [],
        message:
          "Your stay must be at least 3 nights. Please choose a longer stay.",
        ok: false,
      };
    }

    if (diffDays > 14) {
      return {
        data: [],
        included: [],
        message:
          "Your stay cannot be longer than 14 nights. Please choose a shorter stay.",
        ok: false,
      };
    }

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return {
        data: [],
        included: [],
        message: "Oops! The selected dates are invalid. Please try again.",
        ok: false,
      };
    }

    const checkInStr = checkIn.toISOString().split("T")[0];
    const checkOutStr = checkOut.toISOString().split("T")[0];

    if (!process.env.UPLISTING_KEY) {
      return {
        data: [],
        included: [],
        message: "Something went wrong. Please try again later.",
        ok: false,
      };
    }
    const response = await fetch(
      `${baseUplistingUrl}/availability?check_in=${checkInStr}&check_out=${checkOutStr}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${process.env.UPLISTING_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        data: [],
        included: [],
        message: `Something went wrong`,
        ok: false,
      };
    }

    if (response.status === 429) {
      return {
        data: [],
        included: [],
        message: "Too many requests. Please try again in a few seconds.",
        ok: false,
      };
    }

    const result = (await response.json()) as AvailabilityResponse;
    const { data, included } = result;

    if (!Array.isArray(data) || data.length === 0) {
      return {
        data: [],
        included: [],
        message: "No available lodges on these days",
        ok: false,
      };
    }

    // Filter for selected lodge if provided
    if (id) {
      const selectedLodge = data.find((d: any) => {
        if (d.id === id) return d.id;
      });

      if (!selectedLodge) {
        return {
          data: [],
          included,
          message: "Lodge not available",
          ok: false,
        };
      }


      return {
        data: [selectedLodge.id],
        included,
        message: "Lodge available",
        ok: true,
      };
    }

    const availableLodges = data.map((d) => {
      return d.id;
    });

    return {
      data: availableLodges,
      included,
      message: "Lodges found",
      ok: true,
    };
  } catch (err) {
    console.error("checkAvailableLodges error:", err);
    return {
      data: [],
      included: [],
      message: "Something went wrong",
      ok: false,
    };
  }
};

export const postEnquiryData = async (data: any) => {
  try {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const isLodgeBeenBooked = async (userId: string, propertyId: string) => {
  try {
    if (!userId) {
      throw new Error("User not logged in");
    }

    const response = await fetchOrderedLodge(userId, propertyId);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchRatingData = async (lodgeId: string) => {
  try {
    if (!lodgeId) {
      throw new Error("Invalid id");
    }

    const response = await getRatingInfo(lodgeId);
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteComment = async (id: string) => {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("No user found");
    }

    if (!id) {
      throw new Error("Invalid id");
    }

    if (!session.user.id) {
      throw new Error("No user found");
    }

    const response = await deleteUserComment(id, session?.user?.id);
    return response;
  } catch (err) {
    throw err;
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

export const updateOrderPayment = async ({
  orderDetails,
  bookingDetails,
  stripeId,
  status,
}: any) => {
  try {
    const fromDate = bookingDetails?.dates.from;
    const toDate = bookingDetails?.dates.to;

    console.log(fromDate, toDate, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

    const checkIn = new Date(fromDate)?.toISOString().slice(0,10);
    const checkOut = new Date(toDate)?.toISOString().slice(0,10);

    console.log(checkIn, checkOut, "---------------------------------------------------=================================>>>>>>>>>>>>>>")
    const reqBody = {
      data: {
        type: "bookings",
        attributes: {
          check_in: `${checkIn}`,
          check_out: `${checkOut}`,
          guest_name: `${orderDetails.firstName} ${orderDetails.lastName}`,
          guest_email: `${orderDetails.email}`,
          guest_phone: `${orderDetails.phone}`,
          number_of_guests: 3,
        },
        relationships: {
          property: {
            data: {
              type: "properties",
              id: `${bookingDetails.lodge.refNo}`,
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

    const res = await updateOrderPaymentStatus({
      orderDetails,
      bookingDetails,
      stripeId,
      result,
      status,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const confirmBooking = async ({
  orderDetails,
  bookingDetails,
  stripeId,
  amount,
}: any) => {
  try {
    const response = await createBooking({
      orderDetails,
      bookingDetails,
      stripeId,
      amount,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const submitReview = async (reviews: any) => {
  try {
    const session = await auth();
    reviews.userId = session?.user?.id;
    await fetch(`${baseUrl}/api/create-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviews),
    });
  } catch (err) {
    throw err;
  }
};

export const fetchReviews = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Please login");
    }
    const reviews = await getUserReviews(userId);

    return reviews;
  } catch (err) {
    throw err;
  }
};

export const fetchPropertyReviews = async (lodgeId: string) => {
  try {
    if (!lodgeId) {
      throw new Error("Invalid lodge id");
    }

    const response = await getPropertyReviews(lodgeId);
    return response;
  } catch (err) {
    throw err;
  }
};

export const orderedLodge = async (lodgeId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Please login");
    }

    const response = await fetchOrderedLodge(session.user.id, lodgeId);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchLodgeComments = async (lodgeId: any) => {
  try {
    if (!lodgeId) {
      throw new Error("Innvalid lodge id");
    }
    const response = getLodgeComments(lodgeId);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchAllComments = async () => {
  try {
    const response = getAllLodgeComments();
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchLodgeImages = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Invalid lodge id");
    }

    const response = await getLodgeGalleryImages(id);
    return response;
  } catch (err) {
    throw err;
  }
};
