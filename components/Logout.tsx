"use client";
import Icon from "@/components/Icon";
import { DrawerClose } from "@/components/ui/drawer";
import { logoutUser } from "@/lib/actions";
import { toast } from "sonner";

export default function Logout() {
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

  return (
    <DrawerClose className="flex items-center gap-2" onClick={handleLogout}>
      <Icon src="/logout.svg" className="h-6 w-6" />
      <span>Sign Out</span>
    </DrawerClose>
  );
}
