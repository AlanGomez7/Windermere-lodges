"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function doSocialLogin(formData: any) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
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
    if(err instanceof AuthError){
      return {error: "Invalid credentials"}
    }
    return {error: "something went wrong"}
  }
}

