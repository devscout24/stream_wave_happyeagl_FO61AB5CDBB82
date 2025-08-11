import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { changePassword } from "./action";

const formSchema = z
  .object({
    new_password: z.string().min(4, {
      message: "New password must be at least 6 characters.",
    }),
    confirm_password: z.string().min(4, {
      message: "Confirm password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
  });

export default function useChangePassword() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Registering...");

    try {
      const result = await changePassword(values);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("new_password");
        form.resetField("confirm_password");
        form.clearErrors("confirm_password");
        form.clearErrors("new_password");

        // Show error toast
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // Success - clear form and show success
      form.clearErrors();
      toast.dismiss();
      toast.success("Registration successful!");

      // Close modal first, then redirect
      router.back();
      setTimeout(() => {
        router.push("/auth/sign-in");
        router.refresh();
      }, 100); // Small delay to ensure modal closes first
    } catch (error) {
      // Handle actual errors only
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      form.setError("root", {
        type: "server",
        message: errorMessage,
      });
      form.resetField("new_password");
      form.resetField("confirm_password");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }
  return { form, onSubmit };
}
