import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
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
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
