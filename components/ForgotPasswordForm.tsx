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
import { Input } from "@/components/ui/input";
import useForgotPassword from "@/hooks/use-forgot-password";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ForgotPasswordForm({
  email,
  isModal = false,
}: {
  email?: string;
  isModal?: boolean;
}) {
  const { form, onSubmit } = useForgotPassword(email);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
          <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
            Forgot Your Password?
          </h1>

          <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
            Don’t worry! Enter your email, and we’ll send you instructions to
            reset your password.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel
                className={cn("text-muted-foreground max-md:text-xs", {
                  "text-white": isModal,
                })}
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className={cn(
                    "outline-border border-border text-muted-foreground placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none",
                    { "text-white": isModal },
                  )}
                />
              </FormControl>

              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 w-full cursor-pointer text-sm font-semibold !text-black transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          size="lg"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Send Verification Code
        </Button>

        <div className="space-y-2">
          <p
            className={cn(
              "text-muted-foreground text-center text-sm max-md:text-xs",
              { "text-white": isModal },
            )}
          >
            <span> Don’t have an account? </span>
            <Link
              href="?modal=sign-up"
              replace
              className={cn("text-muted-foreground text-sm underline", {
                "text-white": isModal,
              })}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
