import { ChatTitle } from "@/types";
import ChatCard from "./ChatCard";

interface ChatListProps {
  history: ChatTitle[];
}

export default function ChatList({ history }: ChatListProps) {
  return (
    <ul className="space-y-1">
      {history.map((chat) => (
        <li key={chat.id}>
          <ChatCard chat={chat} />
        </li>
      ))}
    </ul>
  );
}
