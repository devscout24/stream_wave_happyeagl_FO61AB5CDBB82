"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, ChatHistoryResponse } from "@/types";

export async function getChatHistory(chq: string) {
  try {
    const result = await fetcher<ApiResponse<ChatHistoryResponse>>(
      `chats?search=${chq}`,
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
}
