import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "../app/(home)/_components/ThemeToggler";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2 lg:max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-4">
              <Link href="/about">
                <Icon src="/menu.svg" />
              </Link>
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link href="/login">
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
