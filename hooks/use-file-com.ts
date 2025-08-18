"use client";

import { useCustomContext } from "@/app/chat/[chatId]/_context/use-context";
import { sendChat } from "@/lib/actions";
import { Message } from "@/types";
import { IPInfoContext } from "ip-info-react";
import { useRouter } from "next/navigation";
import { startTransition, useContext } from "react";

export default function useFileCom({ chatId }: { chatId?: number }) {
  const userInfo = useContext(IPInfoContext);
  const contextValue = useCustomContext();
  const addOptimisticChat = contextValue?.addOptimisticChat;
  const router = useRouter();

  // Upload multiple files
  async function onUploadFiles(files: File[]) {
    if (!files || files.length === 0) return;

    const uploadedFilesData = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("location", `${userInfo.city},${userInfo.country_name}`);
      if (chatId) formData.append("chat_id", chatId.toString());

      // Add optimistic message
      if (chatId) {
        const optimisticFileMessage: Message = {
          id: Date.now() + Math.random(),
          chat: chatId,
          sender_type: "user",
          message_type: "file",
          file: file.name,
          created_at: new Date(),
        };

        if (addOptimisticChat) {
          startTransition(() => addOptimisticChat(optimisticFileMessage));
        }
      }

      try {
        // Send FormData instead of JSON
        const response = await sendChat({
          location: `${userInfo.city},${userInfo.country_name}`,
          chat_id: chatId ? chatId.toString() : undefined,
          file: file.name,
        });
        uploadedFilesData.push(response);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }

    return uploadedFilesData;
  }

  return { onUploadFiles };
}
