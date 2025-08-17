"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, ChatHistoryResponse, ChatHistorySearch } from "@/types";
import { revalidatePath } from "next/cache";

export async function getChatHistory(chq?: string) {
  try {
    let result;

    if (!chq) {
      result = await fetcher<ApiResponse<ChatHistoryResponse>>("chats/");
      return result?.data;
    } else {
      result = await fetcher<ApiResponse<ChatHistorySearch>>(
        "chats/history/search/",
        {
          method: "POST",
          body: JSON.stringify({ query: chq }),
        },
      );

      console.log("Search HIstory:", result);

      return {
        total_count: result?.data?.total_messages || 0,
        chats: result?.data?.chat_groups || [],
      };
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
}

export const deleteHistory = async (chat_ids: number[]) => {
  try {
    await fetcher<ApiResponse<ChatHistoryResponse>>(
      "chats/bulk-delete/",
      {
        method: "POST",
        body: JSON.stringify({ chat_ids }), 
      },
    );
    revalidatePath("/chat/history");
  } catch (error) {
    console.error("Failed to delete chat history:", error);
    throw error;
  }
};

export const bulkArchive = async ({
  chat_ids,
  archive,
}: {
  chat_ids: number[];
  archive: boolean;
}) => {
  
  try {
    const response = await fetcher<ApiResponse<ChatHistoryResponse>>(
      "chats/bulk-archived/",
      {
        method: "POST",
        body: JSON.stringify({
          chat_ids,
          archive,
        }),
      },
    );

    revalidatePath("/chat/history");

    console.log("Bulk archive response:", response);
    return response;
  } catch (error) {
    console.error("Failed to bulk archive chats:", error);
    throw error;
  }
};
