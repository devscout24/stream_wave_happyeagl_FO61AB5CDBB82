import { Chat } from "@/types";
import Message from "./Message";

interface InboxProps {
  inboxes: Chat[];
}

export default function Inbox({ inboxes }: InboxProps) {
  return (
    <section>
      <div className="flex flex-col gap-2">
        {inboxes.map((message: Chat) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
}
