"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { logoutUser } from "@/lib/actions";
import React from "react";
import { toast } from "sonner";

const Logout = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    isProfile?: boolean;
    isCollapsed?: boolean;
  }
>(({ isProfile = false, isCollapsed = true, ...props }, ref) => {
  const handleLogout = async () => {
    const logoutPromise = async () => {
      try {
        const result = await logoutUser();

        if (result?.message) {
          return result.message;
        }

        return "Logged out successfully!";
      } catch (error) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          return "Logged out successfully!";
        }
        throw error instanceof Error ? error : new Error("Logout failed");
      }
    };

    toast.promise(logoutPromise(), {
      loading: "Logging out...",
      success: (message) => message,
      error: (error) => {
        return error instanceof Error
          ? error.message
          : "Logout failed. Please try again.";
      },
    });
  };

  return isProfile ? (
    <Button ref={ref} onClick={handleLogout} variant="default" {...props}>
      Sign out <Icon src="/login-arrow.svg" />
    </Button>
  ) : (
    <DrawerClose asChild>
      <Button
        ref={ref}
        variant="ghost"
        className="dark:text-secondary hover:text-foreground hover:dark:text-secondary mt-4 cursor-pointer !p-0 hover:bg-transparent hover:dark:bg-transparent"
        onClick={handleLogout}
        {...props}
      >
        <Icon src="/logout.svg" className="size-6" />
        <span className="text-base">{isCollapsed && "Sign Out"}</span>
      </Button>
    </DrawerClose>
  );
});

Logout.displayName = "Logout";

export default Logout;
