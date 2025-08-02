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
      <main className="home-content">{children}</main>
      {/* Home-specific footer */}
      <footer className="bg-card mt-auto border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="text-muted-foreground text-center text-sm">
            <p>
              &copy; 2025 Capital H. Built with Next.js, Docker, and auto-sync
              magic.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
