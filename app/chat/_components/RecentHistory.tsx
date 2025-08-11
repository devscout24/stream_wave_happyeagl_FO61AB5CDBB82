"use client";

import { DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ChatHistory } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RecentHistoryProps {
  isDesktop?: boolean;
  chats: ChatHistory[];
}

export default function RecentHistory({
  isDesktop = true,
  chats,
}: RecentHistoryProps) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return isDesktop ? (
    <ul id="scrollbar" className="mt-3 max-h-[500px] overflow-y-auto">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className="border-muted/50 mr-2 border-b py-2 first:pt-0"
        >
          <Link
            href={`/chat/${chat.id}`}
            className={cn("dark:text-secondary flex items-center gap-2", {
              "dark:text-primary text-primary": isActive(`/chat/${chat.id}`),
            })}
          >
            <span className="truncate">{chat.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <ul className="mt-3 min-h-0 flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className="border-secondary/5 truncate border-b py-2 first:pt-0"
        >
          <DrawerClose asChild>
            <Link
              href={`/chat/${chat.id}`}
              className={cn("dark:text-secondary flex items-center gap-2", {
                "dark:text-primary text-primary": isActive(`/chat/${chat.id}`),
              })}
            >
              <span className="truncate">{chat.title}</span>
            </Link>
          </DrawerClose>
        </li>
      ))}
    </ul>
  );
}
