import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  variant: "destructive";
  message: string;
}

export default function ErrorMessage({
  variant = "destructive",
  message,
}: ErrorMessageProps) {
  return (
    <Alert variant={variant}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
