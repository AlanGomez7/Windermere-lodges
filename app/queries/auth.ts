"use server";

import prisma from "@/lib/prisma";
import { HttpError } from "@/lib/utils";
import { Prisma } from "@prisma/client";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(userDetails: any) {
  console.log(userDetails);
  try {
    const response = await prisma.user.create({
      data: userDetails,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
