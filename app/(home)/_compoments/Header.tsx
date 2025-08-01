import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./ThemeToggler";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container mx-auto lg:max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-4">
              <Icon src="/menu.svg" />
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="default">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
