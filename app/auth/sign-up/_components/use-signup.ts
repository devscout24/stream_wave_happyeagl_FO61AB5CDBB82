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
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm_password: z.string().min(6, {
      message: "Confirm Password must be at least 6 characters.",
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
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("password");
        form.resetField("confirm_password");
        form.clearErrors("email");
        form.clearErrors("password");
        form.setFocus("email");
        throw new Error(result.error);
      }

      form.clearErrors();
      toast.success(
        "Registration successful! Please check your email to verify.",
      );
      router.push("/chat");
    } catch (error) {
      form.setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
      form.setFocus("email");
    } finally {
      toast.dismiss();
    }
  }

  return { form, onSubmit };
}
