import { sendChat } from "@/lib/actions";
import { ChatResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  body: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  files: z
    .array(z.instanceof(File))
    .optional()
    .refine((files) => !files || files.length <= 5, "Maximum 5 files allowed")
    .refine(
      (files) => !files || files.every((file) => file.size <= 10 * 1024 * 1024),
      "Each file must be less than 10MB",
    ),
});

interface ChatFormProps {
  content: string;
  location: string;
  files?: File[];
}

export default function useChatForm() {
  const userInfo = useContext(IPInfoContext);
  const [chats, setChats] = useState<ChatResponse[]>([]);

  console.log("useChatForm - current chats:", chats, "length:", chats.length);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      files: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    console.log("Files:", values.files);

    const prompt: ChatFormProps = {
      content: values.body,
      location: `${userInfo.city},${userInfo.country_name}`,
      files: values.files,
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

    setChats((prevChats) => [...prevChats, userMessage]);

    form.reset();
    form.clearErrors();
    form.setFocus("body");

    try {
      // Create FormData to send files
      const formData = new FormData();
      formData.append("content", values.body);
      formData.append("location", `${userInfo.city},${userInfo.country_name}`);

      // Append files to FormData
      if (values.files) {
        values.files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
      }

      // Update sendChat to accept FormData or regular object
      const response = await sendChat(formData);

      console.log("Server response:", response);

      // Handle response (same as before)
      if ("sender_type" in response) {
        setChats((prevChats) => [...prevChats, response as ChatResponse]);
      } else {
        const aiResponse: ChatResponse = {
          chat_id: response.chat_id,
          chat_title: response.chat_title,
          sender_type: "assistant",
          ai_response: response.ai_response,
          is_new_chat: response.is_new_chat,
          word_count: response.word_count,
          requires_authentication: false,
        };
        setChats((prevChats) => [...prevChats, aiResponse]);
      }
    } catch (error) {
      console.error("Failed to send chat:", error);
      // Remove optimistic message on error
      setChats((prevChats) => prevChats.slice(0, -1));
    }
  }

  return { form, onSubmit, chats };
}
