"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, PasswordResetResponse } from "@/types";
import { cookies } from "next/headers";

interface ChangePasswordData {
  new_password: string;
  confirm_password: string;
}

export async function changePassword(data: ChangePasswordData) {
  const { new_password, confirm_password } = data;

  // Validate passwords match
  if (new_password !== confirm_password) {
    return { error: "Passwords do not match." };
  }

  try {
    // Get reset token from cookies
    const cookieStore = await cookies();
    const resetToken = cookieStore.get("reset_token")?.value;

    if (!resetToken) {
      return { error: "No reset token found. Please verify your code first." };
    }

    // Call API to change password
    const response = await fetcher<ApiResponse<PasswordResetResponse>>(
      "password-reset/change-password/",
      {
        method: "POST",
        body: JSON.stringify({ new_password, confirm_password }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resetToken}`,
        },
      },
    );

    if (!response || !response.data) {
      return { error: "Password change failed. Please try again." };
    }

    // Remove reset token cookies after successful change
    cookieStore.delete("reset_token");
    cookieStore.delete("refresh_reset_token");

    return { message: "Password changed successfully!" };
  } catch (error) {
    console.error("Change password error:", error);

    // Extract user-friendly error message
    if (error && typeof error === "object" && "message" in error) {
      return { error: error.message as string };
    }

    return { error: "Password change failed. Please try again." };
  }
}
