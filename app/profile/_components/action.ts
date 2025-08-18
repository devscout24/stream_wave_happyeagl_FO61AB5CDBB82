"use server";

import fetcher from "@/lib/fetcher";
import {
  ApiResponse,
  SaveChatHistoryResponse,
  UpdatePass,
  UpdateProfileResponse,
} from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export async function updatePassword(values: {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}) {
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
    await fetcher<ApiResponse<SaveChatHistoryResponse>>("save_chat_history/", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating password:", error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to save chat history. Please try again." };
  }
}

export async function clearChatHistory() {
  try {
    await fetcher<ApiResponse<void>>("chats/history/delete-all/", {
      method: "DELETE",
    });

    revalidatePath("/chat");
    revalidatePath("/profile");
    revalidatePath("/chat/history");
    revalidatePath("/chat/archive");
  } catch (error) {
    console.error("Error clearing chat history:", error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to clear chat history. Please try again." };
  }
}

export async function deleteProfile() {
  try {
    const cookieStore = await cookies();

    // First delete the account via API
    await fetcher<ApiResponse<void>>("delete-account/", {
      method: "DELETE",
    });

    // Then clear the cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    // Revalidate relevant paths to clear any cached data
    revalidatePath("/profile");
    revalidatePath("/chat");

    // Redirect to home page
    redirect("/");
  } catch (error) {
    console.error("Error deleting profile:", error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to delete profile. Please try again." };
  }
}

export async function updateProfilePicture(file: File) {
  try {
    const formData = new FormData();
    formData.append("profile_pic", file);

    await fetcher<ApiResponse<void>>("profile/", {
      method: "PUT",
      body: formData,
    });

    revalidatePath("/chat");
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating profile picture:", error);
    if (error && typeof error === "object" && "message" in error) {
      return { error: (error as { message: string }).message };
    }
    return { error: "Failed to update profile picture. Please try again." };
  }
}
