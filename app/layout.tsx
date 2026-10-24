import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RouteEffects from "@/components/RouteEffects";
import "@fontsource/unbounded/500.css";
import "@fontsource/unbounded/600.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ccipayments.com.ng"),
  title: "CCI Payments | International Payments Made Easier",
  description: "CCI Payments helps individuals and businesses make and receive international payments.",
  openGraph: {
    title: "CCI Payments",
    description: "Making international payments easier, faster and more affordable.",
    type: "website",
    url: "https://ccipayments.com.ng",
  },
};

export const viewport: Viewport = {
  themeColor: "#050818",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RouteEffects />
      </body>
    </html>
  );
}
