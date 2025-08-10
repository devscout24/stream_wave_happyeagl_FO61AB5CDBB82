import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "./action";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    confirm_password: z.string().min(4, {
      message: "Confirm Password must be at least 4 characters.",
    }),
    terms: z.boolean().optional(),
    privacy: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function useSignup() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      terms: false,
      privacy: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Registering...");

    try {
      const result = await registerUser(values);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("password");
        form.resetField("confirm_password");
        form.clearErrors("email");
        form.clearErrors("password");
        form.setFocus("email");

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
        router.push("/chat");
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
      form.resetField("password");
      form.resetField("confirm_password");
      form.setFocus("email");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return { form, onSubmit };
}
