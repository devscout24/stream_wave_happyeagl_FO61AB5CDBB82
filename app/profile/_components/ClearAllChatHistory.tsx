"use client";

import { toast } from "sonner";
import { clearChatHistory } from "./action";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function ClearAllChatHistory() {
  const handleClearHistory = async () => {
    try {
      toast.promise(clearChatHistory(), {
        loading: "Clearing...",
        success: "Chat history cleared.",
        error: "Failed to clear chat history.",
      });
    } catch (error) {
      console.error("Error clearing chat history:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer p-0 text-base font-medium hover:bg-transparent"
        >
          Clear Chat History
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all chat
            history and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClearHistory}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // return (
  //   <button
  //     className="cursor-pointer p-0 font-medium"
  //     onClick={handleClearHistory}
  //   >
  //     Clear Chat History
  //   </button>
  // );
}
