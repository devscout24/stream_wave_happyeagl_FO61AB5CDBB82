"use client";

import { setArchive } from "@/app/chat/(root)/archive/_components/action";
import useProvider from "@/Context/use-provider";
import { cn } from "@/lib/utils";
import { ChatTitle } from "@/types";
import Link from "next/link";
import { toast } from "sonner";
import Icon from "./Icon";
import LastSeen from "./LastSeen";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ChatCardProps {
  chat: ChatTitle;
}

export default function ChatCard({ chat }: ChatCardProps) {
  const { selectedHistoryChat, selectedArchiveChat } = useProvider();

  const isSelected = (chatId: number) => {
    if (chat?.is_archived) {
      return selectedArchiveChat.includes(chatId);
    }
    return selectedHistoryChat.includes(chatId);
  };

  const message = chat?.chat || chat;

  const handleArchiveToggle = async (condition: boolean) => {
    try {
      toast.promise(setArchive(chat?.id, condition), {
        loading: "Updating...",
        success: condition
          ? "Chat archived successfully!"
          : "Chat unarchive successfully!",
        error: "Failed to update archive state.",
      });
    } catch (error) {
      console.error("Failed to update archive state:", error);
    }
  };

  return (
    <div
      className={cn(
        "bg-card flex cursor-pointer gap-y-3 rounded-lg border border-transparent p-4 transition max-sm:flex-col sm:items-center sm:justify-between",
        {
          "border-primary-foreground dark:border-primary": isSelected(chat?.id),
        },
      )}
    >
      <div className="space-y-3">
        <h2 className="text-sm">
          {chat?.content ||
            (typeof message === "object" && "title" in message
              ? message?.title
              : "")}
        </h2>
        <p className="flex gap-1 text-xs text-gray-500">
          <Icon src="/star.svg" /> <span> AI: </span>
          <span>
            “{chat?.body}” <span>🌍</span>
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <span className="flex items-center gap-3">
          {chat?.is_archived ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveToggle(false);
              }}
              variant="ghost"
              className="bg-accent size-8 cursor-pointer rounded-full"
              title="Archive chat"
            >
              <Icon src="/unarchive.svg" className="inline-block" />
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleArchiveToggle(true);
              }}
              variant="ghost"
              className="bg-accent size-8 cursor-pointer rounded-full"
              title="Unarchive chat"
            >
              <Icon src="/archive.svg" className="inline-block" />
            </Button>
          )}

          <Badge
            variant="secondary"
            className="bg-accent h-8 w-24 rounded-full text-xs font-normal"
          >
            <LastSeen
              date={
                chat?.created_at
                  ? new Date(chat.created_at)
                  : chat.chat?.created_at
                    ? new Date(chat.chat.created_at)
                    : new Date()
              }
            />
          </Badge>
        </span>
        <Link href={`/chat/${chat?.id}`} onClick={(e) => e.stopPropagation()}>
          <Button
            className="bg-accent h-8 w-full rounded-lg text-xs font-normal"
            variant="ghost"
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}
