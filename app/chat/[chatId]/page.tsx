import Inbox from "@/components/Inbox";
import { getUserProfile } from "@/lib/actions";
import { getChatMessages } from "./_components/action";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) { 
  const { chatId } = await params;
  const user = await getUserProfile();

  const chats = await getChatMessages(chatId);

  const messages = chats.messages;

  return <Inbox inboxes={messages} profilePic={user?.profile_pic} />;
}
