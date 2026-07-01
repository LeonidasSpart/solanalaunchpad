import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://zrp.one"),
  title: {
    default: "ZRP — Free Devnet Testing Solana Token Launcher",
    template: "%s | ZRP",
  },
  description: "Create Solana SPL tokens in 60 seconds. Free devnet testing, 0.15 SOL mainnet, open-source code. Mint, revoke authorities, burn LP. No hidden fees, full custody.",
  keywords: [
    "Solana token creator",
    "SPL token launcher",
    "create token on Solana",
    "Solana devnet testing free",
    "no code token mint Solana",
    "revoke mint authority Solana",
    "burn LP tokens Solana",
    "Solana token launchpad",
    "token metadata IPFS",
    "Solana token fees",
  ],
  authors: [{ name: "ZRP", url: "https://zrp.one" }],
  creator: "ZRP",
  publisher: "ZRP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zrp.one",
    siteName: "ZRP Solana Token Launcher",
    title: "ZRP — Create Solana Tokens in 60 Seconds",
    description: "Free devnet testing. 0.15 SOL mainnet. Open-source. No hidden fees.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZRP Solana Token Launcher - Free Devnet Testing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zrp_ai",
    creator: "@zrp_ai",
    title: "ZRP — Solana Token Launcher",
    description: "Free devnet testing. Create tokens in 60 seconds. Open-source.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://zrp.one",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "msapplication-TileColor": "#FF2D2D",
    "theme-color": "#050505",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZRP",
  alternateName: "ZRP Token Launcher",
  url: "https://zrp.one",
  logo: "https://zrp.one/logo.png",
  sameAs: [
    "https://x.com/zrp_ai",
    "https://discord.com/invite/W4qS4xkbn",
    "https://github.com/LeonidasSpart/solanalaunchpad",
    "https://t.me/AIZRP",
  ],
  description: "Open-source no-code Solana token launcher with free devnet testing.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZRP",
  url: "https://zrp.one",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://zrp.one/faq?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
