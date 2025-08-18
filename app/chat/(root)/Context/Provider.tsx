"use client";

import React, { useState } from "react";

interface ContextProps {
  selectedHistoryChat: number[];
  selectHistoryChat: (chatId?: number) => void;
  selectedArchiveChat: number[];
  selectArchiveChat: (chatId?: number) => void;
}

export const Context = React.createContext<ContextProps | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [selectedHistoryChat, setSelectedHistoryChat] = useState<number[]>([]);
  const [selectedArchiveChat, setSelectedArchiveChat] = useState<number[]>([]);

  const selectHistoryChat = (chatId?: number) => {
    if (!chatId) return;

    if (selectedHistoryChat.includes(chatId)) {
      setSelectedHistoryChat((prev) => prev.filter((id) => id !== chatId));
      return;
    }

    setSelectedHistoryChat((prev) => [...prev, chatId]);
  };

  const selectArchiveChat = (chatId?: number) => {
    if (!chatId) return;

    if (selectedArchiveChat.includes(chatId)) {
      setSelectedArchiveChat((prev) => prev.filter((id) => id !== chatId));
      return;
    }

    setSelectedArchiveChat((prev) => [...prev, chatId]);
  };

  return (
    <Context.Provider
      value={{
        selectHistoryChat,
        selectedHistoryChat,
        selectArchiveChat,
        selectedArchiveChat,
      }}
    >
      {children}
    </Context.Provider>
  );
}
