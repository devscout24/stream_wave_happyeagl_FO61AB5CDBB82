"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChatForm from "@/hooks/use-chat-form";
import { ShieldAlert } from "lucide-react";

export default function ChatForm() {
  const { form, onSubmit } = useChatForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="relative">
              <Button
                type="button"
                variant="ghost"
                className="absolute top-1/2 left-4 -translate-y-1/2 transform cursor-pointer hover:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-white"
              >
                <Icon src="/attachment.svg" />
              </Button>
              <FormControl>
                <Input
                  placeholder="Describe your thought"
                  {...field}
                  className="bg-input text-foreground placeholder:text-foreground rounded-2xl py-7 pl-14 text-sm placeholder:text-sm lg:py-8 lg:text-lg placeholder:lg:text-lg"
                />
              </FormControl>

              <Button
                type="submit"
                variant="ghost"
                className="text-input bg-foreground hover:bg-foreground hover:text-input dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
              >
                <Icon src="/sent.svg" />
              </Button>
            </FormItem>
          )}
        />
        <p className="text-muted-foreground flex items-start justify-center gap-1 text-center text-xs font-normal md:items-center md:text-sm">
          <ShieldAlert
            size={16}
            strokeWidth={1.5}
            className="max-sm:h-8 max-sm:w-8"
          />
          This AI may occasionally generate incorrect or incomplete answers.
          Always verify important information.
        </p>
      </form>
    </Form>
  );
}
