import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JP Stucco Repair — Orange County's Most Referred Stucco Pro",
  description:
    "Permanent, high-end stucco restoration for the OC Coast. 3,500+ homes repaired with a 5.0★ Google rating. Root cause stucco repair that lasts. Free assessments available.",
  keywords: [
    "stucco repair",
    "Orange County",
    "stucco patches",
    "weep screed repair",
    "smooth stucco",
    "OC Coast",
    "stucco restoration",
    "stucco damage",
    "mold behind stucco",
    "Newport Beach stucco",
    "Huntington Beach stucco",
  ],
  authors: [{ name: "JP Stucco Repair" }],
  creator: "JP Stucco Repair",
  publisher: "JP Stucco Repair",
  metadataBase: new URL("https://jpstuccorepair.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/jp-logo.png",
    apple: "/jp-logo.png",
  },
  openGraph: {
    title: "JP Stucco Repair — Orange County's Most Referred Stucco Pro",
    description:
      "Permanent, high-end stucco restoration for the OC Coast. 3,500+ homes repaired. 5.0★ Google rating.",
    siteName: "JP Stucco Repair",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/hero-home.png",
        width: 1200,
        height: 630,
        alt: "JP Stucco Repair — Professional Stucco Restoration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JP Stucco Repair — Orange County's Most Referred Stucco Pro",
    description:
      "Permanent, high-end stucco restoration for the OC Coast. 3,500+ homes repaired.",
    images: ["/hero-home.png"],
  },
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
};

/* JSON-LD Structured Data for Local Business */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "JP Stucco Repair",
  description:
    "Permanent, high-end stucco restoration for the OC Coast. Root cause stucco repair that lasts.",
  telephone: "714-936-7013",
  url: "https://jpstuccorepair.com",
  image: "https://jpstuccorepair.com/hero-home.png",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orange County",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Newport Beach" },
    { "@type": "City", name: "Huntington Beach" },
    { "@type": "City", name: "Seal Beach" },
    { "@type": "City", name: "Costa Mesa" },
    { "@type": "City", name: "Laguna Beach" },
    { "@type": "City", name: "Dana Point" },
    { "@type": "City", name: "San Clemente" },
    { "@type": "City", name: "Corona del Mar" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "127",
  },
  serviceType: [
    "Stucco Repair",
    "Stucco Patching",
    "Weep Screed Repair",
    "Re-Stucco",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
