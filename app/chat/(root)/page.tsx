import ChatForm from "@/components/chat-form";

export default function ChatPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="text-center text-2xl font-medium md:text-3xl">
          I am legal expert. You can talk to me <br /> in Spanish or any
          language you prefer.
        </h1>

        <p className="text-center">
          Soy experto legal. Puedes hablar conmigo <br /> en español o cualquier
          idioma que prefieras.
        </p>

        <ChatForm />
      </div>
    </div>
  );
}
