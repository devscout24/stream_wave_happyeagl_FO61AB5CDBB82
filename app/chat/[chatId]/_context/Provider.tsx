"use client";

import { IMessage } from "@/types";
import React, { useOptimistic, useState } from "react";

interface ContextValue {
  chats: IMessage[];
  addOptimisticChat: (chat: IMessage) => void;
  setChats: (chats: IMessage[]) => void;
  state: IMessage[];
  setState: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

export const Context = React.createContext<ContextValue | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<IMessage[]>([]);

  const [optimisticChats, addOptimisticChat] = useOptimistic<
    IMessage[],
    IMessage
  >(state, (currentChats, newChat) => [...currentChats, newChat]);

  // This should update the real state, which will sync with optimistic state
  const setChats = (newChats: IMessage[]) => {
    setState(newChats);
  };

  const contextValue: ContextValue = {
    chats: optimisticChats, // This will show both real state + optimistic additions
    addOptimisticChat, // For adding optimistic messages
    setChats, // For updating real state
    state,
    setState,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

// Custom hook to use the context
export function useChat() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useChat must be used within a Provider");
  }
  return context;
}
