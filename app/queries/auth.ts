"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(userDetails: any) {
  try {
    const { name, email, password, role } = userDetails;
    const encryptedPassword = await bcrypt.hash(password, 12);
    const slug = randomUUID();

    const response = await prisma.user.create({
      data: {
        name,
        googleId: userDetails.sub ?? null,
        email,
        password: encryptedPassword,
        role,
        avatar: userDetails.avatar ?? null,
        slug
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(details: any) {
  try {
    const { userName, address, phone, email, userId } = details;
    const response = await prisma.user.update({
      where:{
        id:userId
      },
      data:{
        address: address,
        name: userName,
        mobile:phone,
        email:email
      }
    })

    return response
  } catch (err) {
    throw err;
  }
}

export async function checkUser(userDetails: any) {
  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        email: userDetails.email,
      },
    });

    if (!dbUser) {
      return null;
    }

    return dbUser;
  } catch (err) {
    throw err;
  }
}

export const credentialCheck = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = credentials;

    const dbUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!dbUser || dbUser.googleId) {
      return null;
    }


    const status = await bcrypt.compare(password, dbUser.password);
    if (status) {
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        address:dbUser.address,
        phone:dbUser.mobile,
        image: dbUser.avatar ?? null, // if you store it
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
