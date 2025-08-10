import ChatForm from "@/components/chat-form";
import type { Metadata } from "next";
import DesktopSidebar from "../_components/DesktopSidebar";
import Header from "../_components/Header";

export const metadata: Metadata = {
  title: "Home - Capital H",
  description:
    "Welcome to Capital H - A modern Next.js application with Docker development environment",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto grid max-h-dvh grid-rows-[auto_1fr_auto] gap-4 lg:max-w-[1440px] lg:grid-cols-[auto_1fr]">
      <DesktopSidebar />
      <Header />
      <main id="scrollbar" className="overflow-y-auto">
        {children}
      </main>
      <footer className="py-4 max-sm:px-2">
        <ChatForm />
      </footer>
    </div>
  );
}
