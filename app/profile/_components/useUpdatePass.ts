import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updatePassword } from "./action";

const formSchema = z
  .object({
    old_password: z.string().min(4),
    new_password: z.string().min(4),
    confirm_new_password: z.string().min(4),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ["confirm_new_password"],
    message: "Passwords do not match",
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

  // normalize common server field keys to your form field names
  const normalizeField = (key: string) => {
    const map: Record<string, string> = {
      old_password: "old_password",
      oldPassword: "old_password",
      "old-password": "old_password",

      new_password: "new_password",
      newPassword: "new_password",
      "new-password": "new_password",

      confirm_new_password: "confirm_new_password",
      confirmNewPassword: "confirm_new_password",
      "confirm-new-password": "confirm_new_password",
      confirm_password: "confirm_new_password",
    };
    return map[key] ?? key;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Updating in...");

    try {
      const res = await updatePassword(values);

      if (res && typeof res === "object") {
        type UpdatePasswordResponse = {
          ok?: boolean;
          message?: string;
          error?: string;
          errors?: Record<string, string[] | string>;
        };
        const typedRes = res as UpdatePasswordResponse;

        if (typedRes.errors && typeof typedRes.errors === "object") {
          let firstField: string | null = null;
          for (const [rawKey, messages] of Object.entries(typedRes.errors)) {
            const field = normalizeField(rawKey);
            const message =
              Array.isArray(messages) && messages.length
                ? String(messages[0])
                : String(messages || "Invalid value");
            form.setError(field as keyof z.infer<typeof formSchema>, {
              type: "server",
              message,
            });
            if (!firstField) firstField = field;
          }
          if (firstField)
            form.setFocus(firstField as keyof z.infer<typeof formSchema>);
          toast.error("Please fix the highlighted errors.");
          return;
        }

        // Set root error if present
        if (typedRes.ok === false && typedRes.message) {
          form.setError("root", {
            type: "server",
            message: String(typedRes.message),
          });
          toast.error(String(typedRes.message));
          return;
        }

        if (typedRes.error) {
          form.setError("root", {
            type: "server",
            message: String(typedRes.error),
          });
          toast.error(String(typedRes.error));
          return;
        }
      }

      toast.success("Password updated.");
      form.reset();
    } catch (err: unknown) {
      const e = err as { data?: Record<string, unknown>; message?: string };

      if (e?.data && typeof e.data === "object") {
        let firstField: string | null = null;
        for (const [rawKey, messages] of Object.entries(
          e.data as Record<string, unknown>,
        )) {
          const field = normalizeField(rawKey);
          const message =
            Array.isArray(messages) && messages.length
              ? String(messages[0])
              : String(messages || "Invalid value");
          if (
            ["old_password", "new_password", "confirm_new_password"].includes(
              field,
            )
          ) {
            form.setError(field as keyof z.infer<typeof formSchema>, {
              type: "server",
              message,
            });
            if (!firstField) firstField = field;
          } else {
            // Set as root error for unknown fields
            form.setError("root", { type: "server", message });
            toast.error(message);
          }
        }
        if (firstField)
          form.setFocus(firstField as keyof z.infer<typeof formSchema>);
        toast.error("Please fix the highlighted errors.");
      } else if (e?.message) {
        form.setError("root", { type: "server", message: e.message });
        toast.error(e.message);
      } else {
        form.setError("root", {
          type: "server",
          message: "Failed to update password.",
        });
        toast.error("Failed to update password.");
      }
      console.error("Update password error:", err);
    } finally {
      toast.dismiss();
    }
  }

  return { form, onSubmit };
}
