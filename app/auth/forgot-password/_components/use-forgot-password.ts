import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { sendForgotPasswordEmail } from "./action";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function useForgotPassword(email?: string) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Sending...");

    try {
      const result = await sendForgotPasswordEmail(values.email);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });

        form.clearErrors("email");
        form.setFocus("email");

        // Show error toast
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // Success - clear form and show success
      form.clearErrors();
      toast.dismiss();
      toast.success("Password reset email sent!");

      // Close modal first, then redirect
      router.back();
      setTimeout(() => {
        router.replace(
          `/auth/verify-code?email=${encodeURIComponent(values.email)}`,
        );
        router.refresh();
      }, 100); // Small delay to ensure modal closes first
    } catch (error) {
      // Handle actual errors only
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Password reset failed. Please try again.";

      form.setError("root", {
        type: "server",
        message: errorMessage,
      });
      form.resetField("email");
      form.setFocus("email");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return { form, onSubmit };
}
