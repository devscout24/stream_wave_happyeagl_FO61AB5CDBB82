import { Switch } from "@/components/ui/switch";

interface SaveChatHistoryProps {
  isSaveChatHistory?: boolean;
}

export default function SaveChatHistory({
  isSaveChatHistory,
}: SaveChatHistoryProps) {
  return <Switch checked={isSaveChatHistory} />;
}
