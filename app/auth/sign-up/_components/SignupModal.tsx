"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import SignupForm from "./SignupForm";

export default function SignupModal() {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-muted/5 dark:bg-muted dark:text-muted-foreground w-[95%] max-w-sm rounded-xl border border-white bg-clip-padding p-4 text-white backdrop-blur-md backdrop-filter sm:max-w-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl lg:p-10 dark:border-none">
        <DialogHeader className="space-y-3">
          <DialogTitle className="dark:text-muted-foreground text-center text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-4xl">
            Create Your Account
          </DialogTitle>
          <DialogDescription className="dark:text-muted-foreground text-center text-xs font-normal text-white sm:text-sm md:text-base">
            Join the future of smart conversations — chat with your AI assistant
            anytime, anywhere.
          </DialogDescription>
        </DialogHeader>

        <SignupForm isModal />
      </DialogContent>
    </Dialog>
  );
}
