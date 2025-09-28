"use client";

import Icon from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/actions";
import React from "react";
import { toast } from "sonner";

const Logout = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    isProfile?: boolean;
    isCollapsed?: boolean;
  }
>(({ isProfile = false, isCollapsed = true, onClick, ...props }, ref) => {
  const handleLogout = async () => {
    const logoutPromise = async () => {
      try {
        const result = await logoutUser();

        // Check if it's a NEXT_REDIRECT error (successful redirect)
        if (result?.message) {
          return result.message;
        }

        return "Logged out successfully!";
      } catch (error) {
        // Check if it's a NEXT_REDIRECT error (successful redirect)
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
          // This is actually success - redirect is happening
          return "Logged out successfully!";
        }

        // Re-throw actual errors
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleLogout();
    onClick?.(e);
  };

  return isProfile ? (
    <Button
      ref={ref}
      onClick={handleClick}
      variant="default"
      {...props}
      className="cursor-pointer"
    >
      Sign out <Icon src="/login-arrow.svg" />
    </Button>
  ) : (
    <Button
      ref={ref}
      variant="ghost"
      className="dark:text-secondary hover:text-foreground hover:dark:text-secondary mt-4 cursor-pointer !p-0 hover:bg-transparent hover:dark:bg-transparent"
      onClick={handleClick}
      {...props}
    >
      <Icon src="/logout.svg" className="size-6" />
      <span className="text-base">{isCollapsed && "Sign Out"}</span>
    </Button>
  );
});

Logout.displayName = "Logout";

export default Logout;
