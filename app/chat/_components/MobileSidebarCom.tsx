"use client";

import React, { useEffect, useState } from "react";
import RecentHistory from "./RecentHistory";
import { ChatHistoryResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import { getChatHistory } from "../(root)/history/_components/action";

export default function MobileSidebarCom() {
  const [chat, setChat] = useState<ChatHistoryResponse>();

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchChat() {
      const chatHistory = await getChatHistory(searchParams.get("query") || "");
      setChat(chatHistory);
    }
    fetchChat();
  }, [searchParams]);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h2 className="dark:text-secondary mt-10 text-sm max-lg:pb-2">
        Recent Chat
      </h2>
      {chat?.total_count === 0 ? (
        <p className="mt-2 text-sm">No recent chat found.</p>
      ) : (
        <RecentHistory chats={chat?.chats?.slice(0, 10)} />
      )}
    </div>
  );
}
