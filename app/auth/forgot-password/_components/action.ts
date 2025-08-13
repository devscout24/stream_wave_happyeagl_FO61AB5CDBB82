"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, EmailResetResponse } from "@/types";

export async function sendForgotPasswordEmail({ email }: { email: string }) {
  try {
    const response = await fetcher<ApiResponse<EmailResetResponse>>(
      "password-reset/request/",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );

    if (!response || !response.data) {
      return {
        error: "Failed to send password reset email. Please try again.",
      };
    }

    return { message: "Password reset email sent successfully" };
  } catch (error) {
    console.error("Forgot password error:", error);

    // Extract user-friendly error message
    if (error && typeof error === "object" && "message" in error) {
      return { error: error.message as string };
    }

    return { error: "Failed to send password reset email. Please try again." };
  }
}
