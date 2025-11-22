import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-Do List App",
  description: "To-Do List Application by Sunny Ju",
};

export default function RootLayout({
  children,
}: {
  //React.ReactNode : Accepts any renderable React content (components, text, HTML elements, etc.)
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
