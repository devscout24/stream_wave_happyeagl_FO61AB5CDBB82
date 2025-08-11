import Icon from "@/components/Icon";
import Link from "next/link";

export default function SidebarMenu() {
  return (
    <div>
      <h2 className="dark:text-secondary mt-10 text-sm">Menu</h2>
      <ul className="mt-5 ml-2 flex flex-col gap-4">
        <li>
          <Link
            href="/chat"
            className="dark:text-secondary flex items-center gap-2"
          >
            <Icon src="/new-chat.svg" />
            <span>New Chat</span>
          </Link>
        </li>
        <li>
          <Link
            href="/chat/history"
            className="dark:text-secondary flex items-center gap-2"
          >
            <Icon src="/chat-history.svg" />
            <span>Chat History</span>
          </Link>
        </li>
        <li>
          <Link
            href="/chat/archive"
            className="dark:text-secondary flex items-center gap-2"
          >
            <Icon src="/archive-chat.svg" />
            <span>Archived Chats</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
