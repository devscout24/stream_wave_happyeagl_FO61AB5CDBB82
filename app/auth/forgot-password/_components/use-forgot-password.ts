import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { sendForgotPasswordEmail } from "./action";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export default function useForgotPassword(email?: string) {
  const router = useRouter();

  console.log("Email in useForgotPassword:", email);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Encode email to base64
    toast.promise(sendForgotPasswordEmail(values.email), {
      loading: "Sending password reset email...",
      success: (data) => {
        console.log("Email sent successfully:", data);
        return data.message;
      },
      error: (error) => {
        console.error("Error sending email:", error);
        return "Failed to send password reset email";
      },
    });
    // Redirect to verify code page with encoded email

    const encodedEmail = btoa(values.email);
    router.replace(`/auth/verify-code?email=${encodedEmail}`);
  }
  return { form, onSubmit };
}
