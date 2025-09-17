import { useCustomContext } from "@/app/chat/[chatId]/_context/use-context";
import { sendChat } from "@/lib/actions";
import { IMessage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useRouter } from "next/navigation";
import { startTransition, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    body: z.string().optional(),
    files: z
      .array(z.instanceof(File))
      .max(5, {
        message: "You can only upload up to 5 files.",
      })
      .optional(),
  })
  .refine(
    (data) => {
      // Either body has content or files are provided
      const hasContent = data.body && data.body.trim().length > 0;
      const hasFiles = data.files && data.files.length > 0;
      return hasContent || hasFiles;
    },
    {
      message: "Either message content or files are required.",
      path: ["body"], // This will show the error on the body field
    },
  );

export default function useChatForm({ chatId }: { chatId?: number }) {
  // const inputRef = useRef<HTMLInputElement>(null);
  // const [isLoading, setIsLoading] = useState(false);

  const userInfo = useContext(IPInfoContext);
  const contextValue = useCustomContext(); // Returns null if not in Provider
  const addOptimisticChat = contextValue?.addOptimisticChat;

  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
      files: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Prepare FormData if files are present, otherwise use regular object
    let requestData:
      | FormData
      | { content: string; location: string; chat_id?: string };

    if (values.files && values.files.length > 0) {
      // Create FormData for file uploads
      const formData = new FormData();

      // Only append content if it's not empty
      if (values.body && values.body.trim().length > 0) {
        formData.append("content", values.body.trim());
      }

      formData.append("location", `${userInfo.city},${userInfo.country_name}`);

      // Add files to FormData
      values.files.forEach((file) => {
        formData.append("file", file);
      });

      if (chatId) {
        formData.append("chat_id", chatId.toString());
      }

      requestData = formData;
    } else {
      // Regular object for text-only messages
      requestData = {
        content: values.body || "",
        location: `${userInfo.city},${userInfo.country_name}`,
        ...(chatId && { chat_id: chatId.toString() }),
      };
    }

    if (chatId) {
      // Create optimistic user message

      const optimisticUserMessage: IMessage = {
        id: Date.now(), // Temporary ID
        chat_title: values.body || "",
        chat_id: chatId,
        agent_type: "user",
        ai_response: values.body || "",
        is_new_chat: true,
        word_count: 0,
        requires_authentication: true,
      };

      // Add optimistic user message immediately in a transition (only if context is available)
      if (addOptimisticChat) {
        startTransition(() => {
          addOptimisticChat(optimisticUserMessage);
        });
      } else {
        console.error(
          "No addOptimisticChat function available - context might be null",
        );
      }

      // Clear form immediately for better UX
      form.reset();
      form.clearErrors();
      form.setFocus("body");

      try {
        // Send to server with either FormData or regular object
        await sendChat(requestData);
      } catch (error) {
        console.error("Failed to send message:", error);
        // TODO: Handle error - maybe show a retry button
      }
    } else {
      const message = await sendChat(requestData);

      //  Redirect to conversation page
      router.replace(`/chat/${message.chat_id}`);
    }
  }

  return { form, onSubmit };
}
