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
      <DialogContent className="bg-opacity-20 text-muted-foreground w-full !max-w-xl rounded-md border bg-clip-padding p-10 backdrop-blur-md backdrop-filter">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-muted-foreground text-center text-4xl font-semibold">
            Hey there! Good to see you
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm font-normal">
            Log in to access your personalized dashboard.
          </DialogDescription>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
