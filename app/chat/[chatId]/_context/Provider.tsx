"use client";

import { ChatResponse, Message } from "@/types";
import React, { useOptimistic, useState } from "react";

interface ContextValue {
  chats: (ChatResponse | Message)[];
  addOptimisticChat: (chat: ChatResponse | Message) => void;
  setChats: (chats: (ChatResponse | Message)[]) => void;
  state: (ChatResponse | Message)[];
  setState: React.Dispatch<React.SetStateAction<(ChatResponse | Message)[]>>;
}

export const Context = React.createContext<ContextValue | undefined>(undefined);

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<(ChatResponse | Message)[]>([]);

  const [optimisticChats, addOptimisticChat] = useOptimistic<
    (ChatResponse | Message)[],
    ChatResponse | Message
  >(state, (currentChats, newChat) => [...currentChats, newChat]);

  // This should update the real state, which will sync with optimistic state
  const setChats = (newChats: (ChatResponse | Message)[]) => {
    console.log("Provider setChats called with:", newChats.length, "messages");
    console.log("Current state length:", state.length);
    console.log("Setting new state...");
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
