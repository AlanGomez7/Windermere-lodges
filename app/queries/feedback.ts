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

export const createEnquiryData = async (data: {
  name: string;
  phone: string;
  email: string;
  subscribe: boolean;
  message: string;
  subject: string;
}) => {
  try {
    const { name, phone, email, subscribe, message, subject } = data;

    if (!name || !phone || !email || !message || !subject) {
      throw new Error("invalid inputs");
    }

    const response = await prisma.enquiry.create({
      data: {
        name: name,
        mobile: phone,
        email,
        subject,
        subscribe,
        message,
        status: "PENDING",
      },
    });

    console.log(response)
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteUserComment = async (id: string, userId:string) => {
  try {
    if (!id) {
      throw new Error("Invalid id");
    }

    // Optional: Verify ownership
    const existingComment = await prisma.comment.findUnique({ where: { id } });
    if (existingComment?.visitorId !== userId) {
      throw new Error("You can only delete your own comments");
    }

    const response = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
