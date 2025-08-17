 const [selectedIds, setSelectedIds] = useState<number[]>([]);

  console.log(selectedIds);

  const toggleId = (chatId: number) => {
    setSelectedIds((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };