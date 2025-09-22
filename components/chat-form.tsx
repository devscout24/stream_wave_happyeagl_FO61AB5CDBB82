"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChatForm from "@/hooks/use-chat-form";
import { IPInfoContext } from "ip-info-react";
import { ShieldAlert, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useRef } from "react";

export default function ChatForm({ chatId }: { chatId?: number }) {
  const userInfo = useContext(IPInfoContext);

  const { form, onSubmit } = useChatForm({ chatId });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const watchedFiles = form.watch("files") || [];
  const hasFiles = watchedFiles.length > 0;

  const removeFile = (index: number) => {
    const currentFiles = form.getValues("files") || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("files", newFiles);
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentFiles = form.getValues("files") || [];
      form.setValue("files", [...currentFiles, ...files]);
    }
    // Reset the input so same file can be selected again
    e.target.value = "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          id="file-upload-input"
          type="file"
          multiple
          accept="image/*,application/pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.webp"
          className="sr-only"
          onChange={handleFileChange}
          style={{ position: "absolute", left: "-9999px" }}
        />

        {/* File Preview Section */}
        {hasFiles && (
          <div className="bg-muted/50 flex flex-wrap gap-2 rounded-lg p-2">
            {watchedFiles.map((file, index) => (
              <div key={index} className="group relative">
                <div className="border-border relative h-20 w-20 overflow-hidden rounded-lg border">
                  {getFilePreview(file) ? (
                    <Image
                      src={getFilePreview(file)!}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center">
                      <Icon
                        src="/attachment.svg"
                        className="text-muted-foreground size-6"
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 size-6 rounded-full p-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-1 w-20 truncate text-xs">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="relative">
              {/* Attachment Button - Only show when no files are present */}
              {!hasFiles && (
                <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
                  <label
                    title="Attach File"
                    htmlFor="file-upload-input"
                    className="transition-color flex cursor-pointer items-center justify-center rounded-full p-1"
                  >
                    <Icon src="/attachment.svg" className="h-5 w-5" />
                  </label>
                </div>
              )}

              <FormControl>
                <Input
                  placeholder="Ask anything..."
                  {...field}
                  className={`bg-input text-foreground placeholder:text-foreground py-4 text-sm shadow-xl placeholder:text-sm lg:rounded-[20px] lg:py-9 lg:text-lg placeholder:lg:text-lg dark:border-none ${
                    hasFiles ? "pl-4" : "pl-14"
                  }`}
                />
              </FormControl>

              <Button
                type="submit"
                variant="ghost"
                className="text-input bg-foreground hover:bg-foreground hover:text-input dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary absolute top-1/2 right-4 z-10 -translate-y-1/2 transform cursor-pointer max-lg:size-6 max-lg:rounded-sm"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <svg
                    className="text-foreground mr-3 size-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <Icon src="/sent.svg" className="size-4" />
                )}
              </Button>
            </FormItem>
          )}
        />

        <p className="text-paragraph flex items-start justify-center gap-1 text-center font-normal md:items-center">
          <ShieldAlert
            size={16}
            strokeWidth={1.5}
            className="text-paragraph max-sm:h-8 max-sm:w-8"
          />
          <span className="text-xs font-medium md:text-sm">
            AI can make mistakes. Consult with qualified human expert below,
            certified to examine your critical legal matter.
          </span>
        </p>

        <div className="grid w-full place-content-center">
          <Link href="?modal=appointment">
            <Button type="button" className="mx-auto mt-2 w-fit">
              Find Legal Help in {userInfo.city}, {userInfo.region}
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
