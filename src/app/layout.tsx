import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHIFT Space Digital Core",
  description: "Frontend-only MVP for a developer company digital core",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
