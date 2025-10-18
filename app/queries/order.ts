"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

type CouponType = {
  id: string;
  description: string;
  code: string;
  discountType: string;
  discountValue: number;
  maxUsesPerUser: number;
  expiresAt: Date | null;
  isActive: boolean;
} | null;

export const createBooking = async (
  orderDetails: any,
  bookingDetails: any,
  coupon: any,
  result: any,
  stripeId: string,
  amount: number
) => {
  try {
    console.log(amount);
    const session = await auth();

    const checkIn = new Date(bookingDetails?.dates?.from)
      .toISOString()
      .split("T")[0];
    const checkOut = new Date(bookingDetails?.dates?.to)
      .toISOString()
      .split("T")[0];

    const userData = {
      userId: session?.user?.id ?? `guest_${randomUUID()}`,
      enquiryId: result ? result.data.id : randomUUID(),
      firstName: orderDetails?.firstName,
      lastName: orderDetails?.lastName,
      propertyId: bookingDetails?.lodge?.id,
      email: orderDetails?.email,
      mobile: orderDetails?.phone,
      arrivalDate: checkIn,
      departureDate: checkOut,
      adults: bookingDetails.guests.adults,
      children: bookingDetails.guests.children,
      teens: bookingDetails.guests.teens,
      infant: bookingDetails.guests.infants,
      pets: bookingDetails.guests.pets,
      message: orderDetails?.specialRequests,
      amount,
      coupon: coupon,
      stripeId,
      reason: "",
      timestamp: new Date(),
    };

    const response = await prisma.enquiryBooking.create({
      data: userData as Prisma.EnquiryBookingUncheckedCreateInput,
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserBookings = async (id: string | null | undefined) => {
  try {
    if (id) {
      const bookings = await prisma.enquiryBooking.findMany({
        where: {
          userId: id,
          payment: "SUCCESSFUL",
        },
        include: {
          property: true,
        },
      });
      return bookings;
    }

    return;
  } catch (err) {
    throw err;
  }
};

export const cancelBooking = async (orderId: string) => {
  try {
    if (!orderId) {
      throw new Error("Invalid id");
    }
    const response = await prisma.enquiryBooking.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const getPropertiesWithId = async (ids: string[]) => {
  try {
    const response = await prisma.property.findMany({
      where: {
        status: "active",
        refNo: {
          in: ids,
        },
      },
      include: {
        comments: true,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchOrderedLodge = async (userId: string, lodgeId: string) => {
  try {
    const lodge = await prisma.enquiryBooking.findFirst({
      where: {
        userId: userId, // pass the user's ID
        propertyId: lodgeId, // pass the property's ID
        status: "CONFIRMED", // EnquiryBookingStatus enum
        payment: "SUCCESSFUL", // PaymentStatus enum (if you also want paid ones only)
      },
    });

    return lodge;
  } catch (err) {
    throw err;
  }
};

enum PAYMENTSTATUS {
  SUCCESSFUL = "SUCCESSFUL",
  PENDING = "PENDING",
  UNSUCCESSFUL = "UNSUCCESSFUL",
}

export const updateOrderPaymentStatus = async ({
  stripeId,
  result,
  status,
}: {
  bookingDetails: any;
  orderDetails: any;
  stripeId: string;
  result: any;
  status: PAYMENTSTATUS;
}) => {
  try {
    const response = prisma.enquiryBooking.update({
      where: {
        stripeId: stripeId,
      },
      data: {
        payment: status,
        enquiryId: result && result.data.id,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const updateCouponUse = async (coupon: any, user: any) => {
  try {
    const existingUse = await prisma.couponUse.findFirst({
      where: {
        userId: user.id,
        couponId: coupon.id,
      },
    });

    if (existingUse) {
      throw new Error("User has already used this coupon");
    }

    const response = prisma.couponUse.create({
      data: {
        userId: user?.id,
        coupon: {
          connect: { id: coupon.id },
        },
        usedAt: new Date(),
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const updateAvailability = async (
  checkIn: string,
  checkOut: string,
  lodgeId: string,
  status: boolean
) => {
  try {
    const response = prisma.calendar.updateMany({
      where: {
        refNo: lodgeId,
        date: {
          gte: checkIn,
          lte: checkOut,
        },
      },
      data: {
        available: status,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const getRatingInfo = async (lodgeId: string) => {
  try {
    const response = await prisma.comment.groupBy({
      by: ["rating"],
      where: {
        propertyId: lodgeId,
        status: "APPROVED",
      },
      _count: {
        rating: true,
      },
      _sum: {
        rating: true,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const verifyCoupon = async (code: string): Promise<CouponType> => {
  try {
    const session = await auth();

    if (!code) {
      throw new Error("Invalid coupon");
    }

    const now = new Date();

    const response = await prisma.coupon.findUnique({
      where: {
        code: code,
      },
      include: {
        uses: true,
      },
    });

    if (response?.isActive) {
      if (response.expiresAt && response.expiresAt < now) {
        return null;
      }


      if (!session) {
        return response;
      }

      const existingUse = await prisma.couponUse.findFirst({
        where: {
          couponId: response.id,
          userId: session?.user?.id,
        },
      });

      if (existingUse) {
        return null;
      }

      return response;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
