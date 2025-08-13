import ChatForm from "@/components/chat-form";
import Header from "@/components/Header";
import type { Metadata } from "next";
import DesktopSidebar from "../_components/DesktopSidebar";
import { getChatMessages } from "./_components/action";
import Provider from "./_context/Provider";

export const metadata: Metadata = {
  title: "Home - Capital H",
  description:
    "Welcome to Capital H - A modern Next.js application with Docker development environment",
};

export default async function ChatLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ chatId: string }>;
}>) {
  const { chatId } = await params;

  const chats = await getChatMessages(chatId);

  return (
    <div className="mx-auto grid max-h-dvh grid-rows-[auto_1fr_auto] gap-10 max-2xl:px-2 lg:max-w-[1440px] lg:grid-cols-[auto_1fr]">
      <Provider>
        <>
          <DesktopSidebar />
          <Header />
          <main id="scrollbar" className="overflow-y-auto">
            {children}
          </main>
          <footer className="py-4 max-sm:px-2">
            <ChatForm chatId={chats.chat_id} />
          </footer>
        </>
      </Provider>
    </div>
  );
}
