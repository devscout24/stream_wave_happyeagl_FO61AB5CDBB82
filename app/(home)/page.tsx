"use client";

import ChatForm from "./_components/ChatForm";
import Inbox from "./_components/Inbox";
import useChatForm from "./_components/use-chat-form";

// export const metadata = {
//   title: "Capital H – Conversational AI Chatbot",
//   description:
//     "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
// };

export default function Home() {
  const { form, onSubmit, chats } = useChatForm();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <Inbox chats={chats} />
        <ChatForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
