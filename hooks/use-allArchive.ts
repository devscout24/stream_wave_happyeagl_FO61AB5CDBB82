import { useState } from "react";

const useAllArchive = (allIds: number[]) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  

  // Toggle single ID
  const toggleId = (chatId: number) => {
    setSelectedIds((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId) // remove if exists
        : [...prev, chatId]                  // add if not exists
    );
  };

  // Select all IDs
  const selectAll = () => {
    setSelectedIds(allIds);
  };

  // Deselect all IDs
  const deselectAll = () => {
    setSelectedIds([]);
  };

  return { selectedIds, toggleId, selectAll, deselectAll };
};

export default useAllArchive;
