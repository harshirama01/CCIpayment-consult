"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * Google tag (GA4) and Meta Pixel. Each loads only when its ID is set in the
 * environment (see .env.example), so nothing is tracked until you opt in.
 * IDs are validated before being written into the inline scripts.
 */
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();
const META_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();
const gaOk = /^(G|GT|AW)-[A-Z0-9]{4,}$/.test(GA_ID);
const metaOk = /^\d{6,20}$/.test(META_ID);

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  // Meta Pixel fires PageView on first load from its snippet; send one for each later client-side navigation.
  // (GA4 detects history changes itself via Enhanced Measurement.)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (metaOk) window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      {gaOk ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
      {metaOk ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
