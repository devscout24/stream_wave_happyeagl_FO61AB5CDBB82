import { sendChat } from "@/lib/actions";
import { ChatResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  body: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface ChatFormProps {
  content: string;
  location: string;
}

export default function useChatForm() {
  const userInfo = useContext(IPInfoContext);
  const [chats, setChats] = useState<ChatResponse[]>([]);

  console.log("useChatForm - current chats:", chats, "length:", chats.length);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);

    const prompt: ChatFormProps = {
      content: values.body,
      location: `${userInfo.city},${userInfo.country_name}`,
    };

    // 1. Add user message optimistically
    const userMessage: ChatResponse = {
      sender_type: "user",
      ai_response: prompt.content,
      chat_title: prompt.content,
      chat_id: null,
      is_new_chat: true,
      word_count: prompt.content.split(" ").length,
      requires_authentication: false,
    };
    console.log("Adding user message:", userMessage);
    console.log("Current chats before adding:", chats);

    setChats((prevChats) => {
      const newChats = [...prevChats, userMessage];
      console.log("Updated chats:", newChats);
      return newChats;
    });

    form.reset();
    form.clearErrors();
    form.setFocus("body");

    try {
      // 2. Send to server
      const response = await sendChat({
        content: values.body,
        location: `${userInfo.city},${userInfo.country_name}`,
      });

      console.log("Server response:", response);

      // Handle both ChatResponse and MessagesResponse
      if ("sender_type" in response) {
        // It's a ChatResponse
        console.log("Handling ChatResponse");
        setChats((prevChats) => [...prevChats, response as ChatResponse]);
      } else {
        // It's a MessagesResponse - convert it to ChatResponse format
        console.log("Handling MessagesResponse");
        const aiResponse: ChatResponse = {
          chat_id: response.chat_id,
          chat_title: response.chat_title,
          sender_type: "assistant",
          ai_response: response.ai_response,
          is_new_chat: response.is_new_chat,
          word_count: response.word_count,
          requires_authentication: false,
        };
        console.log("Converted AI response:", aiResponse);
        setChats((prevChats) => [...prevChats, aiResponse]);
      }
    } catch (error) {
      // Handle error - maybe remove the optimistic messages
      console.error("Failed to send chat:", error);
    }
  }

  return { form, onSubmit, chats };
}
