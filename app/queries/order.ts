"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export const createBooking = async (
  orderDetails:any,
  bookingDetails:any,
  result:any,
  stripeId:string,
  amount:number) => {
  try {
    const session = await auth();
    const checkIn = new Date(bookingDetails?.dates?.from)
      .toISOString()
      .split("T")[0];
    const checkOut = new Date(bookingDetails?.dates?.to)
      .toISOString()
      .split("T")[0];

    const userData = {
      userId: session?.user?.id ?? `guest_${randomUUID()}`,
      enquiryId: result ? result.data.id : null,
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
      stripeId,
    };

    console.log(userData)

    const response = await prisma.enquiryBooking.create({
      data: userData as Prisma.EnquiryBookingUncheckedCreateInput,
    });

    // const response = {}

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



export const cancelBooking = async (
  orderId: string,
) => {
  try {
    
    if(!orderId){
      throw new Error("Invalid id")
    }
    const response = await prisma.enquiryBooking.update({
      where:{
        id: orderId
      },
      data: {
        status: "CANCELLED"
      },
    });

    return response
  } catch (err) {
    throw err;
  }
};

export const getPropertiesWithId = async (ids: string[]) => {
  try {
    const response = await prisma.property.findMany({
      where: {
        status: 'active',
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
        enquiryId: result ? result.data.id : null,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateAvailability = async(checkIn:string, checkOut:string, lodgeId:string)=>{
  try{
    const response = prisma.calendar.updateMany({
      where: {
        refNo: lodgeId,
        date:{
          gte: checkIn,
          lte: checkOut
        }
      },
      data:{
        available:false
      }
    });
    
    return response
  }catch(err){
    throw err;
  }
}

export const getRatingInfo = async (lodgeId: string) => {
  try {
    const response = await prisma.comment.groupBy({
      by: ["rating"],
      where: {
        propertyId: lodgeId,
        status: 'APPROVED'
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
