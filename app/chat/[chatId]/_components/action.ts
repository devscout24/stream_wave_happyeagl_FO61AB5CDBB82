"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, IMessage } from "@/types";

export interface TMessage {
  chat: number;
  content: string;
  created_at: string; // or Date if you parse it
  file: string | null;
  file_name: string | null;
  file_url: string | null;
  id: number;
  message_type: string;
  sender_type: "user" | "legal_assistant";
}

export interface TMessageResponse {
  messages: TMessage[];
  total_count: number;
  chat_id: number;
}

export async function getChatMessages(chatId: string): Promise<TMessage[]> {
  try {
    const response = await fetcher<ApiResponse<TMessageResponse>>(
      `chats/${chatId}/messages/`,
      {
        method: "GET",
      },
    );
    console.log("🚀 ~ getChatMessages ~ response:", response);

    if (!response || !response.data) {
      throw new Error("Failed to fetch chat messages");
    }

    // id?: number;
    // chat_id: number | null;
    // chat_title: string;
    // agent_type: "legal_assistant" | "user";
    // ai_response: string;
    // is_new_chat: boolean;
    // word_count: number;
    // requires_authentication: boolean;
    // file_processing?: FileProcessing;

    const messages: IMessage[] =
      response?.data?.messages.length > 0
        ? response.data.messages.map((msg) => ({
            chat_id: msg.chat,
            chat_title: msg.content.slice(0, 20),
            agent_type: msg.sender_type,
            ai_response: msg.content,
            is_new_chat: false,
            word_count: msg.content.split(" ").length,
            requires_authentication: true,
            file_processing: {
              file_name: msg.file_name,
              file_type: msg.file ? msg.file.split(".").pop() || "" : "",
              processing_method: "none",
              status: "completed",
            },
          }))
        : [];

    return messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
}
