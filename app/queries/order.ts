import prisma from "@/lib/prisma"

export const createBooking = async(details:any)=>{
    await prisma.booking.create(details)
}