import { verifyCode } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: "OTP must be at least 4 characters.",
    })
    .max(4, {
      message: "OTP must be at most 4 characters.",
    }),
});

export default function useVerifyCode() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Verifying...");

    try {
      const result = await verifyCode(values);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("otp");

        // Show error toast
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // Success - clear form and show success
      form.clearErrors();
      toast.dismiss();
      toast.success("Verification successful!");

      // Close modal first, then redirect
      // router.back();
      setTimeout(() => {
        router.replace("?modal=change-password");
        router.refresh();
      }, 100); // Small delay to ensure modal closes first
    } catch (error) {
      // Handle actual errors only
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again.";

      form.setError("root", {
        type: "server",
        message: errorMessage,
      });
      form.resetField("otp");
      form.setFocus("otp");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }
  return { form, onSubmit };
}
