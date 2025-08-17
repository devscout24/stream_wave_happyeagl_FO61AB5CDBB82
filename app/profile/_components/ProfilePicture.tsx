"use client";

import Icon from "@/components/Icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/btn";
import { useRef } from "react";
import { updateProfilePicture } from "./action";

export default function ProfilePicture({
  picture,
  name,
}: {
  picture: string;
  name: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handler to accept only image files and (optionally) only one file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept only image files
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = ""; // Reset input
      return;
    }

    // Optionally, you can add more checks here (e.g., file size, dimensions)

    // Handle the profile picture upload here
    // Example: uploadProfilePicture(file);
    console.log("Selected profile picture:", file);

    try {
      await updateProfilePicture(file);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-[70px] w-[70px]">
        <AvatarImage src={picture} alt={name} />
        <AvatarFallback>{name}</AvatarFallback>
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
      >
        <Icon src="/camera-bold.svg" className="size-5" />
      </Button>
    </div>
  );
}
