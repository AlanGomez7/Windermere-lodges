"use server";

import prisma from "@/lib/prisma";
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

export async function getProperties(){
  try{
    const response = prisma.property.findMany();
    return response
  }catch(err){
    throw err
  }
}
