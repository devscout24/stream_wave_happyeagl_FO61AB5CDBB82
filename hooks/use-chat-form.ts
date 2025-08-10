import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  body: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function useChatForm() {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setTimeout(() => {
      router.replace("/chat/" + values.body);
      form.reset();
    }, 500);
  }

  return { form, onSubmit };
}
