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
import Link from "next/link";

export default function DesktopSidebar() {
  const [chat, setChat] = useState<ChatHistoryResponse>();
  const [showBar, setShowBar] = useState(true);

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
            <Icon onClick={() => setShowBar(!showBar)} src="/left-arrow.svg" />
          </div>

          <Suspense fallback={null}>
            <Search />
          </Suspense>

          <SidebarMenu />

          <h2 className="dark:text-secondary mt-14 text-sm">Recent Chat</h2>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-screen">
          {/* Part 1 - top */}
          <div className="flex flex-col gap-6">
            <Logo className="mx-auto my-4 h-10 w-10" />
            <Icon onClick={() => setShowBar(!showBar)} src="/right-arrow.svg" />
            <Link href="/chat"><Icon src="/edit.svg" /></Link>
            <Link href="/chat/history"><Icon src="/history.svg" /></Link>
            <Link href="/chat/archive"><Icon src="/archive.svg" /></Link>
          </div>

          {/* Part 2 - bottom */}
          <div className="mb-[82px]">
            <Logout isCollapsed={showBar} />
          </div>
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
