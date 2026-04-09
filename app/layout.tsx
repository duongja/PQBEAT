/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PQBEAT",
    template: "%s | PQBEAT",
  },
  description:
    "A public analytics platform for tracking quantum readiness, cryptographic exposure, and post-quantum migration pressure across the Ethereum ecosystem.",
  icons: {
    icon: [{ url: "/pqbeat-wordmark.svg", type: "image/svg+xml" }],
    shortcut: "/pqbeat-wordmark.svg",
    apple: "/pqbeat-wordmark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <main className="min-h-screen overflow-x-clip">{children}</main>
      </body>
    </html>
  );
}
