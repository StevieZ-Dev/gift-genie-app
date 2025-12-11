import type { Metadata } from "next";

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
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      {/* GOOGLE ADSENSE SCRIPT */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6068418321673019"
        crossOrigin="anonymous"
      />
      {children}
    </div>
  );
}