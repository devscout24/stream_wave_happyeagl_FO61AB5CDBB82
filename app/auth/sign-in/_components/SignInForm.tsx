"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Icon from "@/components/Icon";
import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import useLogin from "./use-login";
import { cn } from "@/lib/utils";

export default function SignInForm({ isModal = false }: { isModal?: boolean }) {
  const { form, onSubmit } = useLogin();

  // 🔹 Base text color depending on modal or not
  const baseText = isModal ? "text-white" : "text-muted-foreground";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className={cn(baseText, "max-md:text-xs")}>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className={cn(
                    baseText,
                    "outline-border border-border focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none"
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
              <FormLabel className={cn(baseText, "max-md:text-xs")}>
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  className={cn(
                    baseText,
                    "outline-border border-border focus:border-none focus:ring-0 max-md:placeholder:text-xs dark:border-none dark:outline-none"
                  )}
                />
              </FormControl>
              <FormMessage className="max-md:text-xs" />
            </FormItem>
          )}
        />

        {/* Remember me + Forgot password */}
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormControl>
                    {field.value ? (
                      <Icon
                        src="/check-box.svg"
                        className={cn(
                          baseText,
                          "mr-1 size-4 cursor-pointer md:size-5"
                        )}
                        onClick={() => field.onChange(false)}
                      />
                    ) : (
                      <Icon
                        src="/unchecked.svg"
                        className={cn(
                          baseText,
                          "mr-1 size-4 cursor-pointer md:size-5"
                        )}
                        onClick={() => field.onChange(true)}
                      />
                    )}
                  </FormControl>
                  <FormDescription
                    className={cn(baseText, "cursor-pointer max-md:text-xs")}
                    onClick={() => field.onChange(!field.value)}
                  >
                    Remember me
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className={cn(baseText, "ml-auto text-sm underline max-md:text-xs")}
          >
            Forgot password?
          </Link>
        </div>

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
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Log In
        </Button>

        {/* Links */}
        <div className="space-y-2">
          <p className={cn(baseText, "text-center text-sm max-md:text-xs")}>
            <span>Don&apos;t have an account? </span>
            <Link href="/auth/sign-up" replace className={cn(baseText, "underline")}>
              Sign up
            </Link>
          </p>

          <Link
            href="/"
            className={cn(baseText, "block text-center text-sm underline max-md:text-xs")}
          >
            Stay Logged Out?
          </Link>
        </div>
      </form>
    </Form>
  );
}
