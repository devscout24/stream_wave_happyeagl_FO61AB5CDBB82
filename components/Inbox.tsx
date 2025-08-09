import { Chat } from "@/types";
import Message from "./Message";

interface InboxProps {
  inboxes: Chat[];
}

export default function Inbox({ inboxes }: InboxProps) {
  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-7 lg:space-y-14">
          <div className="flex flex-col gap-2">
            {inboxes.map((message: Chat) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
