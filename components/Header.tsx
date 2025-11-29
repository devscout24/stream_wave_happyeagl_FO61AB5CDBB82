"use client";

import useProvider from "@/Context/use-provider";
import MobileSidebar from "@/app/chat/_components/MobileSidebar";
import Profile from "@/components/Profile";
import { getUserProfile } from "@/lib/actions";
import { UserProfile } from "@/types";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);

  const { isCollapsed } = useProvider();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const userProfile = await getUserProfile();
      setUser(userProfile);
    });
  }, []);

  if (isPending) {
    return (
      <header>
        <nav>
          <div className="container mx-auto max-md:px-2">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 animate-pulse rounded bg-gray-200" />
                <h1 className="text-3xl font-semibold">AI Chat</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return user ? (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              {isCollapsed && (
                <React.Suspense
                  fallback={<div className="h-12 w-12 rounded bg-gray-200" />}
                >
                  <Logo className="h-12 w-full" />
                </React.Suspense>
              )}
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
                <Button variant="default" className="cursor-pointer">
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
