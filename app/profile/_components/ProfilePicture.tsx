"use client";

import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/btn";
import config from "@/config";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateProfilePicture } from "./action";

export default function ProfilePicture({
  picture,
  name,
}: {
  picture: string;
  name: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handler to accept only image files and (optionally) only one file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept only image files
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = ""; // Reset input
      return;
    }

    try {
      toast.promise(updateProfilePicture(file), {
        loading: "Uploading...",
        success: "Upload successful!",
        error: "Upload failed.",
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-[70px] w-[70px]">
        <AvatarImage src={`${config.assetUrl}${picture}`} alt={name} />
        <AvatarFallback className="bg-background">{name}</AvatarFallback>
      </Avatar>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        id="avatar-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="ghost"
        className="absolute right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white"
        onClick={() => {
          inputRef.current?.click();
        }}
        type="button"
        disabled={isLoading}
      >
        <Icon src="/camera-bold.svg" className="size-5" />
      </Button>
    </div>
  );
}
