import type { Metadata } from "next";
import Header from "./_compoments/Header";

export const metadata: Metadata = {
  title: "Home - Capital H",
  description:
    "Welcome to Capital H - A modern Next.js application with Docker development environment",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Home-specific header */}
      <Header />
      {/* Main content area */}
      <main className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
