import type { Metadata } from "next";
import "./globals.css"; // <--- UNCOMMENT THIS LINE IN VS CODE TO RESTORE COLORS

export const metadata: Metadata = {
  title: "Gift Genie AI",
  description: "AI-Powered Gift Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE ADSENSE SCRIPT */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6068418321673019"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}