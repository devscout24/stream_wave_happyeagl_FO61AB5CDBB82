import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/config";
import { cn } from "@/lib/utils";
import { Message as IMessage } from "@/types";
import { Download, FileText } from "lucide-react";
import Image from "next/image";
import Icon from "./Icon";
import StreamText from "./StreamText";

export default function Message({
  message,
  onTextUpdate,
  profile_pic,
}: {
  message: IMessage;
  onTextUpdate?: () => void;
  profile_pic?: string;
}) {
  const isBot = message.sender_type === "assistant";

  // Debug logging
  console.log("Message data:", message);
  console.log("Has file_url:", !!message.file_url);
  console.log("Message type:", message.message_type);
  console.log("File name:", message.file_name);

  const avatarSrc =
    `${config.assetUrl}${profile_pic}` ||
    "https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg";

  return (
    <div
      className={cn("flex w-full flex-col gap-2", {
        "items-end self-end pr-2": !isBot,
        "border-muted/50 items-start self-start not-last:border-b not-last:pb-4":
          isBot,
      })}
    >
      <div
        className={cn("flex flex-row-reverse items-center gap-2", {
          "flex-row-reverse": !isBot,
          "flex-row": isBot,
        })}
      >
        {isBot ? (
          <Icon src="/ai.svg" className="size-6" />
        ) : (
          <Avatar className="size-6">
            <AvatarImage src={avatarSrc} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
        <h4 className="font-medium">{isBot ? "AI" : "You"}</h4>
      </div>

      <div
        className={cn("mt-1 flex-1 rounded-md", {
          "bg-muted": !isBot,
        })}
      >
        {/* File Attachment Display */}
        {(message.file_url || message.file) && (
          <div className="px-4 pt-2">
            <div className="bg-background border-border mb-2 max-w-xs rounded-lg border p-3">
              {/* Debug info */}
              <div className="mb-2 text-xs text-red-500">
                Debug: file_url={message.file_url ? "yes" : "no"}, file=
                {message.file ? "yes" : "no"}, type={message.message_type}
              </div>

              {message.message_type === "image" ? (
                <div className="space-y-2">
                  <div className="relative h-40 w-full overflow-hidden rounded-md">
                    <Image
                      src={
                        message.file_url ||
                        (message.file ? URL.createObjectURL(message.file) : "")
                      }
                      alt={message.file_name || "Image attachment"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {message.file_name && (
                    <p className="text-muted-foreground truncate text-xs">
                      {message.file_name}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {message.file_name?.endsWith(".pdf") ? (
                      <FileText className="h-8 w-8 text-red-500" />
                    ) : (
                      <FileText className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {message.file_name || "File attachment"}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {message.message_type === "file" ? "Document" : "File"}
                    </p>
                  </div>
                  {message.file_url && (
                    <a
                      href={message.file_url}
                      download={message.file_name}
                      className="hover:bg-muted flex-shrink-0 rounded-full p-1 transition-colors"
                    >
                      <Download className="text-muted-foreground h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Text Content */}
        {message.content && (
          <div className="text-muted-foreground px-4 py-2 text-sm">
            {isBot ? (
              <StreamText
                isNow={
                  message?.created_at
                    ? new Date(message.created_at).getTime() > Date.now() - 5000
                    : false
                }
                text={message.content}
                onTextUpdate={onTextUpdate}
              />
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
