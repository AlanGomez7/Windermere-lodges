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
  if (!userId || !lodgeId) {
    throw new Error("Invalid ids");
  }
  try {
    await prisma.comment.create({
      data: {
        content: review,
        rating,
        property: { connect: { id: lodgeId } },
        visitor: { connect: { id: userId } },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
