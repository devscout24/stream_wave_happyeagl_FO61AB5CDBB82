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
import useVerifyCode from "./use-verify-code";

export default function VerifyForm() {
  const { form, onSubmit } = useVerifyCode();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
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
