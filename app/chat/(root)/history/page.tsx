import ChatList from "@/components/ChatList";
import Search from "@/components/Search";
import { getChatHistory } from "./_components/action";
import Actions from "./_components/Actions";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ chq?: string }>;
}) {
  const { chq } = await searchParams;

  console.log(chq);

  const chatHistory = await getChatHistory(!chq ? "" : chq);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Chat History</h1>
        <Actions />
      </div>
      <Search queryKey="chq" placeholder="Search chat history" />

      {chatHistory?.total_count === 0 ? (
        <p>No chat history found.</p>
      ) : (
        <ChatList history={chatHistory?.chats} />
      )}
    </section>
  );
}
