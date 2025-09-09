"use client";

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
import { UserProfile } from "@/types";
import { Menu } from "lucide-react";
import Logout from "../../../components/Logout";
import Search from "../../../components/Search";
import MobileSidebarCom from "./MobileSidebarCom";
import SidebarMenu from "./SidebarMenu";

export default function MobileSidebar({ user }: { user: UserProfile | null }) {
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

          <MobileSidebarCom />

          <DrawerFooter>
            <Logout />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </aside>
  );
}
