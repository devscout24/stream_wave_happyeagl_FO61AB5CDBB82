import { resendVerificationCode, verifyCode } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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

const RESEND_TIMER_KEY = "verify_code_resend_timer";
const RESEND_COOLDOWN = 30; // 30 seconds

export default function useVerifyCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(true);

  // Initialize timer from localStorage
  useEffect(() => {
    const savedEndTime = localStorage.getItem(RESEND_TIMER_KEY);
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

      if (remaining > 0) {
        setTimeLeft(remaining);
        setCanResend(false);
      } else {
        localStorage.removeItem(RESEND_TIMER_KEY);
      }
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            localStorage.removeItem(RESEND_TIMER_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Start resend timer
  const startResendTimer = useCallback(() => {
    const endTime = Date.now() + RESEND_COOLDOWN * 1000;
    localStorage.setItem(RESEND_TIMER_KEY, endTime.toString());
    setTimeLeft(RESEND_COOLDOWN);
    setCanResend(false);
  }, []);

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Resend verification code function
  const resendCode = useCallback(async () => {
    if (!canResend) return;

    const encodedEmail = searchParams.get("email") || "";
    if (!encodedEmail) {
      toast.error("Email not found. Please try again.");
      return;
    }

    const email = atob(encodedEmail);
    toast.loading("Resending verification code...");

    try {
      const result = await resendVerificationCode(email);

      if (result?.error) {
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      startResendTimer();
      toast.dismiss();
      toast.success(result?.message || "Verification code sent!");
    } catch (error) {
      console.error("Failed to resend code:", error);
      toast.dismiss();
      toast.error("Failed to resend code. Please try again.");
    }
  }, [canResend, startResendTimer, searchParams]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Verifying...");

    try {
      const result = await verifyCode(values);

      if (result?.error) {
        // Set form errors for validation display
        form.setError("root", {
          type: "server",
          message: result.error,
        });
        form.resetField("otp");

        // Show error toast
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // Success - clear form and show success
      form.clearErrors();
      toast.dismiss();
      toast.success("Verification successful!");

      // Close modal first, then redirect
      // router.back();
      setTimeout(() => {
        router.replace("?modal=change-password");
        router.refresh();
      }, 100); // Small delay to ensure modal closes first
    } catch (error) {
      // Handle actual errors only
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again.";

      form.setError("root", {
        type: "server",
        message: errorMessage,
      });
      form.resetField("otp");
      form.setFocus("otp");

      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return {
    form,
    onSubmit,
    timeLeft,
    canResend,
    formatTime,
    resendCode,
  };
}
