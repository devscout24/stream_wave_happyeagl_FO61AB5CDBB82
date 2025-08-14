import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {  updatePassword } from "./action";

const formSchema = z.object({
  old_password: z.string().min(4),
  new_password: z.string().min(4),
  confirm_new_password: z.string().min(4),
});

export default function useUpdatePass() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating in...");

    console.log(values)

    try {
    const res =  await updatePassword(values);

    console.log(res)
    } catch (error) {
      throw error;
    }finally{
        toast.dismiss()
    }

  }

  
    return { form, onSubmit };
}
