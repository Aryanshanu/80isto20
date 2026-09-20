import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Yellowtail } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yellowtail = Yellowtail({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const SITE_TITLE = "80isto20 | Nutritious Meals • Happier You";
const SITE_DESCRIPTION =
  "Premium high-protein meal subscriptions in Hyderabad. 45+ grams of protein per meal, zero preservatives, and free delivery within 6 km. Veg & Non-Veg plans, weekly or monthly, plus ₹229 trial meals — no subscription required.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | 80isto20",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "80isto20",
    "high protein meals",
    "meal subscription Hyderabad",
    "healthy tiffin service",
    "diet meal delivery",
    "trial meal",
    "veg non-veg meal plans",
  ],
  authors: [{ name: "80isto20" }],
  applicationName: "80isto20",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "80isto20",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#112233",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${yellowtail.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
