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
import useProvider from "../../Context/use-provider";
import { bulkUnarchive, deleteArchive } from "./action";

export default function ActionArchive() {
  const { selectedChat: chat_ids } = useProvider();

    const handleArchiveToggle = async (condition: boolean) => {

    try {
      const res = await bulkUnarchive({
        chat_ids,
        archive: condition,
      });
      console.log("the response",res);
    } catch (error) {
      console.error("Failed to update archive state:", error);
    }
  };

    const handleDelete = async () => {
      try {
      await deleteArchive(chat_ids);
      console.log("Chats deleted successfully");
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
    };

  return (
    <div className="flex gap-6">
      <Button
        disabled={chat_ids.length === 0}
        title="Unarchive"
        onClick={() => handleArchiveToggle(false)}
      >
        <Icon src="/unarchive.svg" className="size-[32px]" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={chat_ids.length === 0}>
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
