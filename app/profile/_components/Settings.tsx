import { getSaveChatHistory } from "./action";
import SaveChatHistory from "./SaveChatHistory";

export default async function Settings() {
  const res = await getSaveChatHistory();

  // const handleClearHistory = () => {
  //   if (confirm("Are you sure you want to clear your chat history?")) {
  //     console.log("Chat history cleared");
  //   }
  // };

  // const handleDeleteProfile = () => {
  //   if (confirm("Are you sure you want to delete your profile?")) {
  //     console.log("Profile deleted");
  //   }
  // };

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
        {/* <button
          className="p-0 cursor-pointer font-medium"
          onClick={handleClearHistory}
        >
          Clear Chat History
        </button> */}
      </div>

      {/* Delete Profile */}
      <div className="border-accent flex flex-row items-center justify-between border-b p-3">
        {/* <button
          className="p-0 cursor-pointer  hover:text-red-600 text-red-700 font-medium"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button> */}
      </div>
    </div>
  );
}
