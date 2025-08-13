import ChatForm from "@/components/chat-form";

export default function ChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="text-center text-2xl font-medium md:text-3xl xl:text-4xl">
          How May I Help you!
        </h1>
        <ChatForm />
      </div>
    </div>
  );
}
