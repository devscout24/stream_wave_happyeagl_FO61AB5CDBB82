"use client";

import useProvider from "@/app/chat/(root)/Context/use-provider";
import { PropsWithChildren } from "react";

interface OnClickBtnProps {
  chatId?: number;
}

export default function OnClickBtn({
  children,
  chatId,
}: PropsWithChildren<OnClickBtnProps>) {
  const { selectChat } = useProvider();

  return <li onClick={() => selectChat(chatId)}>{children}</li>;
}
