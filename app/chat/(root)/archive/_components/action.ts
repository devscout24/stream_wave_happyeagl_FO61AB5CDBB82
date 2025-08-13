"use server";

import fetcher from "@/lib/fetcher";
import { ApiResponse, ArchivedResponse } from "@/types";

export async function getArchived() {
  try {
    const result = await fetcher<ApiResponse<ArchivedResponse>>("chats/archived/");
    return result.data;
  } catch (error) {
    console.error("Error fetching archived:", error);
    throw error;
  }
}


