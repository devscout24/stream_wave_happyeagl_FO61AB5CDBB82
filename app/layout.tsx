import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://your-domain.com"), // <-- Set your production domain here
  title: "Capital H – Conversational AI Chatbot",
  description:
    "A minimal, user-friendly AI chatbot website with guiderails for safe, smart conversations.",
  openGraph: {
    title: "Capital H – Conversational AI Chatbot",
    description:
      "Chat naturally with a smart assistant. Safe, relevant, and human-like.",
    url: "https://your-domain.com",
    siteName: "Capital H",
    images: [
      {
        url: "/og-image.png",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
