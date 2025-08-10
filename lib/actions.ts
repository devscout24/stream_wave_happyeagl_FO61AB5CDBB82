"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, UserProfile } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sendChat(values: { body: string }) {
  await fetcher("chats", {
    method: "POST",
    body: JSON.stringify({ ...values, sender: "user" }),
  });
}

export async function logoutUser() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return { message: "No refresh token, cookies cleared." };
  }

  try {
    await fetcher("logout/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    });
  } catch (error) {
    if (error && typeof error === "object" && "data" in error) {
      console.error("Logout API error:", error.data); // Log the actual error
    } else {
      console.error("Logout API error:", error);
    }
    // Still clear cookies even if API fails
  }

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");

  return redirect("/auth/sign-in");
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  // Optionally decode/verify the JWT here
  return accessToken;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const response = await fetcher<ApiResponse<UserProfile>>("profile/");

  if (!response?.data) {
    return null;
  }
  return response.data;
}
