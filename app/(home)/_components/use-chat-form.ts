import { sendChat } from "@/lib/actions";
import { IMessage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    body: z.string().optional(),
    files: z
      .array(z.instanceof(File))
      .optional()
      .refine((files) => !files || files.length <= 1, "Maximum 1 file allowed")
      .refine(
        (files) =>
          !files || files.every((file) => file.size <= 10 * 1024 * 1024),
        "Each file must be less than 10MB",
      )
      .refine(
        (files) =>
          !files ||
          files.every((file) => {
            const allowedTypes = [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
              "image/webp",
              "application/pdf",
            ];
            return allowedTypes.includes(file.type);
          }),
        "Only images (JPEG, PNG, GIF, WebP) and PDF files are allowed",
      ),
  })
  .refine(
    (data) => {
      // Either body has content (at least 2 chars) or files are provided
      const hasContent = data.body && data.body.trim().length >= 2;
      const hasFiles = data.files && data.files.length > 0;
      return hasContent || hasFiles;
    },
    {
      message: "Message must be at least 2 characters or attach a file.",
      path: ["body"],
    },
  );

interface ChatFormProps {
  content?: string;
  location: string;
  files?: File[];
}

export default function useChatForm() {
  const userInfo = useContext(IPInfoContext);
  const [chats, setChats] = useState<IMessage[]>([]);

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
      content: values.body || "",
      location: `${userInfo.city},${userInfo.country_name}`,
      files: values.files,
    };

    // 1. Add user message optimistically
    const userMessage: IMessage = {
      word_count: (prompt.content || "").split(" ").length,
      requires_authentication: false,
      chat_id: null,
      id: Date.now(), // Temporary ID
      chat_title: values.body || "",
      agent_type: "user",
      ai_response: values.body || "",
      is_new_chat: true,
    };

    setChats((prevChats) => [...prevChats, userMessage]);

    form.reset();
    form.clearErrors();
    form.setFocus("body");

    try {
      // Create FormData to send files
      const formData = new FormData();

      // Only append content if it's not empty
      if (values.body && values.body.trim().length > 0) {
        formData.append("content", values.body.trim());
      }

      formData.append("location", `${userInfo.city},${userInfo.country_name}`);

      // Append files to FormData
      if (values.files) {
        values.files.forEach((file) => {
          formData.append("file", file);
        });
      }

      // Update sendChat to accept FormData or regular object
      const response = await sendChat(formData);

      console.log("Server response:", response);

      // Handle response (same as before)
      if ("sender_type" in response) {
        setChats((prevChats) => [...prevChats, response as IMessage]);
      } else {
        const aiResponse: IMessage = {
          chat_id: response.chat_id,
          chat_title: response.chat_title,
          agent_type: "legal_assistant",
          ai_response: response.ai_response,
          is_new_chat: response.is_new_chat,
          word_count: response.word_count,
          requires_authentication: false,
          file_processing: response.file_processing,
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
