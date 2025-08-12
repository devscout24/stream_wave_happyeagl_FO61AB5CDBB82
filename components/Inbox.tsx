import { Message as IMessage } from "@/types";
import Message from "./Message";

interface InboxProps {
  inboxes: IMessage[];
}

export default function Inbox({ inboxes }: InboxProps) {
  return (
    <section>
      <div className="flex flex-col gap-10">
        {inboxes.map((message: IMessage) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </section>
  );
}
