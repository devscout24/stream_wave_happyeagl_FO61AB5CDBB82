"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChatForm from "@/hooks/use-chat-form";
import useFileCom from "@/hooks/use-file-com";
import { ShieldAlert } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ChatForm({ chatId }: { chatId?: number }) {
  const { form, onSubmit } = useChatForm({ chatId });
  const { onUploadFiles } = useFileCom({ chatId });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);

      // Upload files via useFileCom
      onUploadFiles(filesArray);

      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="relative">
              <div>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-[55%] left-3 -translate-y-1/2 transform cursor-pointer hover:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-white"
                  disabled={form.formState.isSubmitting}
                  onClick={handleFileClick}
                >
                  {selectedFiles.length > 0 ? (
                    (() => {
                      const file = selectedFiles[0];
                      const isImage = file.type.startsWith("image/");
                      const fileUrl = URL.createObjectURL(file);

                      return (
                        <div className="relative">
                          {isImage ? (
                            <Image
                              src={fileUrl}
                              alt={file.name}
                              width={48}
                              height={48}
                              className="rounded object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 p-1 text-center text-xs dark:bg-gray-700">
                              {file.name.length > 4
                                ? file.name.slice(0, 4) + "..."
                                : file.name}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFiles([]);
                            }}
                            className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })()
                  ) : (
                    <Icon src="/attachment.svg" />
                  )}
                </Button>
              </div>

              <FormControl>
                <Input
                  placeholder="Describe your thought"
                  {...field}
                  className="bg-input text-foreground placeholder:text-foreground py-4 pl-[76px] text-sm shadow-xl placeholder:text-sm lg:rounded-[20px] lg:py-9 lg:text-lg placeholder:lg:text-lg dark:border-none"
                />
              </FormControl>

              <Button
                type="submit"
                variant="ghost"
                className="text-input bg-foreground hover:bg-foreground hover:text-input dark:bg-primary dark:text-background dark:hover:text-background dark:hover:bg-primary absolute top-[55%] right-4 -translate-y-1/2 transform cursor-pointer max-lg:size-6 max-lg:rounded-sm"
                disabled={form.formState.isSubmitting}
              >
                <Icon src="/sent.svg" className="size-4" />
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
          <span className="text-xs md:text-sm">
            This AI may occasionally generate incorrect or incomplete answers.
            Always verify important information.
          </span>
        </p>
      </form>
    </Form>
  );
}
