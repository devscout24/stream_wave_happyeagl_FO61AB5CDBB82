import ChatForm from "./_compoments/ChatForm";

export const metadata = {
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <ChatForm />
      </div>
    </div>
  );
}
