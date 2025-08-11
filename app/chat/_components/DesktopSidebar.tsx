import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Suspense } from "react";
import Logout from "./Logout";
import Search from "./Search";
import SidebarMenu from "./SidebarMenu";

export default function DesktopSidebar() {
  return (
    <aside className="row-span-full grid grid-rows-[auto_1fr_auto] max-lg:hidden">
      <div>
        <div className="flex items-center justify-between">
          <Logo className="mx-auto my-4 h-10 w-10" />
          <Icon src="/left-arrow.svg" />
        </div>

        <Suspense fallback={null}>
          <Search />
        </Suspense>

        <SidebarMenu />

        <h2 className="dark:text-secondary mt-10 text-sm">Recent Chat</h2>
      </div>
      <ul id="scrollbar" className="mt-3 max-h-[500px] overflow-y-auto">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="border-muted/50 mr-2 border-b py-2 first:pt-0"
          >
            <Link
              href={`/chat/${chat.id}`}
              className="dark:text-secondary flex items-center gap-2"
            >
              <span className="truncate">{chat.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex h-32 items-start">
        <Logout />
      </div>
    </aside>
  );
}

const chats = [
  {
    id: 1,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Summarize this blog post for me.",
    date: "2023-10-02",
  },
  {
    id: 3,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-03",
  },
  {
    id: 4,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-04",
  },
  {
    id: 5,
    title: "Summarize this blog post for me.",
    date: "2023-10-05",
  },
  {
    id: 6,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-06",
  },
  {
    id: 7,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-07",
  },
  {
    id: 8,
    title: "Summarize this blog post for me.",
    date: "2023-10-08",
  },
  {
    id: 9,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-09",
  },
  {
    id: 10,
    title: "Summarize this blog post for me.",
    date: "2023-10-10",
  },
  {
    id: 11,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-11",
  },
  {
    id: 12,
    title: "Summarize this blog post for me.",
    date: "2023-10-12",
  },
  {
    id: 13,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-13",
  },
  {
    id: 14,
    title: "Summarize this blog post for me.",
    date: "2023-10-14",
  },
  {
    id: 15,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-15",
  },
  {
    id: 16,
    title: "Summarize this blog post for me.",
    date: "2023-10-16",
  },
  {
    id: 17,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-17",
  },
  {
    id: 18,
    title: "Summarize this blog post for me.",
    date: "2023-10-18",
  },
  {
    id: 19,
    title: "What’s a good caption for my travel photo?",
    date: "2023-10-19",
  },
  {
    id: 20,
    title: "Summarize this blog post for me.",
    date: "2023-10-20",
  },
];
