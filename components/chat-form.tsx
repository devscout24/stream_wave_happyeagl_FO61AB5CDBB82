"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChatForm from "@/hooks/use-chat-form";
import { ShieldAlert } from "lucide-react";

export default function ChatForm({ chatId }: { chatId?: number }) {
  const { form, onSubmit } = useChatForm({ chatId });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="relative">
              <Button
                type="button"
                variant="ghost"
                className="absolute top-1/2 left-4 -translate-y-1/2 transform cursor-pointer hover:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-white"
                disabled={form.formState.isSubmitting}
              >
                <Icon src="/attachment.svg" />
              </Button>
              <FormControl>
                <Input
                  placeholder="Describe your thought"
                  {...field}
                  className="bg-input text-foreground placeholder:text-foreground py-4 pl-14 text-sm shadow-xl placeholder:text-sm lg:rounded-[20px] lg:py-9 lg:text-lg placeholder:lg:text-lg dark:border-none"
                />
              </FormControl>

              <Button
                type="submit"
                variant="ghost"
                className="text-input bg-foreground hover:bg-foreground hover:text-input dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer max-lg:size-6 max-lg:rounded-sm"
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
        <p className="text-paragraph flex items-start justify-center gap-1 text-center font-normal md:items-center">
          <ShieldAlert
            size={16}
            strokeWidth={1.5}
            className="text-paragraph max-sm:h-8 max-sm:w-8"
          />
          <span className="text-xs md:text-sm">
            This AI may occasionally generate incorrect or incomplete answers.
            Always verify important information.
          </span>
        </p>
      </form>
    </Form>
  );
}
