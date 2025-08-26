const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: "GET",
  });
  const res = await response.json();
  if (res.ok) {
    return res.lodges;
  }
  return { message: res.message, ok: false };
};

export const fetchPropertyDetails = async(id: string)=>{
  const response = await fetch(`${baseUrl}/api/our-lodges/${id}`, {
    method: 'GET'
  });

  const res = await response.json();

  if(res.ok){
    return res.result
  }else{
    return null
  }
}

export const registerUser = async (values: any) => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const res = response.json();
  return res;
};

export const submitReview = async (reviews: any) => {
  await fetch(`${baseUrl}/api/create-review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviews),
  });
};
