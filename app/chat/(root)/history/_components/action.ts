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
        total_count: result.data.total_messages,
        chats: result.data.chat_groups,
      };
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
}

export const deleteAllHistory = async () => {
  try {
    await fetcher<ApiResponse<ChatHistoryResponse>>(
      "chats/archived/delete-all/",
      {
        method: "DELETE",
      },
    );
    revalidatePath("/chat/history");
  } catch (error) {
    throw error;
  }
};


export const bulkArchive = async (chatIds: number[], archive = true) => {
  try {
    const response = await fetcher<ApiResponse<ChatHistoryResponse>>("chats/archive-bulk/", {
      method: "POST",
      body: JSON.stringify({
        chat_ids: chatIds,
        archive : true,
      }),
    });

    return response;
  } catch (error) {
    console.error("Failed to bulk archive chats:", error);
    throw error;
  }
};
