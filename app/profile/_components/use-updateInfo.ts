import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfile } from "./action";

export const formSchema = z.object({
  first_name: z.string().min(1, "First name is required").optional(),
  last_name: z.string().min(1, "Last name is required").optional(),
  //   profile_pic: z.file().optional(),
});

export type ProfileFormValues = z.infer<typeof formSchema>;

interface UseUpdateInfoProps {
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
}

export default function useUpdateInfo(defaultValues?: UseUpdateInfoProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      first_name: defaultValues?.first_name || "",
      last_name: defaultValues?.last_name || "",
      //   profile_pic: defaultValues?.profile_pic || "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    toast.loading("Updating profile...");

    try {
      const result = await updateProfile(values);

      if (result?.error) {
        form.setError("root", { type: "server", message: result.error });
        toast.dismiss();
        toast.error(result.error);
        return;
      }

      // Success
      form.clearErrors();
      toast.dismiss();
      toast.success("Profile updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Update failed. Please try again.";

      form.setError("root", { type: "server", message: errorMessage });
      toast.dismiss();
      toast.error(errorMessage);
    }
  }

  return { form, onSubmit };
}
