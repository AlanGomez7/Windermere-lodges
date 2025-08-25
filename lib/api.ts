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
