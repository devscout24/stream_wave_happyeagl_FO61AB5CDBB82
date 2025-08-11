import { ChatTitle } from "@/types";
import Link from "next/link";
import Icon from "./Icon";
import LastSeen from "./LastSeen";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function ChatCard({ chat }: { chat: ChatTitle }) {
  return (
    <Link
      href={`/chat/${chat.id}`}
      className="bg-card flex items-center justify-between p-4"
    >
      <div className="space-y-3">
        <h2 className="text-sm">{chat.title}</h2>
        <p className="flex items-center gap-1 text-xs text-gray-500">
          <Icon src="/star.svg" /> <span> AI: </span> <span>“{chat.body}”</span>{" "}
          <span>🌍</span>
        </p>
      </div>
      <span className="flex items-center gap-3">
        {chat.archive ? (
          <Button
            variant="ghost"
            className="bg-accent size-8 cursor-pointer rounded-full"
            title="Unarchive chat"
          >
            <Icon src="/archive.svg" className="inline-block" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="bg-accent size-8 cursor-pointer rounded-full"
            title="Archive chat"
          >
            <Icon src="/unarchive.svg" className="inline-block" />
          </Button>
        )}
        <Badge
          variant="secondary"
          className="bg-accent h-8 w-24 rounded-full text-xs font-normal"
        >
          <LastSeen date={chat.date.split(".")[0]} />
        </Badge>
      </span>
    </Link>
  );
}
