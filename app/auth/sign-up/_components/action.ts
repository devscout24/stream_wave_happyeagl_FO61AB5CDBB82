"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, LoginResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(values: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetcher<ApiResponse<LoginResponse>>("signup/", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!response?.data?.tokens) {
    return { error: "Login failed - no tokens received" };
  }

  // Set cookies (HttpOnly, Secure, etc.)
  const cookieStore = await cookies();
  cookieStore.set("access_token", response.data.tokens.access, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  cookieStore.set("refresh_token", response.data.tokens.refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // This will throw a NEXT_REDIRECT error internally, which is handled by Next.js
  redirect("/chat");
}
