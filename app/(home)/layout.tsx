import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Experto.Live",
  description:
    "Welcome to Experto.Live - A modern Next.js application with Docker development environment",
};

// Force dynamic rendering because Header uses cookies
export const dynamic = "force-dynamic";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center">
        {children}
      </main>
    </>
  );
}
