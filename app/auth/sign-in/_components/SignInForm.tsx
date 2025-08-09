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

export default function SignInForm() {
  const { form, onSubmit } = useLogin();
  console.log(form.formState.errors);

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
                        className="text-muted-foreground mr-1 size-4 cursor-pointer md:size-5"
                        onClick={() => field.onChange(false)}
                      />
                    ) : (
                      <Icon
                        src="/unchecked.svg"
                        className="text-muted-foreground mr-1 size-4 cursor-pointer md:size-5"
                        onClick={() => field.onChange(true)}
                      />
                    )}
                  </FormControl>
                  <FormDescription
                    className="text-muted-foreground cursor-pointer max-md:text-xs"
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
            replace
            className="text-muted-foreground ml-auto text-sm underline max-md:text-xs"
          >
            Forgot password?
          </Link>
        </div>

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
          Log In
        </Button>

        <div className="space-y-2">
          <p className="text-muted-foreground text-center text-sm max-md:text-xs">
            <span> Don&apos;t have an account? </span>
            <Link
              href="/auth/sign-up"
              replace
              className="text-muted-foreground text-sm underline"
            >
              Sign up
            </Link>
          </p>

          <Link
            href="/auth/logout"
            className="text-muted-foreground block text-center text-sm underline max-md:text-xs"
          >
            Stay Logged Out?
          </Link>
        </div>

        <p className="text-muted-foreground text-center text-sm max-sm:text-xs">
          By continuing, you accept the{" "}
          <Link href="/auth/terms" className="text-muted-foreground underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/auth/privacy"
            className="text-muted-foreground underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </Form>
  );
}
