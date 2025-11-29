import Header from "@/components/Header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About - Experto.Live",
  description:
    "Learn more about Experto.Live - A modern Next.js application with Docker development environment",
};

// Force dynamic rendering because Header uses cookies
export const dynamic = "force-dynamic";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
