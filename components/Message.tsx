import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Chat } from "@/types";

export default function Message({ message }: { message: Chat }) {
  return (
    <div
      className={cn("flex flex-col gap-2", {
        "items-end self-end": message.sender === "user",
        "items-start self-start": message.sender === "bot",
      })}
    >
      <div
        className={cn("flex flex-row-reverse items-center gap-2", {
          "flex-row-reverse": message.sender === "user",
          "flex-row": message.sender === "bot",
        })}
      >
        <Avatar>
          <AvatarImage src={message.avatar} alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h4 className="bg-muted font-medium">
          {message.sender === "user" ? "You" : "AI"}
        </h4>
      </div>

      <div className="bg-muted mt-1 flex-1 rounded-md">
        <p className="text-muted-foreground px-4 py-2 text-sm">
          {message.body}
        </p>
      </div>
    </div>
  );
}
