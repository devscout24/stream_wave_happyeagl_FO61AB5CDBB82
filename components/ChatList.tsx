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
          <li key={chat?.id || chat?.chat?.id}>
            <ChatCard
              chat={"messages" in chat ? chat : chat?.chat?.messages || chat}
            />
          </li>
        ))}
    </ul>
  );
}
