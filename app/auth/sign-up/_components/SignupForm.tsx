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
import dynamic from "next/dynamic";
import Link from "next/link";
import useSignup from "./use-signup";

// Replace any import of TermsModal with:
const TermsModal = dynamic(() => import("./TermsModal"), {
  ssr: false,
  loading: () => <span>Loading...</span>, // Optional loading placeholder
});

export default function SignupForm() {
  const { form, onSubmit } = useSignup();

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
              <FormLabel className="text-muted-foreground max-md:text-xs">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="outline-border border-border text-muted-foreground placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none"
                />
              </FormControl>

              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className="text-muted-foreground max-md:text-xs">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  className="outline-border border-border text-muted-foreground placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none"
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className="text-muted-foreground max-md:text-xs">
                Confirm Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password again"
                  {...field}
                  className="outline-border border-border text-muted-foreground placeholder:text-muted-foreground/30 focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none"
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        {form.formState.errors?.root?.message && (
          <ErrorMessage
            variant="destructive"
            message={form.formState.errors.root.message}
          />
        )}

        <Button
          type="submit"
          className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-primary dark:text-muted-foreground dark:hover:bg-primary/80 w-full cursor-pointer text-sm font-semibold !text-black transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          size="lg"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Create account
        </Button>

        <div className="text-muted-foreground text-center text-sm max-md:text-xs">
          <span> Already have an account? </span>
          <Link
            href="/auth/sign-in"
            replace
            className="text-muted-foreground text-sm underline"
          >
            Sign In
          </Link>
        </div>

        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-1 text-center text-sm max-sm:text-xs">
          <span>By continuing, you accept the&nbsp;</span>
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="space-y-1 md:space-y-3">
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
              <FormItem className="space-y-1 md:space-y-3">
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
