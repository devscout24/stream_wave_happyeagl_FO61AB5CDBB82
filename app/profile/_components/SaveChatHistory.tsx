"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { saveChatHistory } from "./action";

interface SaveChatHistoryProps {
  isSaveChatHistory?: boolean;
}

export default function SaveChatHistory({
  isSaveChatHistory,
}: SaveChatHistoryProps) {
  const handleSaveHistory = async (checked: boolean) => {
    try {
      toast.promise(saveChatHistory({ save_chat_history: checked }), {
        loading: "Saving...",
        success: "Chat history saved.",
        error: "Failed to save chat history.",
      });
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  return (
    <Switch
      checked={isSaveChatHistory}
      onCheckedChange={handleSaveHistory}
      className="cursor-pointer"
    />
  );
}
