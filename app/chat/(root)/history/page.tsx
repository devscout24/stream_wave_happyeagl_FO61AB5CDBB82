import ChatList from "@/components/ChatList";
import Search from "@/components/Search";
import { getChatHistory } from "./_components/action";

export default async function HistoryPage() {
  const chatHistory = await getChatHistory();

  console.log("Fetched chat titles:", chatHistory.chats);

  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-semibold">Chat History</h1>
      <Search queryKey="chq" placeholder="Search chat history" />

      {chatHistory.total_count === 0 ? (
        <p>No chat history found.</p>
      ) : (
        <ChatList history={chatHistory.chats} />
      )}
    </section>
  );
}
