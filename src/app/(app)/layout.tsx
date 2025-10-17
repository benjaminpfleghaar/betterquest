import "../globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { geist, jakarta } from "@/lib/fonts";

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
      <body className={`${geist.variable} ${jakarta.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
