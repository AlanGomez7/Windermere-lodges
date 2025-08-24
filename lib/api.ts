const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProperties = async () => {
  const response = await fetch(`${baseUrl}/api/properties`, {
    method: "GET",
  });
  const res = await response.json();
  if(res.ok){
    return res.lodges
  }
  return {message: res.message, ok: false};
};
