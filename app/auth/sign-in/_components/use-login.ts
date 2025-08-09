import { loginUser } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.promise(loginUser(values), {
      loading: "Logging in...",
      success: (response) => {
        router.replace("/chat");
        return response.message || "Logged in successfully";
      },
      error: (error) => {
        console.error("Login error:", error);
        return "Failed to log in. Please try again.";
      },
    });
  }
  return { form, onSubmit };
}
