import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL } from "@/config/env-config";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import "./globals.css";

const geistSans = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL), // <-- Set your production domain here
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
  openGraph: {
    title: "Capital H – Conversational AI Chatbot",
    description:
      "Chat naturally with a smart assistant. Safe, relevant, and human-like.",
    url: SITE_URL,
    siteName: "Capital H",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Capital H Chatbot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capital H – Conversational AI Chatbot",
    description:
      "Chat naturally with a smart assistant. Safe, relevant, and human-like.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
