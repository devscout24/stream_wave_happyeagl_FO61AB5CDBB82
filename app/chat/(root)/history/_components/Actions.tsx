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
import useProvider from "../../Context/use-provider";
import { deleteAllHistory } from "./action";

export default function Action() {
  const { selectedChat } = useProvider();

  const handleArchiveToggle = async (condition: boolean) => {
    try {
      if (selectedChat.length > 0) {
        console.log("Do selected archived", selectedChat);
      } else {
        console.log("Do all archived");
      }
    } catch (error) {
      console.error("Failed to update archive state:", error);
    }
  };

  return (
    <div className="flex gap-6">
      <button title="All Archive" onClick={() => handleArchiveToggle(true)}>
        <Icon src="/archive2.svg" />
      </button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Icon src="/delete.svg" />
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
              onClick={() => deleteAllHistory()}
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
