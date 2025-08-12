"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, MessagesResponse, UserProfile } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sendChat(values: {
  content: string;
  location: string;
  chat_id?: string;
}): Promise<MessagesResponse> {
  try {
    const result = await fetcher<ApiResponse<MessagesResponse>>("chats/send/", {
      method: "POST",
      body: JSON.stringify(values),
    });

    console.log("Chat sent successfully:", result);

    if (!result || !result.data) {
      throw new Error("Failed to send chat");
    }
    revalidatePath(`/chat/${result.data.chat_id}`);

    return result.data;
  } catch (error) {
    console.error("Error sending chat:", error);
    throw error;
  }
}

// export async function resumeChat(
//   chatId: string,
//   value: ChatFormValues,
// ): Promise<MessagesResponse> {
//   try {
//     const result = await fetcher<ApiResponse<MessagesResponse>>(
//       `chats/${chatId}/resume/`,
//       {
//         method: "POST",
//         body: JSON.stringify(value),
//       },
//     );
//     return result.data;
//   } catch (error) {
//     console.error("Error resuming chat:", error);
//     throw error;
//   }
// }

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
