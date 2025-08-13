import IPInfoProvider from "@/components/IPInfoProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import config from "@/config";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(config.domain), // <-- Set your production domain here
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
  openGraph: {
    title: "Capital H – Conversational AI Chatbot",
    description:
      "Chat naturally with a smart assistant. Safe, relevant, and human-like.",
    url: config.domain,
    siteName: "Capital H",
    images: [
      {
        url: `${config.domain}/og-image.png`,
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} id="scrollbar">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {modal}
          <IPInfoProvider>{children}</IPInfoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
