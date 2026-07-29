import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KopConnect.WH — Live Newsroom",
  description: "A streamlined Liverpool FC transfer newsroom with verified stories, transfer stages and timezone-aware fixtures.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "KopConnect.WH — Live Newsroom",
    description: "Liverpool transfer news and fixtures, clearly sourced.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
