import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Icon from "./Icon";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0 hover:bg-transparent">
          <Icon src="/menu.svg" className="size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-xs border-none sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription hidden />
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <SheetClose asChild>
            <Link href="/" className="hover:bg-muted p-2 hover:underline">
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about" className="hover:bg-muted p-2 hover:underline">
              About Us
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/chat/history"
              className="hover:bg-muted p-2 hover:underline"
            >
              Chat History
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/chat/archive"
              className="hover:bg-muted p-2 hover:underline"
            >
              Chat Archive
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
