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
    confirm_password: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
    }),
    terms: z.boolean().refine((val) => val, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function useSignup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const registerPromise = async () => {
      const result = await registerUser(values);

      if (result?.error) {
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("password");
        form.clearErrors("email");
        form.clearErrors("password");
        form.setFocus("email");
        throw new Error(result.error);
      }

      form.clearErrors();
      return "Registered successfully!";
    };

    toast.promise(registerPromise(), {
      loading: "Creating account...",
      success: (message) => message,
      error: (error) => {
        form.resetField("password");
        form.setFocus("email");
        return error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      },
    });
  }

  return { form, onSubmit };
}
