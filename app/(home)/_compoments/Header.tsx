import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="container mx-auto lg:max-w-5xl">
          <Logo />
        </div>
      </nav>
    </header>
  );
}
