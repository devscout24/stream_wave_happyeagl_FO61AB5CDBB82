"use server";

import { fetcher } from "@/lib/fetcher";
import {
  ApiResponse,
  EmailResetResponse,
  IMessage,
  LoginResponse,
  PasswordResetResponse,
  UserProfile,
  VerifyCodeResponse,
} from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sendChat(
  values: { content: string; location: string; chat_id?: string } | FormData,
): Promise<IMessage> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    let result: ApiResponse<IMessage>;

    // Prepare the request body
    let body: string | FormData;
    let isFormData = false;

    if (values instanceof FormData) {
      // If FormData is passed (with files), use it directly
      body = values;
      isFormData = true;
    } else {
      // If regular object is passed, stringify it
      body = JSON.stringify(values);
    }

    const requestOptions: RequestInit = {
      method: "POST",
      body,
      // Don't set Content-Type header for FormData - browser will set it automatically with boundary
      ...(isFormData
        ? {}
        : { headers: { "Content-Type": "application/json" } }),
    };

    if (!accessToken) {
      result = await fetcher<ApiResponse<IMessage>>(
        "chats/send-public/",
        requestOptions,
      );
    } else {
      result = await fetcher<ApiResponse<IMessage>>(
        "chats/send/",
        requestOptions,
      );
    }

    if (!result || !result.data) {
      throw new Error("Failed to send chat");
    }

    // Commenting out immediate revalidation to prevent race condition
    // The optimistic updates will handle showing the message immediately
    revalidatePath(`/chat/${result.data.chat_id}`);

    return result.data;
  } catch (error) {
    console.error("Error sending chat:", error);
    throw error;
  }
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

  return redirect("/");
}

export async function getUserSession() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    // Optionally decode/verify the JWT here
    return accessToken;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const session = await getUserSession();

    if (!session) {
      return null;
    }

    const response = await fetcher<ApiResponse<UserProfile>>("profile/");
    if (!response?.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function loginUser(values: { email: string; password: string }) {
  try {
    const response = await fetcher<ApiResponse<LoginResponse>>("login/", {
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

    // Success - redirect to chat (outside try-catch to avoid catching NEXT_REDIRECT)
    return { message: "Logged in successfully!" };
  } catch (error) {
    // If error is an object with a message property, use that
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    // Otherwise, fallback
    return { error: "Login failed. Please try again." };
  }
}

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

    // Success - redirect to chat (outside try-catch to avoid catching NEXT_REDIRECT)
    return { message: "Registration successful!" };
  } catch (error) {
    // Handle actual errors
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Registration failed. Please try again." };
  }
}

export async function resendVerificationCode(email: string) {
  try {
    const response = await fetcher<ApiResponse<{ message: string }>>(
      "password-reset/request/",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
    );

    if (!response?.data) {
      return {
        error: response?.message || "Failed to resend verification code",
      };
    }

    return {
      message: response.data.message || "Verification code sent successfully!",
    };
  } catch (error) {
    console.error("Resend verification error:", error);

    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }

    return { error: "Failed to resend verification code. Please try again." };
  }
}
