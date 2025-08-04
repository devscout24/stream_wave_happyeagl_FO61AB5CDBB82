import Logo from "@/components/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="space-y-5 py-8 max-sm:px-2">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between lg:max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-2 md:items-start">
          <Logo className="size-16 md:size-20" />
          <p className="text-paragraph text-xs md:text-sm">
            Smarter AI conversations
          </p>
        </div>

        <ul className="flex flex-col items-center justify-center gap-2 pt-4 sm:flex-row sm:gap-8 md:gap-16">
          <li className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
          </li>
          <li className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/terms" className="hover:underline">
              Chat Library
            </Link>
          </li>
          <li className="text-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/contact" className="hover:underline">
              Chat Archive
            </Link>
          </li>
        </ul>
      </div>
      <p className="text-center text-xs text-gray-500 md:text-sm dark:text-gray-400">
        &copy; {new Date().getFullYear()} Capital H. All rights reserved.
      </p>
    </footer>
  );
}
