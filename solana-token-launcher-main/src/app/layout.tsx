import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZRP - Launch & Manage Solana Tokens",
  description: "Create, mint, and launch your own Solana tokens with ZRP. Fast, simple, and powerful",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
