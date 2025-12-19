import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ReplyDEX | AI-Powered Review Response Generator",
  description: "Generate perfect, human-like replies to customer reviews in seconds. Choose your tone, paste a review, and let AI craft professional responses instantly.",
  keywords: ["AI review response", "customer review reply", "review management", "AI reply generator", "automated responses"],
  authors: [{ name: "ReplyDEX" }],
  openGraph: {
    title: "ReplyDEX | AI Review Response Generator",
    description: "Automate your customer interactions with context-aware, personalized AI responses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReplyDEX | AI Review Response Generator",
    description: "Generate perfect replies to customer reviews in seconds with AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="36ecbc85-5f35-4f50-b1b5-eb64af3d9b1c"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
