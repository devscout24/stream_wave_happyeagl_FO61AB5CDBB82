"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, VerifyCodeResponse } from "@/types";

export async function verifyCode(otp: string) {
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
