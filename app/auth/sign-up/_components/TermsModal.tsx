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

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMediaQuery } from "react-responsive";
import TermsServiceForm from "./TermsServiceForm";

export default function TermsModal({
  text,
  onChange,
}: {
  text: string;
  onChange: (open: boolean) => void;
}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
    }
  };

  return isDesktopOrLaptop ? (
    <Dialog>
      <DialogTrigger className="cursor-pointer underline" asChild>
        <Button variant="ghost" type="button" className="!m-0 !p-0">
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-muted-foreground bg-muted/5 dark:bg-muted w-full !max-w-xl rounded-md border bg-clip-padding p-10 backdrop-blur-md backdrop-filter dark:border-none">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-muted-foreground text-center text-2xl font-semibold">
            Review Our Terms & Conditions
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-lg font-normal">
            Please read our terms before continuing to use the chatbot service.
          </DialogDescription>
        </DialogHeader>
        <TermsServiceForm onChange={onChange} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DrawerContent className="bg-opacity-20 text-muted-foreground dark:bg-muted bg-muted/5 rounded-md border bg-clip-padding px-4 backdrop-blur-md backdrop-filter dark:border-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-muted-foreground text-center text-xl font-semibold">
            Hey there! Good to see you
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground text-center text-xs font-normal">
            Log in to access your personalized dashboard.
          </DrawerDescription>
        </DrawerHeader>
        {/* <TermsServiceForm  /> */}
        hello
      </DrawerContent>
    </Drawer>
  );
}
