import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import IntroLoader from "@/components/IntroLoader";
import RouteLine from "@/components/RouteLine";
import { introBootScript } from "@/lib/intro";
import "./globals.css";
import "./intro.css";

const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ever Design Group — Hospitality. Rooted in place.",
  description:
    "Ever Design Group plans, designs, engineers and builds hotels, resorts, retreats, eco-parks and villas from Kigali, Rwanda.",
  icons: { icon: "/brand/ever-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#102e2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The boot script sets data-intro attributes on <html> before hydration.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <IntroLoader />
        <RouteLine />
        {children}
      </body>
    </html>
  );
}
