"use client";

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
import { useRouter } from "next/navigation";
import useChangePassword from "./use-change-password";

export default function ChangePasswordForm() {
  const { form, onSubmit } = useChangePassword();

  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className="text-muted-foreground max-md:text-xs">
                New Password
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1 md:space-y-3">
              <FormLabel className="text-muted-foreground max-md:text-xs">
                Confirm New Password
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

        <div className="flex w-full items-center justify-between gap-4">
          <Button
            type="submit"
            className="bg-secondary hover:bg-secondary/80 focus-visible:ring-ring dark:bg-secondary dark:text-muted-foreground dark:hover:bg-primary/80 flex-1 cursor-pointer text-sm font-semibold !text-black transition-colors hover:text-black focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            size="lg"
          >
            Update
          </Button>

          <Button
            type="button"
            className="bg-foreground text-background hover:bg-foreground/80 focus-visible:ring-ring dark:bg-primary dark:text-background dark:hover:bg-primary/80 hover:text-background flex-1 cursor-pointer text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            size="lg"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
