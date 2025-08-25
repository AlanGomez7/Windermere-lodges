const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const submitReview = async(reviews:any)=>{
    await fetch(`baseUrl/api/create-review`, {
        method: 'POST',
        body:"hwllo",
    })
}