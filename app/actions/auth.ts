"use server";

import { signIn, signOut } from "@/auth";
import { HttpError } from "@/lib/utils";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  const response = await signIn(action, { redirectTo: "/" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function credentialLogin(credentials: any) {
  try {
    const response = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    },);
    return response
  } catch (err) {
    console.log(err, "fadkfjakldjf")
    throw new HttpError("Something went wrong", 500);
  }
}

export async function doSocialLogout() {}
