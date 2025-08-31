"use client";

import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import { Suspense, useEffect, useState } from "react";
import Logout from "./Logout";
import RecentHistory from "./RecentHistory";
import SidebarMenu from "./SidebarMenu";
import { useSearchParams } from "next/navigation";
import { getChatHistory } from "../(root)/history/_components/action";
import { ChatHistoryResponse } from "@/types";

export default function DesktopSidebar() {
  const [chat, setChat] = useState<ChatHistoryResponse>();
  const [showBar, setShowBar] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchChat() {
      const chatHistory = await getChatHistory(searchParams.get("query") || "");
      setChat(chatHistory);
    }
    fetchChat();
  }, [searchParams]);

  return (
    <aside className="row-span-full grid grid-rows-[auto_1fr_auto] max-lg:hidden">
      {showBar ? (
        <div>
          <div className="flex items-center justify-between">
            <Logo className="mx-auto my-4 h-10 w-10" />
            <Icon onClick={() => setShowBar(false)} src="/left-arrow.svg" />
          </div>

          <Suspense fallback={null}>
            <Search />
          </Suspense>

          <SidebarMenu />

          <h2 className="dark:text-secondary mt-10 text-sm">Recent Chat</h2>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Logo className="mx-auto my-4 h-10 w-10" />
          <Icon onClick={() => setShowBar(true)} src="/right-arrow.svg" />
        </div>
      )}

      {showBar &&
        (chat?.total_count === 0 ? (
          <p className="mt-2 text-sm">No recent chat found.</p>
        ) : (
          <RecentHistory chats={chat?.chats?.slice(0, 10)} />
        ))}

      {showBar && (
        <div className="flex h-32 items-start">
          <Logout />
        </div>
      )}
    </aside>
  );
}
