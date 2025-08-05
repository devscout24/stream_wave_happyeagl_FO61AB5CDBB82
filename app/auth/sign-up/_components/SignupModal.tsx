"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import SignupForm from "./SignupForm";

export default function SignupModal() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return isDesktopOrLaptop ? (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="text-muted-foreground bg-muted/5 dark:bg-muted w-full !max-w-xl rounded-md border bg-clip-padding p-10 backdrop-blur-md backdrop-filter dark:border-none">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-muted-foreground text-center text-4xl font-semibold">
            Create Your Account
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm font-normal">
            Join the future of smart conversations — chat with your AI assistant
            anytime, anywhere.
          </DialogDescription>
        </DialogHeader>
        <SignupForm />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-opacity-20 text-muted-foreground dark:bg-muted bg-muted/5 rounded-md border bg-clip-padding px-4 backdrop-blur-md backdrop-filter dark:border-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-muted-foreground text-center text-xl font-semibold">
            Create Your Account
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-center text-xs font-normal">
            Join the future of smart conversations — chat with your AI assistant
            anytime, anywhere.
          </DrawerDescription>
        </DrawerHeader>
        <SignupForm />
      </DrawerContent>
    </Drawer>
  );
}
