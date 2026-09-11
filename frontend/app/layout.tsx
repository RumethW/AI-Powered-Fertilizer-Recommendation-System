import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fertilizer Recommendation System",
  description: "AI-Powered Fertilizer Recommendation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

