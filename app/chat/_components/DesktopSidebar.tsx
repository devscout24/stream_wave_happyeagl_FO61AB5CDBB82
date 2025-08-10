import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import Chats from "./Chats";
import Logout from "./Logout";
import Search from "./Search";
import SidebarMenu from "./SidebarMenu";

export default function DesktopSidebar() {
  return (
    <aside className="">
      <div className="flex items-center justify-between">
        <Logo className="mx-auto my-4 h-10 w-10" />
        <Icon src="/left-arrow.svg" />
      </div>

      <Search />

      <SidebarMenu />

      <Chats />

      <Logout />
    </aside>
  );
}
