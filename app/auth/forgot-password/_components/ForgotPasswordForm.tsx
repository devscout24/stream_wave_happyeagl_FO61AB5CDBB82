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
import Link from "next/link";
import useForgotPassword from "./use-forgot-password";
import { cn } from "@/lib/utils";

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
                    { "text-white": isModal }
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
              { "text-white": isModal }
            )}
          >
            <span> Don’t have an account? </span>
            <Link
              href="/auth/sign-up"
              replace
              className={cn(
                "text-muted-foreground text-sm underline",
                { "text-white": isModal }
              )}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
