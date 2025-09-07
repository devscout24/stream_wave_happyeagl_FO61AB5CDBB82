import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import TermsServiceForm from "./TermsServiceForm";

export default function TermsModal({
  text,
  onChange,
}: {
  text: string;
  onChange: (open: boolean) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer underline" asChild>
        <Button variant="ghost" type="button" className="!m-0 !p-0">
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="text-muted-foreground bg-background w-full !max-w-xl rounded-md border bg-clip-padding p-10 backdrop-blur-md backdrop-filter dark:border-none">
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
  );
}
