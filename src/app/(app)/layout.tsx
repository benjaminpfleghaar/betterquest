import "../globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Lorem ipsum dolor sit amet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
