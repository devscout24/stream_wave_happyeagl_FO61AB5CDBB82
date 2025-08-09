"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, LoginResponse, UserProfile } from "@/types";
import { cookies } from "next/headers";

export async function sendChat(values: { body: string }) {
  await fetcher("chats", {
    method: "POST",
    body: JSON.stringify({ ...values, sender: "user" }),
  });
}

export async function loginUser(values: { email: string; password: string }) {
  const response = await fetcher<ApiResponse<LoginResponse>>("login/", {
    method: "POST",
    body: JSON.stringify(values),
  });

  if (!response?.data?.tokens) {
    throw new Error("Login failed");
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

  return response;
}

export async function logoutUser() {
  await fetcher("logout", { method: "POST" });
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  return { message: "Logged out successfully" };
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  // Optionally decode/verify the JWT here
  return accessToken;
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await fetcher<ApiResponse<UserProfile>>("profile/");

  return response.data;
}
