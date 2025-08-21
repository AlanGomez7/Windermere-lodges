"use server";

import prisma from "@/lib/prisma";
import { HttpError } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(userDetails: any) {
  console.log(userDetails);
  try {
    const response = await prisma.user.create({
      data: userDetails,
    });
    return response;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        throw new HttpError("email already exsists", 409);
      }
    }
    throw new HttpError("Somthing went wrong", 500);
  }
}
