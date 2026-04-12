import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

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
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <a href="#main-content" className="skipLink">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
