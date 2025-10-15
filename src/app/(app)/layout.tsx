import "../globals.css";
import { Toaster } from "sonner";
import { geist } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "betterquest",
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
        <Toaster />
      </body>
    </html>
  );
}
