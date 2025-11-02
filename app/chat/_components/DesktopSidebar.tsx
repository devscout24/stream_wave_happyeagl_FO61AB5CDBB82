"use client";

import Icon from "@/components/Icon";
import Search from "@/components/Search";
import { getUserProfile } from "@/lib/actions";
import { ChatHistoryResponse, UserProfile } from "@/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getChatHistory } from "../(root)/history/_components/action";
import Logout from "./Logout";
import RecentHistory from "./RecentHistory";
import SidebarMenu from "./SidebarMenu";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useProvider from "../../../Context/use-provider";

export default function DesktopSidebar() {
  const [chat, setChat] = useState<ChatHistoryResponse>();
  const [user, setUser] = useState<UserProfile | null>();
  const { isCollapsed, toggleCollapse } = useProvider();

  const searchParams = useSearchParams();

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    async function fetchChat() {
      const chatHistory = await getChatHistory(searchParams.get("query") || "");
      const user = await getUserProfile();
      setUser(user);
      setChat(chatHistory);
    }
    fetchChat();
  }, [searchParams]);

  return (
    <aside className="row-span-full grid grid-rows-[auto_1fr_auto] max-lg:hidden">
      {isCollapsed ? (
        <div>
          <div className="mt-3 flex items-center justify-between">
            {/* <Logo className="mx-auto my-4 h-10 w-10" /> */}
            <h1 className="py-3 text-lg font-semibold">
              Welcome back
              {user?.first_name ? ` ${user.first_name.split(" ")[0]}` : ""}
            </h1>
            <Button
              variant="link"
              size="icon"
              onClick={toggleCollapse}
              className="cursor-pointer"
            >
              <Icon src="/left-arrow.svg" className="size-8" />
            </Button>
          </div>

          <Suspense fallback={null}>
            <Search />
          </Suspense>

          <SidebarMenu />

          <h2 className="dark:text-secondary mt-14 text-sm">Recent Chat</h2>
        </div>
      ) : (
        <div className="flex h-screen flex-col justify-between">
          {/* Part 1 - top */}

          <div className="flex flex-col gap-6">
            {/* <Logo className="mx-auto my-4 h-10 w-10" /> */}
            <div className="mx-auto my-4 h-10 w-10" />
            <Tooltip>
              <TooltipTrigger
                onClick={toggleCollapse}
                className="cursor-pointer"
              >
                {/* <Link href="?sidebar=true"> */}
                <Icon src="/right-arrow.svg" />
                {/* </Link> */}
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-white dark:!text-black">Expand</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/chat">
                  <Icon
                    src="/edit.svg"
                    className={cn({
                      "text-[#FFAA4C]": isActive("/chat"),
                    })}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-white dark:!text-black">New chat</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/chat/history">
                  <Icon
                    src="/history.svg"
                    className={cn({
                      "text-[#FFAA4C]": isActive("/chat/history"),
                    })}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-white dark:!text-black">Chat history</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Link href="/chat/archive">
                  <Icon
                    src="/archive.svg"
                    className={cn({
                      "text-[#FFAA4C]": isActive("/chat/archive"),
                    })}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-white dark:!text-black">Chat archive</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Part 2 - bottom */}

          <div className="mb-[82px]">
            <Tooltip>
              <TooltipTrigger asChild className="w-fit">
                <Logout
                  isCollapsed={isCollapsed}
                  className="w-full cursor-pointer hover:bg-transparent"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-white dark:!text-black">Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {isCollapsed &&
        (chat?.total_count === 0 ? (
          <p className="mt-2 text-sm">No recent chat found.</p>
        ) : (
          <RecentHistory chats={chat?.chats?.slice(0, 10)} />
        ))}

      {isCollapsed && (
        <div className="flex h-32 items-start">
          <Logout />
        </div>
      )}
    </aside>
  );
}
