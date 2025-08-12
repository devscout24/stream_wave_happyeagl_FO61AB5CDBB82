import Icon from "@/components/Icon";
import StreamText from "@/components/StreamText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChatResponse } from "@/types";

export default function Message({ message }: { message: ChatResponse }) {
  const isBot = message.sender_type === "assistant";

  const avatarSrc =
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
        <p className="text-muted-foreground px-4 py-2 text-sm">
          {isBot ? (
            <StreamText text={message.ai_response} />
          ) : (
            message.ai_response
          )}
        </p>
      </div>
    </div>
  );
}
