import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "./action";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function useSignup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a promise that resolves with the actual result or rejects with user errors only
    const registerPromise = async () => {
      try {
        const result = await registerUser(values);

        if (result?.error) {
          // Set form errors for validation display
          form.setError("root", {
            type: "server",
            message: result.error,
          });
          form.resetField("password");
          form.clearErrors("email");
          form.clearErrors("password");
          form.setFocus("email");

          // Throw error so toast.promise shows it as error
          throw new Error(result.error);
        }

        // Success - clear form errors
        form.clearErrors();
        return "Registered successfully!";
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

    toast.promise(registerPromise(), {
      loading: "Creating account...",
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
