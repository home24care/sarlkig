import type { Metadata } from "next";
import { Archivo_Narrow, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { site } from "@/lib/site";
import { buildNav } from "@/lib/nav";

const display = Archivo_Narrow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display" });
const text = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-text" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website" },
  robots: { index: true, follow: true },
  // Merchant Center / Search Console HTML-tag verification: set GOOGLE_SITE_VERIFICATION in Vercel to the tag's content value.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = buildNav();
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CartProvider>
          <Header nav={nav} />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
