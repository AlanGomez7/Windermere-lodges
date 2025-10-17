import prisma from "@/lib/prisma";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  parse,
  parseISO,
  subDays,
} from "date-fns";
import { cache } from "react";

export const getProperties = cache(async () => {
  try {
    const response = await prisma.property.findMany({
      include: {
        comments: true,
      },
      where: {
        status: "active",
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
});
export async function getLodgeDetails(id: string) {
  try {
    const response = prisma.property.findUnique({
      where: {
        status: "active",
        refNo: id,
      },
      include: {
        comments: true,
        calendar: {
          select: {
            date: true,
            available: true,
            closed_for_arrival: true,
            day_rate: true
          },
        },
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getAllLodgeComments() {
  try {
    const response = await prisma.comment.findMany({
      where: {
        status: "APPROVED",
      },
      include: {
        visitor: true,
      },
      take: 10,
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getLodgeComments(lodgeId: any) {
  try {
    return prisma.comment.findMany({
      where: {
        propertyId: lodgeId,
        status: "APPROVED",
      },
      include: {
        visitor: true,
        property: true,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function getUserReviews(userId: string) {
  try {
    if (!userId) {
      throw new Error("Invalid user id");
    }

    const response = await prisma.comment.findMany({
      where: {
        visitorId: userId,
      },
      include: {
        visitor: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
            //  DO NOT include password
            // add other visitor fields you actually need
          },
        },
        property: true,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
}

export const getPropertyReviews = async (lodgeId: string) => {
  try {
    const response = await prisma.comment.findMany({
      where: {
        propertyId: lodgeId,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const getLodgeGalleryImages = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Invalid lodge id");
    }

    const response = await prisma.propertyGalleryImage.findMany({
      where: {
        propertyId: id,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

export const checkAvailability = async (
  checkIn: string,
  checkOut: string,
  guestsNo: number
) => {
  
  try {
    const start = parse(checkIn, "yyyy-MM-dd", new Date());
    const end = parse(checkOut, "yyyy-MM-dd", new Date());

    const daysToCheck = eachDayOfInterval({
      start,
      end,
    });

    const dateStrings = daysToCheck.map((d) => format(d, "yyyy-MM-dd"));

    const rows = await prisma.calendar.findMany({
      where: {
        date: { in: dateStrings },
        available: true,
      },
      select: { refNo: true, date: true },
    });

    const refCount: Record<string, number> = {};
    for (const row of rows) {
      refCount[row.refNo] = (refCount[row.refNo] || 0) + 1;
    }

    const fullyAvailableRefs = Object.keys(refCount).filter(
      (ref) => refCount[ref] === dateStrings.length
    );

    const lodgesRefs = await prisma.property.findMany({
      where: {
        refNo: {
          in: fullyAvailableRefs,
        },
        guests: {
          gte: guestsNo,
        },
      },
      select: {
        refNo: true, // return only the refNo
      },
    });

    const data = lodgesRefs.map((l)=>l.refNo)
    
    return { data, included: [], message: "", ok: true };
  } catch (err) {
    throw err;
  }
};
