"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, LoginResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(values: {
  email: string;
  password: string;
  confirm_password: string;
}) {
  try {
    const response = await fetcher<ApiResponse<LoginResponse>>("signup/", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!response?.data?.tokens) {
      return { error: "Registration failed - no tokens received" };
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

    // This will redirect successfully
    redirect("/chat");
  } catch (error) {
    // Check if this is a NEXT_REDIRECT error (which is normal)
    if (error && typeof error === "object" && "digest" in error) {
      const errorDigest =
        typeof error === "object" && error !== null && "digest" in error
          ? (error as { digest: string }).digest
          : undefined;
      if (
        typeof errorDigest === "string" &&
        errorDigest.startsWith("NEXT_REDIRECT")
      ) {
        // This is a successful redirect, re-throw it so Next.js can handle it
        throw error;
      }
    }

    // Handle actual errors
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Registration failed. Please try again." };
  }
}
