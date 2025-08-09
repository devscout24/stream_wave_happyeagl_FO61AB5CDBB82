"use server";
import fetcher from "@/lib/fetcher";
import { ApiResponse, EmailResetResponse } from "@/types";

export async function sendForgotPasswordEmail(email: string) {
  const response = await fetcher<ApiResponse<EmailResetResponse>>(
    "password-reset/request/",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
  );

  if (!response || !response.data) {
    throw new Error("Failed to send forgot password email");
  }

  return { message: "Password reset email sent successfully" };
}
