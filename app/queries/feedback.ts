import prisma from "@/lib/prisma";

export const createReview = async ({
  userId,
  rating,
  review,
  lodgeId,
}: {
  userId: string;
  rating: number;
  review: string;
  lodgeId: string;
}) => {
  try {

    await prisma.comment.create({
        data: {
            content:review,
            rating,
            propertyId:lodgeId,
            visitorId:userId
        }
    });
    
  } catch (err) {
    throw err;
  }
};
