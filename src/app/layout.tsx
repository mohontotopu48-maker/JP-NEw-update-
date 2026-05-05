import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Stucco Repair — Orange County's Most Referred Stucco Pro",
  description: "Permanent, high-end stucco restoration for the OC Coast. 3,500+ homes repaired with a 5.0★ Google rating. Root cause stucco repair that lasts.",
  keywords: ["stucco repair", "Orange County", "stucco patches", "weep screed repair", "smooth stucco", "OC Coast"],
  authors: [{ name: "JP Stucco Repair" }],
  icons: {
    icon: "/jp-logo.png",
  },
  openGraph: {
    title: "JP Stucco Repair — Orange County's Most Referred Stucco Pro",
    description: "Permanent, high-end stucco restoration for the OC Coast.",
    siteName: "JP Stucco Repair",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
