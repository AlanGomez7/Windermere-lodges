"use server";
import prisma from "@/lib/prisma";

export const createBooking = async (details: any) => {
  const { form, searchParams, result } = details;
  
  const checkIn = new Date(searchParams.dates.from).toISOString().split("T")[0];
  const checkOut = new Date(searchParams.dates.to).toISOString().split("T")[0];

  try {
    const response = await prisma.enquiryBooking.create({
      data: {
        // id: result.data.id,
        enquiryId:result.data.id,
        propertyId: searchParams.lodge.id,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.phone,
        arrivalDate: checkIn,
        departureDate: checkOut,
        adults: searchParams.guests.adults,
        children: searchParams.guests.children,
        message: form.specialRequests,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserBookings = async(email:string | null | undefined)=>{
  try{
    if(email){
      console.log(email)
      const bookings = await prisma.enquiryBooking.findMany({
        where: {
          email: email
        },
        include: {
          property: true
        }
      })
      return bookings
    }

    return 
  }catch(err){
    throw err;
  }
}
