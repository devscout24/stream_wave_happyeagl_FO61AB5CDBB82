import { appointmentChatSession, openChatSession } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const chat_id = searchParams.get("chat_id");
  console.log("🚀 ~ useAppointment ~ chat_id:", chat_id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  console.log("🚀 ~ useAppointment ~ messages:", messages);

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
    setIsLoading(true);
    if (!values.body?.trim() || !chat_id) return;

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
      const result = await appointmentChatSession({
        chat_id,
        body: values.body,
      });
      console.log("🚀 ~ onSubmit ~ result:", result);

      if (result && result.message) {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: result.message,
          createdAt: new Date(),
          isUser: false,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }

      if (result?.next_action === "confirm" && result?.picked_expert_id) {
        // Handle completed state
        router.push(
          `?modal=appointment&booked=appointment&expert_id=${result.picked_expert_id}&session_id=${result.session_id}`,
        );
      }
    } catch (error) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchInitialMessagesRef = useRef(false);

  useEffect(() => {
    const hasFetched = fetchInitialMessagesRef.current;
    if (hasFetched) return;
    fetchInitialMessagesRef.current = true;

    async function fetchInitialMessages() {
      const result = await openChatSession();
      console.log("🚀 ~ fetchInitialMessages ~ result:", result);

      if (result) {
        if (
          (typeof result.id === "string" || typeof result.id === "number") &&
          typeof result.message === "string"
        ) {
          setMessages([
            {
              id: String(result.id), // Convert to string
              content: result.message,
              createdAt: new Date(),
              isUser: false,
            },
          ]);

          router.push(`?modal=appointment&chat_id=${result.id}`);
        }
      }
    }

    fetchInitialMessages();
  }, [router]);

  return {
    form,
    onSubmit,
    messages,
    isLoading,
    streamingMessage,
    setStreamingMessage,
  };
}
