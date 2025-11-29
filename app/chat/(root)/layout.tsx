import Header from "@/components/Header";
import type { Metadata } from "next";
import DesktopSidebar from "../_components/DesktopSidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home - Experto.Live",
  description:
    "Welcome to Experto.Live - A modern Next.js application with Docker development environment",
};

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-h-dvh gap-10 max-2xl:px-2 lg:max-w-[1440px] lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr_auto]">
      <DesktopSidebar />
      <Header />
      <main>{children}</main>
    </div>
  );
}
