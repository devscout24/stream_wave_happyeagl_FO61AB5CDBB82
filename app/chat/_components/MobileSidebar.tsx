import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Profile from "@/components/Profile";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getUserProfile } from "@/lib/actions";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logout from "../../../components/Logout";
import Search from "../../../components/Search";

export default async function MobileSidebar() {
  const user = await getUserProfile(); // Assume this function fetches the user profile
  return (
    <aside className="md:hidden">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu size={30} strokeWidth={1.5} />
        </DrawerTrigger>
        <DrawerContent className="!border-none px-4">
          <DrawerHeader className="flex flex-row items-center justify-between !px-0">
            <DialogTitle>
              <Logo className="h-8 w-8" />
            </DialogTitle>
            <DialogTitle className="text-lg font-semibold">
              {user && <Profile profile={user} />}
            </DialogTitle>
          </DrawerHeader>

          <Search />

          <div>
            <h2 className="dark:text-secondary mt-10 text-sm">Menu</h2>
            <ul className="mt-5 ml-2 flex flex-col gap-4">
              <li>
                <DrawerClose asChild>
                  <Link
                    href="/chat"
                    className="dark:text-secondary flex items-center gap-2"
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
                    className="dark:text-secondary flex items-center gap-2"
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
                    className="dark:text-secondary flex items-center gap-2"
                  >
                    <Icon src="/archive-chat.svg" />
                    <span>Archived Chats</span>
                  </Link>
                </DrawerClose>
              </li>
            </ul>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <h2 className="dark:text-secondary mt-10 text-sm max-lg:pb-2">
              Recent Chat
            </h2>
            <ul className="mt-3 min-h-0 flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="border-secondary/5 truncate border-b py-2 first:pt-0"
                >
                  <DrawerClose asChild>
                    <Link
                      href={`/chat/${chat.id}`}
                      className="dark:text-secondary flex items-center gap-2"
                    >
                      <span className="truncate">{chat.title}</span>
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </div>

          <DrawerFooter>
            <Logout />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
