import type { Metadata } from "next";
import DesktopSidebar from "./_components/DesktopSidebar";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Home - Capital H",
  description:
    "Welcome to Capital H - A modern Next.js application with Docker development environment",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10">
        <div className="hidden md:col-span-3 md:block">
          <DesktopSidebar />
        </div>

        <div className="col-span-12 flex flex-col justify-center md:col-span-9">
          <Header />
          <div className="min-h-screen">{children}</div>
        </div>
      </main>
    </>
  );
}
