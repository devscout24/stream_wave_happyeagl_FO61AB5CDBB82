"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, VerifyCodeResponse } from "@/types";
import { cookies } from "next/headers";

interface VerifyCodeData {
  otp: string;
}

export async function verifyCode(data: VerifyCodeData) {
  const { otp } = data;

  try {
    const response = await fetcher<ApiResponse<VerifyCodeResponse>>(
      "password-reset/verify-otp/",
      {
        method: "POST",
        body: JSON.stringify({ otp }),
      },
    );

    if (!response || !response.data) {
      return { error: "Verification failed. Please try again." };
    }

    // Set cookies (HttpOnly, Secure, etc.)
    const cookieStore = await cookies();
    cookieStore.set("reset_token", response.data.tokens.access, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    cookieStore.set("refresh_reset_token", response.data.tokens.refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { message: "Verification successful!" };
  } catch (error) {
    console.error("Verify code error:", error);

    // Extract user-friendly error message
    if (error && typeof error === "object" && "message" in error) {
      return { error: error.message as string };
    }

    return { error: "Verification failed. Please try again." };
  }
}
