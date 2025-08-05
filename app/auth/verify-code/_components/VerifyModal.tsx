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

import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import VerifyForm from "./VerifyForm";

export default function VerifyModal({ email }: { email: string }) {
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
            Enter Verification Code
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-sm font-normal">
            enter the verification code sent to
          </DialogDescription>
          <DialogTitle className="text-muted-foreground flex items-center justify-center text-center text-xl font-semibold">
            {email}
            <Link
              href={`/auth/forgot-password?email=${btoa(email)}`}
              className="ml-2"
            >
              <Icon src="/pen.svg" className="ml-2 inline-block size-6" />
            </Link>
          </DialogTitle>
        </DialogHeader>
        <VerifyForm />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-opacity-20 text-muted-foreground dark:bg-muted bg-muted/5 rounded-md border bg-clip-padding px-4 backdrop-blur-md backdrop-filter dark:border-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-muted-foreground text-center text-xl font-semibold">
            Enter Verification Code?
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-center text-xs font-normal">
            enter the verification code sent to
          </DrawerDescription>
          <DrawerTitle className="text-muted-foreground flex items-center justify-center text-center text-lg font-semibold">
            {email}
            <Link
              href={`/auth/forgot-password?email=${btoa(email)}`}
              className="ml-2"
            >
              <Icon src="/pen.svg" className="ml-2 inline-block size-6" />
            </Link>
          </DrawerTitle>
        </DrawerHeader>
        <VerifyForm />
      </DrawerContent>
    </Drawer>
  );
}
