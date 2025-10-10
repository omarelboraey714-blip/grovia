import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grovia — Smart Marketing That Drives Real Growth",
  description:
    "Grovia is a data-driven digital marketing agency helping brands grow through creative campaigns, social media marketing, SEO, paid ads, and web development. We turn visibility into measurable success.",
  keywords: [
    "Grovia marketing agency",
    "digital marketing",
    "social media marketing",
    "SEO services",
    "paid advertising",
    "branding agency",
    "content marketing",
    "performance marketing",
    "growth marketing",
    "web development",
  ],
  authors: [{ name: "Grovia Marketing Agency" }],
  openGraph: {
    title: "Grovia — Data-Driven Marketing for Ambitious Brands",
    description:
      "We craft smart marketing strategies that boost brand awareness, drive conversions, and grow your business online.",
    url: "https://grovia.agency", // ← غيّرها لرابط موقعك الفعلي لاحقًا
    siteName: "Grovia Marketing",
    images: [
      {
        url: "/og-image.jpg", // ← غيّرها لصورة OG حقيقية
        width: 1200,
        height: 630,
        alt: "Grovia Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grovia — Smart Marketing That Delivers Results",
    description:
      "Partner with Grovia to grow your business using data, creativity, and performance-focused strategies.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://grovia.agency"), // ← غيّرها عند الإطلاق الفعلي
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-bg antialiased">
        {" "}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
