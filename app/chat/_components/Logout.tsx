"use client";
import Icon from "@/components/Icon";
import { DrawerClose } from "@/components/ui/drawer";
import { logoutUser } from "@/lib/actions";

export default function Logout() {
  return (
    <DrawerClose className="flex items-center gap-2" onClick={logoutUser}>
      <Icon src="/logout.svg" className="h-6 w-6" />
      <span>Sign Out</span>
    </DrawerClose>
  );
}
