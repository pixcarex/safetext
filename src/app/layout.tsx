import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spot the Scam: Text Message Trainer",
  description:
    "Practice telling safe texts from scams with large text, simple feedback, and plain-English tips.",
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
