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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // Encode email to base64
    toast.success("OTP verified successfully!");

    router.replace("/auth/change-password");
  }
  return { form, onSubmit };
}
