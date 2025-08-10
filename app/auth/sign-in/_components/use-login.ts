import { zodResolver } from "@hookform/resolvers/zod";
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
    // Create a promise that resolves with the actual result or rejects with user errors only
    const loginPromise = async () => {
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

          // Throw error so toast.promise shows it as error
          throw new Error(result.error);
        }

        // Success - clear form errors
        form.clearErrors();
        return "Logged in successfully!";
      } catch (error) {
        // Check if it's a NEXT_REDIRECT error (successful redirect)
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          // This is actually success - clear form and return success
          form.clearErrors();
          return "Logged in successfully!";
        }
        // Re-throw actual errors
        throw error;
      }
    };

    toast.promise(loginPromise(), {
      loading: "Logging in...",
      success: (message) => message,
      error: (error) => {
        // Handle form state on error
        form.resetField("password");
        form.setFocus("email");
        return error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      },
    });
  }

  return { form, onSubmit };
}

// In your server action (loginUser)
// Move this catch block into the actual loginUser function implementation in ./action if needed.
// Remove this invalid standalone catch block.
