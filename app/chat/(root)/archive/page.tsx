import ChatList from "@/components/ChatList";
import Search from "@/components/Search";
// import { ChatTitle } from "@/types";
import { getArchived } from "./_components/action";

export default async function ArchivePage() {
  const chatArchived = await getArchived();

  console.log("Fetched chat titles:", chatArchived.archived_chats);
  return (
    <section className="space-y-5">
      <h1 className="text-4xl font-semibold">Archive Chats</h1>
      <Search queryKey="achq" placeholder="Search archived chat" />

      {chatArchived.total_archived === 0 ? (
        <p>No archived found.</p>
      ) : (
        <ChatList history={chatArchived.archived_chats} />
      )}
    </section>
  );
}

// export const chatTitles: ChatTitle[] = [
//   {
//     id: 1,
//     title: "Welcome to Capital-H!",
//     date: "2025-08-01",
//     body: "Start your first conversation with our AI assistant.",
//     archive: true,
//   },
//   {
//     id: 2,
//     title: "How to reset my password?",
//     date: "2025-08-02",
//     body: "Instructions on resetting your password securely.",
//     archive: true,
//   },
//   {
//     id: 3,
//     title: "Summarize this article",
//     date: "2025-08-03",
//     body: "Please provide the article link for summarization.",
//     archive: true,
//   },
//   {
//     id: 4,
//     title: "Travel recommendations",
//     date: "2025-08-04",
//     body: "Looking for travel destinations in Europe.",
//     archive: true,
//   },
//   {
//     id: 5,
//     title: "AI chatbot features",
//     date: "2025-08-05",
//     body: "What features does Capital-H offer?",
//     archive: true,
//   },
//   {
//     id: 6,
//     title: "Weather update",
//     date: "2025-08-06",
//     body: "What's the weather like in New York today?",
//     archive: true,
//   },
//   {
//     id: 7,
//     title: "Translate to Spanish",
//     date: "2025-08-07",
//     body: "Translate 'Good morning' to Spanish.",
//     archive: true,
//   },
//   {
//     id: 8,
//     title: "Joke of the day",
//     date: "2025-08-08",
//     body: "Tell me a funny joke.",
//     archive: true,
//   },
//   {
//     id: 9,
//     title: "Meeting reminder",
//     date: "2025-08-09",
//     body: "Remind me about the meeting at 3 PM.",
//     archive: true,
//   },
//   {
//     id: 10,
//     title: "Healthy recipes",
//     date: "2025-08-10",
//     body: "Suggest some healthy dinner recipes.",
//     archive: true,
//   },
//   {
//     id: 11,
//     title: "Book recommendations",
//     date: "2025-08-11",
//     body: "Recommend some good science fiction books.",
//     archive: true,
//   },
//   {
//     id: 12,
//     title: "Capital cities quiz",
//     date: "2025-08-12",
//     body: "What's the capital of Australia?",
//     archive: false,
//   },
//   {
//     id: 13,
//     title: "Motivational quote",
//     date: "2025-08-13",
//     body: "Share a motivational quote for today.",
//     archive: false,
//   },
//   {
//     id: 14,
//     title: "Fitness tips",
//     date: "2025-08-14",
//     body: "How to stay fit while working from home?",
//     archive: false,
//   },
//   {
//     id: 15,
//     title: "Movie suggestions",
//     date: "2025-08-15",
//     body: "Suggest some movies for a weekend binge.",
//     archive: true,
//   },
//   {
//     id: 16,
//     title: "Learning resources",
//     date: "2025-08-16",
//     body: "Best online resources to learn TypeScript.",
//     archive: false,
//   },
//   {
//     id: 17,
//     title: "Birthday wishes",
//     date: "2025-08-17",
//     body: "Write a creative birthday message for a friend.",
//     archive: false,
//   },
//   {
//     id: 18,
//     title: "Productivity hacks",
//     date: "2025-08-18",
//     body: "Tips to boost productivity while studying.",
//     archive: false,
//   },
//   {
//     id: 19,
//     title: "AI in healthcare",
//     date: "2025-08-19",
//     body: "How is AI transforming healthcare?",
//     archive: true,
//   },
//   {
//     id: 20,
//     title: "Capital-H feedback",
//     date: "2025-08-20",
//     body: "Share your feedback to help us improve Capital-H.",
//     archive: false,
//   },
// ];
