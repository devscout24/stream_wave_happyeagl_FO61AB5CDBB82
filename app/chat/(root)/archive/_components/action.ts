"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, ArchivedResponse, ChatHistoryResponse } from "@/types";
import { revalidatePath } from "next/cache";

export async function getArchived() {
  try {
    const result =
      await fetcher<ApiResponse<ArchivedResponse>>("chats/archived/");
    return result?.data;
  } catch (error) {
    console.error("Error fetching archived:", error);
    throw error;
  }
}

export async function setArchive(chatId: number, is_archived: boolean) {
  try {
    console.log("now on", { is_archived });
    const res = await fetcher(`chats/${chatId}/archive/`, {
      method: "PUT",
      body: JSON.stringify({ is_archived }),
    });
    if (is_archived) {
      revalidatePath("/chat/history");
    } else {
      revalidatePath("/chat/archive");
    }
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error archiving chat:", error);
    throw error;
  }
}



export const deleteArchive = async (chat_ids: number[]) => {
  try {
    await fetcher<ApiResponse<ChatHistoryResponse>>(
      "chats/archived/bulk-delete/",
      {
        method: "POST",
        body: JSON.stringify({ chat_ids }), 
      },
    );
    revalidatePath("/chat/archive");
  } catch (error) {
    console.error("Failed to delete chat history:", error);
    throw error;
  }
};


export const bulkUnarchive = async ({
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

    revalidatePath("/chat/archive");

    console.log("Bulk archive response:", response);
    return response;
  } catch (error) {
    console.error("Failed to bulk archive chats:", error);
    throw error;
  }
};
