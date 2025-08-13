import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

export default function TermsServiceForm({
  onChange,
}: {
  onChange: (open: boolean) => void;
}) {
  return (
    <>
      <p className="text-muted-foreground mb-4 text-sm">
        By accessing and using our AI chatbot, you agree to follow the outlined
        terms and conditions. This includes using the chatbot responsibly,
        avoiding the sharing of personal or sensitive information, and
        understanding that the chatbot provides automated responses which may
        not always be accurate. We may collect limited non-personal usage data
        to improve the chatbot experience, but we do not store private
        conversations. Continued use of the chatbot implies acceptance of these
        terms, which may be updated periodically. If you have any concerns,
        please contact our support team.
      </p>

      <DialogFooter className="flex items-center gap-2">
        <DialogClose asChild className="flex-1">
          <Button
            type="button"
            className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 !text-background w-full"
            onClick={() => onChange(true)}
          >
            Accept
          </Button>
        </DialogClose>

        <DialogClose asChild className="flex-1">
          <Button
            type="button"
            className="bg-muted hover:bg-muted/80 focus-visible:ring-ring dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80 w-full border-2"
          >
            Decline
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
