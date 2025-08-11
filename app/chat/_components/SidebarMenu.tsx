"use client";

import Icon from "@/components/Icon";
import { DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarMenu({ isDesktop = true }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return isDesktop ? (
    <div>
      <h2 className="dark:text-secondary mt-10 text-sm">Menu</h2>
      <ul className="mt-5 ml-2 flex flex-col gap-4">
        <li>
          <Link
            href="/chat"
            className={cn("dark:text-secondary flex items-center gap-2", {
              "dark:text-primary text-primary": isActive("/chat"),
            })}
          >
            <Icon src="/new-chat.svg" />
            <span>New Chat</span>
          </Link>
        </li>
        <li>
          <Link
            href="/chat/history"
            className={cn("dark:text-secondary flex items-center gap-2", {
              "dark:text-primary text-primary": isActive("/chat/history"),
            })}
          >
            <Icon src="/chat-history.svg" />
            <span>Chat History</span>
          </Link>
        </li>
        <li>
          <Link
            href="/chat/archive"
            className={cn("dark:text-secondary flex items-center gap-2", {
              "dark:text-primary text-primary": isActive("/chat/archive"),
            })}
          >
            <Icon src="/archive-chat.svg" />
            <span>Archived Chats</span>
          </Link>
        </li>
      </ul>
    </div>
  ) : (
    <div>
      <h2 className="dark:text-secondary mt-10 text-sm">Menu</h2>
      <ul className="mt-5 ml-2 flex flex-col gap-4">
        <li>
          <DrawerClose asChild>
            <Link
              href="/chat"
              className={cn("dark:text-secondary flex items-center gap-2", {
                "dark:text-primary text-primary": isActive("/chat"),
              })}
            >
              <Icon src="/new-chat.svg" />
              <span>New Chat</span>
            </Link>
          </DrawerClose>
        </li>
        <li>
          <DrawerClose asChild>
            <Link
              href="/chat/history"
              className={cn("dark:text-secondary flex items-center gap-2", {
                "dark:text-primary text-primary": isActive("/chat/history"),
              })}
            >
              <Icon src="/chat-history.svg" />
              <span>Chat History</span>
            </Link>
          </DrawerClose>
        </li>
        <li>
          <DrawerClose asChild>
            <Link
              href="/chat/archive"
              className={cn("dark:text-secondary flex items-center gap-2", {
                "dark:text-primary text-primary": isActive("/chat/archive"),
              })}
            >
              <Icon src="/archive-chat.svg" />
              <span>Archived Chats</span>
            </Link>
          </DrawerClose>
        </li>
      </ul>
    </div>
  );
}
