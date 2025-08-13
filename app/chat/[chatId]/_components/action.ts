"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, Messages } from "@/types";

export async function getChatMessages(chatId: string): Promise<Messages> {
  try {
    const response = await fetcher<ApiResponse<Messages>>(
      `chats/${chatId}/messages/`,
      {
        method: "GET",
      },
    );

    if (!response || !response.data) {
      throw new Error("Failed to fetch chat messages");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
}
