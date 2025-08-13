import Inbox from "@/components/Inbox";
import { getChatMessages } from "./_components/action";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  const chats = await getChatMessages(chatId);

  const messages = chats.messages;

  console.log("Fetched chats:", chats);

  return <Inbox inboxes={messages} />;
}
