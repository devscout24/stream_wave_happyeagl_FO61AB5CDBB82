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
import PasswordInput from "./PasswordInput";
import useLogin from "./use-login";

export default function SignInForm() {
  const { form, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="outline-border border-border placeholder:text-background text-background focus:border-none focus:ring-0"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your password"
                  {...field}
                  className="outline-border border-border placeholder:text-background text-background focus:border-none focus:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary w-full cursor-pointer"
          size="lg"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
