"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(userDetails: any) {
  try {
    const response = await prisma.user.create({
      data: userDetails,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const credentialCheck = async (credentials: {
  email: string;
  password: string;
}) => {
  try{

    const { email, password } = credentials;
    
    const dbUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // console.log(user);
    
    // additionaly need to add bcrypt compare
    if (!dbUser) {
      return null;
    }

    const status = await bcrypt.compare(password, dbUser.password)
    if (status) {
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.avatar ?? null, // if you store it
      };
    }else{
      return null
    }
  }catch(err){
    throw err
  }
};

export async function getProperties() {
  try {
    const response = await prisma.property.findMany();
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getLodgeDetails(id:string){
  try{
    const response = prisma.property.findUnique({
      where: {
        id: id
      }
    })
    return response
  }catch(err){
    throw err;
  }
}
