"use server";

import fetcher from "@/lib/fetcher";
import {
  ApiResponse,
  SaveChatHistoryResponse,
  UpdatePass,
  UpdateProfileResponse,
} from "@/types";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

export const updateProfile = async (values: {
  first_name?: string;
  last_name?: string;
  //   profile_pic?: File;
}) => {
  try {
    await fetcher<ApiResponse<UpdateProfileResponse>>("profile/", {
      method: "PUT",
      body: JSON.stringify(values),
    });

    revalidatePath("/profile");
  } catch (error) {
    // Handle actual errors
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Registration failed. Please try again." };
  }
};

// export const updatePass = async (values: {
//   old_password: string;
//   new_password: string;
//   confirm_password: string;
// }) => {
//   try {
//     const response = await fetcher<ApiResponse<UpdatePass>>("change-password/", {
//       method: "PUT",
//       body: JSON.stringify(values),
//     });
//     console.log("res from updata pass" ,response);
//   } catch (error) {
//     throw error;
//   }
// };

export async function updatePassword(values: {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}) {
  console.log(values);

  try {
    await fetcher<ApiResponse<UpdatePass>>("change-password/", {
      method: "PUT",
      body: JSON.stringify(values),
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating password:", error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to update password. Please try again." };
  }
}

export async function getSaveChatHistory() {
  try {
    const response = await fetcher<Promise<SaveChatHistoryResponse>>(
      "save_chat_history/",
      {
        method: "GET",
      },
    );

    if (response && typeof response === "object") {
      return response;
    }
  } catch (error) {
    console.error("Error fetching saved chat history:", error);
  }
}

export async function saveChatHistory(data: { save_chat_history: boolean }) {
  try {
    const response = await fetcher<ApiResponse<SaveChatHistoryResponse>>(
      "save_chat_history/",
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
    );

    if (response && typeof response === "object") {
      return response;
    }
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
}
