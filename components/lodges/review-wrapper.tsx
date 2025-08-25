import { auth } from "@/auth";
import RatingsAndReviews from "./ratings-and-reviews";

export default async function ReviewWrapper({ lodge }: { lodge: any }){

    const session = await auth()

    return (
        <RatingsAndReviews lodge={lodge} user={session?.user}/>
    )
}