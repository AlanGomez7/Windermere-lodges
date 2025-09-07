import prisma from "@/lib/prisma";

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
        refNo: id,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
}


export async function removeWishlist(lodgeId: string, userId: string) {
  try {
  } catch (err) {
    throw err;
  }
}

export async function addToWishlist(lodgeId: string, userId: string) {
  try {
  } catch (err) {
    throw err;
  }
}
