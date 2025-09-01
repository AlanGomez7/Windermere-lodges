"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createUser(userDetails: any) {
  try {
    const { name, email, password, role } = userDetails;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const response = await prisma.user.create({
      data: {
        name,
        googleId: userDetails.sub ?? null,
        email,
        password: encryptedPassword,
        role,
        avatar: userDetails.avatar ?? null,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkUser(userDetails: any) {
  try {
    const dbUser = await prisma.user.findFirst({
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
  console.log(credentials)
  try {
    const { email, password } = credentials;

    const dbUser = await prisma.user.findFirst({
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
        image: dbUser.avatar ?? null, // if you store it
      };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
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

export async function getLodgeDetails(id: string) {
  try {
    const response = prisma.property.findFirst({
      where: {
        refNo:id
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
}
