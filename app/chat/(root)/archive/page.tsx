import ChatList from "@/components/ChatList";
import Search from "@/components/Search";
import { getArchived } from "./_components/action";
import ActionArchive from "./_components/ActionArchive";

export default async function ArchivePage() {
  const chatArchived = await getArchived();

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold">Archive Chats</h1>
        <ActionArchive />
      </div>
      <Search queryKey="achq" placeholder="Search archived chat" />

      {chatArchived.total_archived === 0 ? (
        <p>No archived found.</p>
      ) : (
        <ChatList history={chatArchived.archived_chats} />
      )}
    </section>
  );
}

