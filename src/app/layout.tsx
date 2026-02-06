import "./globals.css";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jefferis Software Solutions",
  description: "Websites & social for small businesses",
  icons: {
    icon: "/jsslogo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NH48FM1Q53"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NH48FM1Q53');
            `,
          }}
        />
      </head>
      <body className={manrope.className}>
        {children}
      </body>
    </html>
  );
}
