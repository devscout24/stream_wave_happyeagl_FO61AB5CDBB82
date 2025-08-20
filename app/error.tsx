"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <Icon src="/not-found.svg" className="mb-6 h-24 w-24" />
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-accent mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Dialog defaultOpen={true} open={true}>
        <DialogContent className="bg-muted/5 dark:bg-muted dark:text-muted-foreground border-white text-white sm:max-w-md sm:p-6 md:max-w-lg md:p-8 lg:max-w-xl lg:p-10 w-full !max-w-xl rounded-md border bg-clip-padding p-10 backdrop-blur-md backdrop-filter dark:border-none">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-white text-center text-4xl font-semibold">
              Oops! Looks like this page went missing.
            </DialogTitle>
            <DialogDescription className="text-white text-center text-sm font-normal">
              {error?.message ||
                "Don’t worry! Enter your email, and we’ll send you instructions to reset your password."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Link
                href="/"
                className="bg-primary hover:bg-primary/80 rounded px-4 py-2 text-accent transition"
              >
                Go Home
              </Link>
            </DialogClose>

            <DialogClose>
              <Button
                onClick={() => reset()}
                className="bg-primary hover:bg-primary/80 rounded px-4 py-2 text-accent transition"
              >
                Try Again
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
