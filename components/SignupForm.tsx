"use client";

import ErrorMessage from "@/components/ErrorMessage";
import PasswordInput from "@/components/PasswordInput";
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
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import useSignup from "../hooks/use-signup";

// Lazy load TermsModal
const TermsModal = dynamic(() => import("./TermsModal"), {
  ssr: false,
  loading: () => <span>Loading...</span>,
});

export default function SignupForm({ isModal = false }: { isModal?: boolean }) {
  const { form, onSubmit } = useSignup();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <div className="container mx-auto max-w-xl space-y-3 max-md:px-2 md:space-y-5">
          <h1 className="text-muted-foreground text-center text-xl font-semibold md:text-2xl lg:text-4xl">
            Create Your Account
          </h1>

          <p className="text-muted-foreground mb-10 text-center text-xs font-normal md:text-sm">
            Join the future of smart conversations — chat with your AI assistant
            anytime, anywhere.
          </p>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel
                className={cn("max-md:text-xs", {
                  "text-white": isModal,
                  "text-muted-foreground": !isModal,
                })}
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className={cn(
                    "outline-border border-border placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none",
                    {
                      "text-white": isModal,
                      "text-muted-foreground": !isModal,
                    },
                  )}
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel
                className={cn("max-md:text-xs", {
                  "text-white": isModal,
                  "text-muted-foreground": !isModal,
                })}
              >
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  className={cn(
                    "outline-border border-border placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none",
                    {
                      "text-white": isModal,
                      "text-muted-foreground": !isModal,
                    },
                  )}
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel
                className={cn("max-md:text-xs", {
                  "text-white": isModal,
                  "text-muted-foreground": !isModal,
                })}
              >
                Confirm Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password again"
                  {...field}
                  className={cn(
                    "outline-border border-border placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none",
                    {
                      "text-white": isModal,
                      "text-muted-foreground": !isModal,
                    },
                  )}
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {form.formState.errors?.root?.message && (
          <ErrorMessage
            variant="destructive"
            message={form.formState.errors.root.message}
          />
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 w-full cursor-pointer text-sm font-semibold !text-black transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          size="lg"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Create account
        </Button>

        {/* Already have an account? */}
        <div
          className={cn("text-center text-sm max-md:text-xs", {
            "text-white": isModal,
            "text-muted-foreground": !isModal,
          })}
        >
          <span> Already have an account? </span>
          <Link
            href="?modal=sign-in"
            replace
            className={cn("text-sm underline", {
              "text-white": isModal,
              "text-muted-foreground": !isModal,
            })}
          >
            Sign In
          </Link>
        </div>

        {/* Terms & Privacy */}
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-1 text-center text-sm max-sm:text-xs",
            {
              "text-white": isModal,
              "text-muted-foreground": !isModal,
            },
          )}
        >
          <span>By continuing, you accept the&nbsp;</span>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TermsModal
                    text="Terms of Service"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
          <span>&nbsp;and&nbsp;</span>
          <FormField
            control={form.control}
            name="privacy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TermsModal text="Privacy Policy" onChange={field.onChange} />
                </FormControl>
                <FormMessage className="max-md:text-xs" />
              </FormItem>
            )}
          />
          <span>.</span>
        </div>
      </form>
    </Form>
  );
}
