"use client";

import MobileSidebar from "@/app/chat/_components/MobileSidebar";
import Profile from "@/components/Profile";
import { getUserProfile } from "@/lib/actions";
import { UserProfile } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);
  // Assume this function fetches the user profile

  const searchParams = useSearchParams();
  const sidebar = searchParams.get("sidebar") === "true";

  useEffect(() => {
    async function fetchUser() {
      const userProfile = await getUserProfile();
      setUser(userProfile);
    }
    fetchUser();
  }, []);

  return user ? (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              {sidebar && <Logo className="h-12 w-12" />}
              <h1 className="text-3xl font-semibold">AI Chat</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Profile profile={user} avatarOnly />
              </Link>

              <MobileSidebar user={user} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  ) : (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-4">
              <Sidebar />
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link href="?modal=sign-in">
                <Button variant="default">
                  Sign In <Icon src="/login-arrow.svg" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
