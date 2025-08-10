import { Button } from "@/components/ui/button";

export default function TermsServiceForm({
  onChange,
  value,
}: {
  onChange: (open: boolean) => void;
  value: boolean;
}) {
  return (
    <>
      <p>
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

      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => onChange(!value)}
          className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 mt-4 w-full flex-1"
        >
          Accept
        </Button>

        <Button
          type="button"
          onClick={() => onChange(false)}
          className="bg-muted hover:bg-muted/80 focus-visible:ring-ring dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80 mt-2 w-full flex-1"
        >
          Decline
        </Button>
      </div>
    </>
  );
}
