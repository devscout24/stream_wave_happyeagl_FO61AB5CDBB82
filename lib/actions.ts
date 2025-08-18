"use server";

import { fetcher } from "@/lib/fetcher";
import {
  ApiResponse,
  ChatResponse,
  MessagesResponse,
  UserProfile,
} from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function sendChat(values: {
  content: string;
  location: string;
  chat_id?: string;
}): Promise<MessagesResponse | ChatResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    let result: ApiResponse<MessagesResponse | ChatResponse>;

    if (!accessToken) {
      result = await fetcher<ApiResponse<ChatResponse>>("chats/send-public/", {
        method: "POST",
        body: JSON.stringify(values),
      });
    } else {
      result = await fetcher<ApiResponse<MessagesResponse>>("chats/send/", {
        method: "POST",
        body: JSON.stringify(values),
      });
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
