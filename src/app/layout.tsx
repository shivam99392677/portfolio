import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, SCROLL_SENTINEL_ID } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorLoader } from "@/components/layout/CursorLoader";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.heroSubline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Sentinel for Navbar's scroll-threshold detection (animations.md §5.1, P-2) */}
        <div id={SCROLL_SENTINEL_ID} className="absolute top-20 h-px w-px" aria-hidden="true" />
        <Navbar logo={site.name} links={site.navLinks} ctaLabel="Contact" ctaHref="/contact" />
        <div className="flex-1">{children}</div>
        <Footer
          closingStatement={site.footerClosingStatement}
          email={site.email}
          socialLinks={site.socialLinks}
          copyrightLine={site.copyrightLine}
          creditLine={site.creditLine}
        />
        <CursorLoader />
      </body>
    </html>
  );
}
