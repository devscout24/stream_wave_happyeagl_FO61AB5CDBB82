import { sendChat } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { IPInfoContext } from "ip-info-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  body: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function useChatForm({ chatId }: { chatId?: number }) {
  const userInfo = useContext(IPInfoContext);

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
      await sendChat({
        ...prompt,
        chat_id: chatId.toString(),
      });
    } else {
      const message = await sendChat(prompt);

      //  Redirect to conversation page
      router.replace(`/chat/${message.chat_id}`);
    }

    form.reset();
    form.clearErrors();
    form.setFocus("body");
    router.refresh();
  }

  return { form, onSubmit };
}
