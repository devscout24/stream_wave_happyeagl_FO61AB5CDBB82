import { useContext } from "react";
import { Context } from "./Provider";

export const useCustomContext = () => {
  const context = useContext(Context);
  if (!context) {
    // Instead of throwing, return null - this allows the hook to be used
    // outside of the Provider (like on home page)
    return null;
  }

  // Map the new API to what components expect
  return {
    chats: context.chats,
    setChats: context.setChats, // This now properly maps to setState via setChats
    addOptimisticChat: context.addOptimisticChat,
    state: context.state,
    setState: context.setState,
  };
};
