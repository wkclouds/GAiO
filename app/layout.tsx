import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsEvents } from "@/components/analytics-events";
import { StyledComponentsRegistry } from "@/components/styled-components-registry";
import { buildSiteJsonLd } from "@/lib/json-ld";
import { siteName, siteTagline, siteUrl } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | AI Search Visibility & Generative Engine Optimization`,
    template: `%s | ${siteName}`,
  },
  description: siteTagline,
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} | AI Search Visibility & Generative Engine Optimization`,
    description: siteTagline,
    url: siteUrl,
    images: [{ url: `${siteUrl}/og.png`, alt: "GAiO Authority Engine — build authority that compounds" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | AI Search Visibility & Generative Engine Optimization`,
    description: siteTagline,
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  other: {
    "llms-txt": `${siteUrl}/llms.txt`,
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f7f9fc" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = buildSiteJsonLd();

  return (
    <html lang="en">
      <body className={`${sora.variable} ${plusJakarta.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <AnalyticsEvents />
        <Analytics />
      </body>
    </html>
  );
}
