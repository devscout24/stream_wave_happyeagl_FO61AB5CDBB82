import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/actions";
import Link from "next/link";

export default async function Header() {
  const user = await getUserProfile(); // Assume this function fetches the user profile

  console.log("user in header", user);

  return (
    <header>
      <nav>
        <div className="container mx-auto max-md:px-2 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 py-4">
              {/* <Link href="/about">
                <Icon src="/menu.svg" />
              </Link> */}
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link href="/auth/sign-in">
                <Button variant="default">
                  Sign Out <Icon src="/login-arrow.svg" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
