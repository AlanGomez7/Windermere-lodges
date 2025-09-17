import prisma from "@/lib/prisma";
import { cache } from "react";

export const getProperties = cache(async () => {
  try {
    const response = await prisma.property.findMany({
      include: {
        comments: true,
      },
      where:{
        status: 'active'
      }
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
        status: 'active',
        refNo: id,
      },
      include: {
        comments: true,
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
      },
      include: {
        visitor: true,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function getUserReviews(userId: string) {
  try {
    if (!userId) {
      throw new Error("Invalide user id");
    }

    const response = await prisma.comment.findMany({
      where: {
        visitorId: userId,
      },
      include: {
        visitor: true,
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

    console.log(response);
    return response;
  } catch (err) {
    throw err;
  }
};
