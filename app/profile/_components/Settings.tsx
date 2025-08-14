"use client";

import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";

export default function Settings() {
  const [saveChatHistory, setSaveChatHistory] = useState(false);

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your chat history?")) {
      console.log("Chat history cleared");
    }
  };

  const handleDeleteProfile = () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      console.log("Profile deleted");
    }
  };

  return (
    <div className="bg-card w-1/2 rounded-lg p-5 space-y-2">
      <h1 className="mb-4 text-2xl font-medium">Settings</h1>

      {/* Save Chat History */}
      <div className="flex flex-row items-center justify-between border-b border-accent p-3">
        <div className="">
          <span className="font-medium">Save Chat History :</span>
        </div>
        <Switch
          checked={saveChatHistory}
          onCheckedChange={setSaveChatHistory}
        />
      </div>

      {/* Clear Chat History */}
      <div className="flex flex-row items-center justify-between border-b border-accent p-3">
        <button
          className="p-0  font-medium"
          onClick={handleClearHistory}
        >
          Clear Chat History
        </button>
      </div>

      {/* Delete Profile */}
      <div className="flex flex-row items-center justify-between border-b border-accent p-3">
        <button
          className="p-0  hover:text-red-800 text-red-700 font-medium"
          onClick={handleDeleteProfile}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}
