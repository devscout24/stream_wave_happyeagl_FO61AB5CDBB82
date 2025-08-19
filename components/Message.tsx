import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/config";
import { cn } from "@/lib/utils";
import { FileProcessing } from "@/types";
import Image from "next/image";
import Icon from "./Icon";
import StreamText from "./StreamText";

interface MessageProps {
  content: string;
  isUser: boolean;
  onTextUpdate?: () => void;
  profile_pic?: string;
  createdAt?: Date;
  file_processing?: FileProcessing;
  isAuthenticated?: boolean;
}

export default function Message({
  content,
  isUser,
  onTextUpdate,
  profile_pic,
  createdAt,
  file_processing,
  isAuthenticated = true, // Default to true if not provided
}: MessageProps) {
  console.log("🚀 ~ Message ~ content:", content);
  const avatarSrc = profile_pic ? `${config.assetUrl}${profile_pic}` : "";

  console.log("🚀 ~ Message ~ Animate:", createdAt && createdAt === new Date());

  return (
    <div
      className={cn("flex w-full flex-col gap-2", {
        "items-end self-end pr-2": isUser,
        "border-muted/50 items-start self-start not-last:border-b not-last:pb-4":
          !isUser,
      })}
    >
      <div
        className={cn("flex flex-row-reverse items-center gap-2", {
          "flex-row-reverse": isUser,
          "flex-row": !isUser,
        })}
      >
        {!isUser ? (
          <Icon src="/ai.svg" className="size-6" />
        ) : (
          <Avatar className="size-6">
            <AvatarImage src={avatarSrc} alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
        <h4 className="font-medium">{isUser ? "You" : "AI"}</h4>
      </div>

      <div
        className={cn("mt-1 flex-1 rounded-md", {
          "bg-muted": isUser,
        })}
      >
        {/* Text Content */}
        <div className="text-muted-foreground px-4 py-2 text-sm">
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <>
              {file_processing && file_processing.file_type === "image" && (
                <Image
                  src={`${config.assetUrl}/${file_processing.file_name}`}
                  alt="Image preview"
                  className="max-w-full rounded-md"
                  width={200}
                  height={200}
                />
              )}
              <StreamText
                isNow={
                  isAuthenticated
                    ? createdAt
                      ? (() => {
                          const now = new Date();
                          const diff = now.getTime() - createdAt.getTime();
                          return diff >= 0 && diff <= 0.1 * 60 * 1000; // within last 6 seconds
                        })()
                      : false
                    : true
                }
                text={content}
                onTextUpdate={onTextUpdate}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
