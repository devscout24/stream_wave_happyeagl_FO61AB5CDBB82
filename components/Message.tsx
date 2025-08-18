import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/config";
import { cn } from "@/lib/utils";
import { Message as IMessage } from "@/types";
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
      </div>
    </div>
  );
}
