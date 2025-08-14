"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { UserProfile } from "@/types";
import useUpdateInfo from "./use-updateInfo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface ProfileFormProps {
  user: UserProfile | undefined;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { form, onSubmit } = useUpdateInfo({
    first_name: user?.first_name,
    last_name: user?.last_name,
  });
  const [open, setOpen] = React.useState(false);

  const onOpenChange = React.useCallback(() => setOpen((prev) => !prev), []);

  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onOpenChange();
    }
  }, [form.formState.isSubmitSuccessful, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Edit className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader className="my-8">
          <DialogTitle>Update Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-6 space-y-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input id="first_name" {...field} />
                    </FormControl>
                    {form.formState.errors.first_name && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.first_name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input id="last_name" {...field} />
                    </FormControl>
                    {form.formState.errors.last_name && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.last_name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <Button
                className=""
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update"}
              </Button>
              <DialogClose asChild>
                <Button className="" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
