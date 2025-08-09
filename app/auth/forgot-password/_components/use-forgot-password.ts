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
    const sendEmailPromise = async () => {
      const result = await sendForgotPasswordEmail(values.email);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.setFocus("email");

        // Throw error so toast.promise shows it as error
        throw new Error(result.error);
      }

      // Success - clear form errors and return success message
      form.clearErrors();
      return result.message || "Password reset email sent successfully!";
    };

    const response = await toast.promise(sendEmailPromise(), {
      loading: "Sending password reset email...",
      success: (message) => message,
      error: (error) => {
        // Handle form state on error
        form.setFocus("email");
        return error instanceof Error
          ? error.message
          : "Failed to send password reset email";
      },
    });

    // Only redirect on success (when promise resolves)
    if (response) {
      const encodedEmail = btoa(values.email);
      router.replace(`/auth/verify-code?email=${encodedEmail}`);
    }
  }

  return { form, onSubmit };
}
