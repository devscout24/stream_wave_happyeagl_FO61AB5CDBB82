"use client";

import { ChatTitle, ChatMessage } from "@/types";
import ChatCard from "./ChatCard";

interface ChatListProps {
  history: (ChatTitle | ChatMessage)[];
}

export default function ChatList({ history }: ChatListProps) {
 

  

  return (
    <ul className="space-y-1">
      {history?.length > 0 &&
        history.map((chat) => (
          <li
            onClick={() => toggleId(chat?.id)}
            key={chat?.id || chat?.chat?.id}
          >
            <ChatCard
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
              chat={"messages" in chat ? chat : chat?.chat?.messages || chat}
            />
          </li>
        ))}
    </ul>
  );
}
