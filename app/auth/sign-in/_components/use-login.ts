import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginUser } from "./action";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
});

export default function useLogin() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Logging in...");

    try {
      const result = await loginUser(values);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("password");
        form.clearErrors("email");
        form.clearErrors("password");
        form.clearErrors("rememberMe");
        form.setFocus("email");

        // Show error toast
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // If we reach here, success but no redirect yet - clear form and show success
      form.clearErrors();
      toast.dismiss();
      toast.success("Logged in successfully!");
      router.replace("/chat");
      router.refresh();
    } catch (error) {
      // Handle actual errors only
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";

      form.setError("root", {
        type: "server",
        message: errorMessage,
      });
      form.resetField("password");
      form.setFocus("email");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return { form, onSubmit };
}
