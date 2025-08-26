import Logo from "@/components/Logo";
import Profile from "@/components/Profile";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getUserProfile } from "@/lib/actions";
import { Menu } from "lucide-react";
import Logout from "../../../components/Logout";
import Search from "../../../components/Search";
import RecentHistory from "./RecentHistory";
import SidebarMenu from "./SidebarMenu";
import { getChatHistory } from "../(root)/history/_components/action";

export default async function MobileSidebar({ chq }: { chq?: string }) {
  const user = await getUserProfile(); 

  const chatHistory = await getChatHistory(!chq ? "" : chq);

  return (
    <aside className="lg:hidden">
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

          <SidebarMenu isDesktop={false} />

          <div className="flex min-h-0 flex-1 flex-col">
            <h2 className="dark:text-secondary mt-10 text-sm max-lg:pb-2">
              Recent Chat
            </h2>
            {chatHistory.total_count === 0 ? (
              <p className="mt-2 text-sm">No recent chats found.</p>
            ) : (
              <RecentHistory
                chats={chatHistory.chats.slice(0, 10)}
                isDesktop={false}
              />
            )}
          </div>

          <DrawerFooter>
            <Logout />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </aside>
  );
}

// const chats = [
//   {
//     id: 1,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-01",
//   },
//   {
//     id: 2,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-02",
//   },
//   {
//     id: 3,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-03",
//   },
//   {
//     id: 4,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-04",
//   },
//   {
//     id: 5,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-05",
//   },
//   {
//     id: 6,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-06",
//   },
//   {
//     id: 7,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-07",
//   },
//   {
//     id: 8,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-08",
//   },
//   {
//     id: 9,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-09",
//   },
//   {
//     id: 10,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-10",
//   },
//   {
//     id: 11,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-11",
//   },
//   {
//     id: 12,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-12",
//   },
//   {
//     id: 13,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-13",
//   },
//   {
//     id: 14,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-14",
//   },
//   {
//     id: 15,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-15",
//   },
//   {
//     id: 16,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-16",
//   },
//   {
//     id: 17,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-17",
//   },
//   {
//     id: 18,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-18",
//   },
//   {
//     id: 19,
//     title: "What’s a good caption for my travel photo?",
//     date: "2023-10-19",
//   },
//   {
//     id: 20,
//     title: "Summarize this blog post for me.",
//     date: "2023-10-20",
//   },
// ];
