import "./globals.css";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
//hi this was written by a real dudde :D

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
    <html lang="en">
      <body className={manrope.className}>
        {children}
      </body>
    </html>
    
  );
}
