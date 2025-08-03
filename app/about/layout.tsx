import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About - Capital H",
  description:
    "Learn more about Capital H - A modern Next.js application with Docker development environment",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
