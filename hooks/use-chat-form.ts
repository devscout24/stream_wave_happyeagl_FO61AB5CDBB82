import { useCustomContext } from "@/app/chat/[chatId]/_context/use-context";
import { sendChat } from "@/lib/actions";
import { Message } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useRouter } from "next/navigation";
import { startTransition, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  body: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

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
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prompt = {
      content: values.body,
      location: `${userInfo.city},${userInfo.country_name}`,
    };

    if (chatId) {
      // Create optimistic user message
      const optimisticUserMessage: Message = {
        id: Date.now(), // Temporary ID
        chat: chatId,
        sender_type: "user",
        message_type: "text",
        content: values.body,
        created_at: new Date(),
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
        // Send to server
        await sendChat({
          ...prompt,
          chat_id: chatId.toString(),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
        // TODO: Handle error - maybe show a retry button
      }
    } else {
      const message = await sendChat(prompt);

      console.error(message);

      //  Redirect to conversation page
      router.replace(`/chat/${message.chat_id}`);
    }
  }

  // Handler to accept only image files and (optionally) only one file
  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsLoading(true);
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Accept only image files
  //   if (!file.type.startsWith("image/")) {
  //     alert("Please select a valid image file.");
  //     e.target.value = ""; // Reset input
  //     return;
  //   }

  //   try {
  //     toast.promise(updateProfilePicture(file), {
  //       loading: "Uploading...",
  //       success: "Upload successful!",
  //       error: "Upload failed.",
  //     });
  //   } catch (error) {
  //     console.error("Error uploading profile picture:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return { form, onSubmit };
}
