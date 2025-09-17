"use client";

import useProvider from "@/Context/use-provider";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface OnClickBtnProps {
  chatId?: number;
}

export default function OnClickBtn({
  children,
  chatId,
}: PropsWithChildren<OnClickBtnProps>) {
  const pathname = usePathname();
  const { selectArchiveChat, selectHistoryChat } = useProvider();

  const selectChat = (id?: number) => {
    if (pathname.includes("archive")) {
      selectArchiveChat(id);
    } else {
      selectHistoryChat(id);
    }
  };

  return <li onClick={() => selectChat(chatId)}>{children}</li>;
}
