import { getSaveChatHistory } from "./action";
import ClearAllChatHistory from "./ClearAllChatHistory";
import DeleteProfile from "./DeleteProfile";
import SaveChatHistory from "./SaveChatHistory";

export default async function Settings() {
  const res = await getSaveChatHistory();

  return (
    <div className="bg-card w-1/2 space-y-2 rounded-lg p-5">
      <h1 className="mb-4 text-2xl font-medium">Settings</h1>

      {/* Save Chat History */}
      <div className="border-accent flex flex-row items-center justify-between border-b p-3">
        <div className="">
          <span className="font-medium">Save Chat History :</span>
        </div>
        <SaveChatHistory isSaveChatHistory={res?.save_chat_history} />
      </div>

      {/* Clear Chat History */}
      <div className="border-accent flex flex-row items-center justify-between border-b p-3">
        <ClearAllChatHistory />
      </div>

      {/* Delete Profile */}
      <div className="border-accent flex flex-row items-center justify-between border-b p-3">
        <DeleteProfile />
      </div>
    </div>
  );
}
