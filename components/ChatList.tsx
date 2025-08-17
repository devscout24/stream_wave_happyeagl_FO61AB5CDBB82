import { ChatTitle } from "@/types";
import ChatCard from "./ChatCard";
import OnClickBtn from "./ui/OnClickBtn";

interface ChatListProps {
  history: ChatTitle[];
}

export default function ChatList({ history }: ChatListProps) {
 

  

  return (
    <ul className="space-y-1">
      {history?.length > 0 &&
        history.map((chat) => (
          <OnClickBtn
            key={chat?.id || chat?.chat?.id}
            chatId={chat?.id || chat?.chat?.id}
          >
            <ChatCard chat={chat} />
          </OnClickBtn>
        ))}
    </ul>
  );
}
