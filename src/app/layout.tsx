import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import SmoothScroll from "@/components/organism/SmoothScroll"; 
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orizon - Digital Ecosystem",
  description: "Advanced Deep Space Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}