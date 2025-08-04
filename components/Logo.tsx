import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "./Icon";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/">
      <Icon src="/logo.svg" className={cn("h-12 w-12", className)} />
    </Link>
  );
}
