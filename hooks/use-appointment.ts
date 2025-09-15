import { openChatSession } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  body: z.string().min(1, "Message cannot be empty"),
  isUser: z.literal(true).optional(),
  createdAt: z.date().optional(),
});

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  isUser: boolean;
  isOptimistic?: boolean;
};

export default function useAppointment() {
  const [messages, setMessages] = useState<Message[]>([
    // {
    //   id: "initial",
    //   content:
    //     "Hello! I'm here to help you book an appointment. What would you like to schedule?",
    //   createdAt: new Date(),
    //   isUser: false,
    // },
  ]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      isUser: true,
      createdAt: new Date(),
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.body?.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: values.body,
      createdAt: new Date(),
      isUser: true,
      isOptimistic: true,
    };

    // Optimistic update - add user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear form
    form.reset();

    try {
      // Simulate API call for appointment booking
      // Replace this with your actual API call
      const response = await new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(
            "Thank you for your message! I'll help you schedule an appointment. What type of appointment are you looking for?",
          );
        }, 1000);
      });

      // Remove optimistic flag and add AI response
      setMessages((prev) => [
        ...prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, isOptimistic: false } : msg,
        ),
        {
          id: `ai-${Date.now()}`,
          content: response,
          createdAt: new Date(),
          isUser: false,
        },
      ]);
    } catch (error) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      console.error("Failed to send message:", error);
    }
  }

  useEffect(() => {
    async function fetchInitialMessages() {
      const result = await openChatSession();
      console.log("🚀 ~ fetchInitialMessages ~ result:", result);
      if (result) {
        if (
          typeof result.id === "string" &&
          typeof result.message === "string"
        ) {
          setMessages((prev) => [
            ...prev,
            {
              id: result.id,
              content: result.message,
              createdAt: new Date(),
              isUser: false,
            },
          ]);
        }
      }
    }

    fetchInitialMessages();
  }, []);

  return { form, onSubmit, messages };
}
