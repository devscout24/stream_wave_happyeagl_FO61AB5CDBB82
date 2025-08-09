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

export default async function MobileSidebar() {
  const user = await getUserProfile(); // Assume this function fetches the user profile
  return (
    <aside className="md:hidden">
      <Drawer direction="left">
        <DrawerTrigger>
          <Menu size={30} strokeWidth={1.5} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-row items-center justify-between">
            <DialogTitle>
              <Logo className="h-8 w-8" />
            </DialogTitle>
            <DialogTitle className="text-lg font-semibold">
              {user && <Profile profile={user} />}
            </DialogTitle>
          </DrawerHeader>

          <DrawerFooter>
            <Logout />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </aside>
  );
}
