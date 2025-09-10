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
    const response = prisma.property.findUnique({
      where: {
        refNo: id,
      },
      include:{
        comments:true
      }
    });
    return response;
  } catch (err) {
    throw err;
  }
}

export async function getReviews(userId:string){
  try{
    if(!userId){
      throw new Error("Invalide user id")
    }

    const response = await prisma.comment.findMany({
      where:{
        visitorId: userId
      },
      include:{
        visitor:true
      }
    })


    return response
  }catch(err){
    throw err;
  }
}

export const getPropertyReviews = async(lodgeId:string)=>{
  try{
    const response = await prisma.comment.findMany({
      where:{
        propertyId: lodgeId
      }
    })

    return response
  }catch(err){
    throw err;
  }
}

