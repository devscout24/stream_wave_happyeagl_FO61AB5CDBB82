import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/">
      <Image
        src="/LogoTransBG.png"
        alt="Logo"
        width={1280}
        height={720}
        className={cn("h-8 w-full", className)}
      />
    </Link>
  );
}
