"use client";

import { UseFormReturn } from "react-hook-form";
import Icon from "./Icon";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

type FormData = {
  body: string;
};

interface AppointmentChatFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (values: FormData) => Promise<void>;
}

export default function AppointmentChatForm({
  form,
  onSubmit,
}: AppointmentChatFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-2">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="relative">
              {/* Attachment Button - Only show when no files are present */}

              <FormControl>
                <Input
                  placeholder="Ask anything..."
                  {...field}
                  className={`bg-input text-foreground placeholder:text-foreground py-4 text-sm shadow-xl placeholder:text-sm lg:rounded-[16px] lg:py-6 lg:text-lg placeholder:lg:text-lg dark:border-none`}
                />
              </FormControl>

              <Button
                type="submit"
                variant="ghost"
                className="text-input bg-foreground hover:bg-foreground hover:text-input dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary absolute top-1/2 right-4 z-10 -translate-y-1/2 transform cursor-pointer max-lg:size-6 max-lg:rounded-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <svg
                    className="text-foreground mr-3 size-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <Icon src="/sent.svg" className="size-4" />
                )}
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
