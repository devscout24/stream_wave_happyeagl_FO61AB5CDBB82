"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, LoginResponse, UserProfile } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  return { message: "Logged in successfully" };
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
  return response.data;
}
