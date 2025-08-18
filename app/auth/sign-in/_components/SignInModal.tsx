"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import SignInForm from "./SignInForm";

export default function SignInModal() {
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
          <DialogTitle className="dark:text-muted-foreground text-center text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            Hey there! Good to see you
          </DialogTitle>
          <DialogDescription className="dark:text-muted-foreground text-center text-sm font-normal text-white sm:text-base">
            Log in to access your personalized dashboard.
          </DialogDescription>
        </DialogHeader>
        <SignInForm isModal />
      </DialogContent>
    </Dialog>
  );
}
