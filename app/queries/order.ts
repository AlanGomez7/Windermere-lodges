"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export const createBooking = async ({
  userInfo,
  bookingDetails,
  result,
  stripeId,
  amount,
}: any) => {
  console.log({ userInfo, bookingDetails, result, stripeId });
  const session = await auth();

  const checkIn = new Date(bookingDetails?.dates?.from)
    .toISOString()
    .split("T")[0];
  const checkOut = new Date(bookingDetails?.dates?.to)
    .toISOString()
    .split("T")[0];

  try {
    const response = await prisma.enquiryBooking.create({
      data: {
        userId: session?.user?.id ?? `guest_${randomUUID()}`,
        enquiryId: result ? result.data.id : null,
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        propertyId: bookingDetails?.lodge?.id,
        email: userInfo?.email,
        mobile: userInfo?.phone,
        arrivalDate: checkIn,
        departureDate: checkOut,
        adults: bookingDetails.guests.adults,
        children: bookingDetails.guests.children,
        pets: bookingDetails.guests.pets,
        message: userInfo?.specialRequests,
        amount,
        stripeId,
      } as Prisma.EnquiryBookingUncheckedCreateInput,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserBookings = async (email: string | null | undefined) => {
  try {
    if (email) {
      console.log(email);
      const bookings = await prisma.enquiryBooking.findMany({
        where: {
          email: email,
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
    
    return lodge
  } catch (err) {
    throw err;
  }
};

enum STATUS {
  SUCCESSFUL="SUCCESSFUL",
  PENDING="PENDING",
  UNSUCCESSFUL="UNSUCCESSFUL"
}

export const updateOrderPaymentStatus = async({stripeId, status}:{stripeId:string, status: STATUS})=>{
  try{
    const response = prisma.enquiryBooking.update({
      where: {
        stripeId: stripeId,
      },
      data:{
        payment: status
      }
    })
    return response
  }catch(err){
    throw err;
  }
}
