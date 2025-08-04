import ChatForm from "@/components/chat-form";

export const metadata = {
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-7 lg:space-y-14">
        <h1 className="text-center text-2xl font-medium md:text-3xl xl:text-4xl">
          How May I Help you!
        </h1>
        <ChatForm />
      </div>
    </div>
  );
}
