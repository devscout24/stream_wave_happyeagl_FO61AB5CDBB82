"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordModal() {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="dark:text-muted-foreground bg-muted/5 dark:bg-muted w-[95%] max-w-md rounded-md border border-white bg-clip-padding p-6 text-white backdrop-blur-md backdrop-filter sm:max-w-lg sm:p-8 md:max-w-xl md:p-10 dark:border-none">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-muted-foreground text-4xl font-semibold">
            Change Password
          </DialogTitle>
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  )
}
