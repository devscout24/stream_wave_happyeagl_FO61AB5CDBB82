import Inbox from "@/components/Inbox";
import { mockChats } from "../_components/mock";

export default function ChatPage() {
  return <Inbox inboxes={mockChats} />;
}
