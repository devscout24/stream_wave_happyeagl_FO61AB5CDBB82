"use client";

import React, { useState } from "react";

interface ContextProps {
  selectedChat: number[];
  selectChat: (chatId?: number) => void;
}

export const Context = React.createContext<ContextProps | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [selectedChat, setSelectedChat] = useState<number[]>([]);

  const selectChat = (chatId?: number) => {
    if (!chatId) return;

    if (selectedChat.includes(chatId)) {
      setSelectedChat((prev) => prev.filter((id) => id !== chatId));
      return;
    }

    setSelectedChat((prev) => [...prev, chatId]);
  };

  return (
    <Context.Provider value={{ selectedChat, selectChat }}>
      {children}
    </Context.Provider>
  );
}
