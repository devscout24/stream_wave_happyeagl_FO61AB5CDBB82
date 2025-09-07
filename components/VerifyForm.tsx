"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useVerifyCode from "../hooks/use-verify-code";
import Icon from "./Icon";

export default function VerifyForm() {
  const { form, onSubmit } = useVerifyCode();
  const searchParams = useSearchParams();
  const encodedEmail = searchParams.get("email") || "";
  const email = atob(encodedEmail);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
          <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
            Enter Verification Code
          </h1>
          <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
            enter the verification code sent to
          </p>
          <h1 className="text-muted-foreground flex items-center justify-center gap-2 text-center text-xl font-semibold">
            {email}
            <Link
              href={`?modal=forgot-password&email=${encodedEmail}`}
              className="ml-2"
            >
              <Icon src="/pen.svg" className="ml-2 inline-block size-6" />
            </Link>
          </h1>
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className="text-muted-foreground max-md:text-xs">
                OTP
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className="flex w-full justify-between">
                    <InputOTPSlot
                      index={0}
                      className="h-20 w-18 rounded-md text-6xl" // caret-4 increases cursor thickness, caret-primary sets color
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-20 w-18 rounded-md text-6xl"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-20 w-18 rounded-md text-6xl"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-20 w-18 rounded-md text-6xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 w-full cursor-pointer text-sm font-semibold !text-black transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          size="lg"
        >
          Verify
        </Button>

        <div className="space-y-2">
          <p className="text-muted-foreground text-center text-sm max-md:text-xs">
            <Link
              href="/auth/sign-up"
              replace
              className="text-muted-foreground text-sm underline"
            >
              Didn’t receive code?
            </Link>
          </p>

          <p className="text-muted-foreground text-center text-sm max-md:text-xs">
            Resend: 00.30
          </p>
        </div>
      </form>
    </Form>
  );
}
