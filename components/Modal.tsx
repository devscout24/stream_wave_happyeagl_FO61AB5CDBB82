"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

interface ModalProps {
  modalId: string;
  openId: string;
  className?: string;
}

export default function Modal({
  openId,
  modalId,
  children,
  className,
}: PropsWithChildren<ModalProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get(modalId);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Reset form or perform any other action on close
      // if (modal) router.back();

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: modalId,
        value: modal,
      });

      // replace URL without scrolling
      router.replace(newUrl || "/", { scroll: false });
    } else {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [modalId],
      });

      // replace URL without scrolling
      router.replace(newUrl || "/", { scroll: false });
    }
  };

  return (
    <Dialog open={modal === openId} onOpenChange={handleOpenChange}>
      <DialogTitle hidden />
      <DialogContent className="px-0 sm:max-w-[600px]">
        <ScrollArea className={cn("max-h-[90dvh]", className)}>
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function useModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const close = (modalId: string) => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: [modalId],
    });

    // replace URL without scrolling
    router.replace(newUrl || "/", { scroll: false });
  };

  return { close };
}
