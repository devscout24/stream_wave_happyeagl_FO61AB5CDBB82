"use client";

import { ChatTitle } from "@/types";
import Link from "next/link";
import Icon from "./Icon";
import LastSeen from "./LastSeen";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import React from "react";
import { setArchive } from "@/app/chat/(root)/archive/_components/action";
import useAllArchive from "@/hooks/use-allArchive";
import { bulkArchive } from "@/app/chat/(root)/history/_components/action";

interface ChatCardProps {
  chat: ChatTitle;
  allChatIds: number[]; // pass all chat IDs from parent
}

export default function ChatCard({ chat, allChatIds }: ChatCardProps) {
const { selectedIds, toggleId, deselectAll } = useAllArchive(allChatIds);

const handleBulkArchive = async () => {
  if (selectedIds.length === 0) return; // nothing selected

  try {
    await bulkArchive(selectedIds, true); // true = archive
    console.log("Chats archived:", selectedIds);
    // optionally clear selection after archiving
    deselectAll();
  } catch (error) {
    console.error("Failed to archive selected chats:", error);
  }
};

  const handleArchiveToggle = async (condition: boolean) => {
    try {
      await setArchive(chat.id, condition);
    } catch (error) {
      console.error("Failed to update archive state:", error);
    }
  };

  const isSelected = selectedIds.includes(chat.id);

  return (
    <div
      onClick={() => toggleId(chat.id)}
      className={`bg-card flex gap-y-3 p-4 max-sm:flex-col sm:items-center sm:justify-between rounded-lg cursor-pointer transition
        ${isSelected ? "border-2 border-primary" : "border border-transparent"}`}
    >
      <div className="space-y-3">
        <h2 className="text-sm">{chat.title || chat.content}</h2>
        <p className="flex gap-1 text-xs text-gray-500">
          <Icon src="/star.svg" /> <span> AI: </span>
          <span>
            “{chat.body}” <span>🌍</span>
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
            <LastSeen date={chat.created_at || chat.chat?.created_at} />
          </Badge>
        </span>
        <Link href={`/chat/${chat.id}`} onClick={(e) => e.stopPropagation()}>
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
