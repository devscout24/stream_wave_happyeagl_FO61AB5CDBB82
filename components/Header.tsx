import MobileSidebar from "@/app/chat/_components/MobileSidebar";
import Profile from "@/components/Profile";
import { getUserProfile } from "@/lib/actions";
import Link from "next/link";
import Icon from "./Icon";
import Logo from "./Logo";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";

export default async function Header() {
  const user = await getUserProfile(); // Assume this function fetches the user profile

  return user ? (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-3xl font-semibold">AI Chat</h1>

            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Profile profile={user} avatarOnly />
              </Link>

              <MobileSidebar/>
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
              <Link href="/about">
                <Icon src="/menu.svg" />
              </Link>
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link href="/auth/sign-in">
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
