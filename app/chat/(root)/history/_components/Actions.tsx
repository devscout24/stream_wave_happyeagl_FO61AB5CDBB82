"use client";

import Icon from "@/components/Icon";
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
import { Button } from "@/components/ui/btn";
import { toast } from "sonner";
import useProvider from "../../Context/use-provider";
import { bulkArchive, deleteHistory } from "./action";

export default function Action() {
  const { selectedHistoryChat: chat_ids } = useProvider();

  const handleArchiveToggle = async (condition: boolean) => {
    try {
      toast.promise(
        bulkArchive({
          chat_ids,
          archive: condition,
        }),
        {
          loading: "Updating...",
          success: condition
            ? "Chat archived successfully!"
            : "Chat unarchive successfully!",
          error: "Failed to update archive state.",
        },
      );
    } catch (error) {
      console.error("Failed to update archive state:", error);
    }
  };

  const handleDelete = async () => {
    try {
      toast.promise(deleteHistory(chat_ids), {
        loading: "Deleting...",
        success: "Chats deleted successfully",
        error: "Failed to delete chats",
      });
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
  };

  return (
    <div className="flex gap-6">
      <Button
        disabled={chat_ids.length === 0}
        title="All Archive"
        onClick={() => handleArchiveToggle(true)}
        className="cursor-pointer disabled:cursor-not-allowed"
      >
        <Icon src="/archive2.svg" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={chat_ids.length === 0}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            <Icon src="/delete.svg" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Delete all history permanently?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
