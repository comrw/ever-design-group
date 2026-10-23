import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
