"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordModal({ email }: { email?: string }) {
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
            Forgot Your Password?
          </DialogTitle>
          <DialogDescription className="dark:text-muted-foreground text-center text-xs font-normal text-white sm:text-sm md:text-base">
            Don’t worry! Enter your email, and we’ll send you instructions to
            reset your password.
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm isModal email={email} />
      </DialogContent>
    </Dialog>
  )
}
