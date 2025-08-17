"use client";
import { toast } from "sonner";
import { deleteProfile } from "./action";

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
import { useRouter } from "next/navigation";

export default function DeleteProfile() {
  const router = useRouter();

  const handleDeleteProfile = async () => {
    try {
      toast.promise(deleteProfile(), {
        loading: "Deleting profile...",
        success: "Profile deleted.",
        error: "Failed to delete profile.",
      });

      router.replace("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="cursor-pointer p-0 text-base font-medium hover:bg-transparent"
        >
          Delete Profile
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProfile}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  // (
  //   <button
  //     className="cursor-pointer p-0 font-medium"
  //     onClick={handleDeleteProfile}
  //   >
  //     Delete Profile
  //   </button>
  // );
}
