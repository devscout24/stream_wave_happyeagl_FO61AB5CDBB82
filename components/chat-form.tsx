"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
});

type FormData = z.infer<typeof formSchema>;

export function ChatForm() {
  const [messages, setMessages] = useState<
    { text: string; timestamp: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const timestamp = format(new Date(), "h:mm:ss a");
    setMessages((prev) => [...prev, { text: data.message, timestamp }]);
    reset();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <textarea
            {...register("message")}
            placeholder="Type your message here..."
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {messages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Messages:</h4>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-muted rounded-md border p-3 text-sm"
              >
                <p>{message.text}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Sent at {message.timestamp}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
