import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Heading() {
  return (
    <div className="text-foreground">
      <h1 className="mb-1 text-4xl font-semibold">My Profile</h1>
      <p>Update your personal info to keep your account secure.</p>
      <div className="mt-20 flex items-center justify-between bg-card p-5 rounded-lg">
        <div className="flex items-center gap-5">
          <Avatar className="h-[70px] w-[70px]">
            <AvatarImage src="https://i.postimg.cc/zvjh9jC2/Screenshot-9.png" alt="User Avatar" />
            <AvatarFallback>AF</AvatarFallback>
          </Avatar>
          <span>
            <h1 className="text-lg font-medium">Atik Faysal</h1>
            <p className="font-normal">faysal@gmail.com</p>
          </span>
        </div>
        <Button className="bg-secondary text-gray-500" variant="secondary">Change Password</Button>
      </div>
    </div>
  );
}
