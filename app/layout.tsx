import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "./auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MH Skincare",
  description: "A one stop shop for all things skincare.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} has-[.cart]:overflow-hidden`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
