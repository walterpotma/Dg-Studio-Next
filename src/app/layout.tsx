import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { SearchProvider } from '../../Context/SearchContext'; // Atualize o caminho conforme necessário

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DG Studio",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="https://cdn0.iconfinder.com/data/icons/back-to-school/90/circle-school-learn-study-subject-literature-book-512.png" type="image/x-icon" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8154336835421480"
        crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <SearchProvider>
          {children}
        </SearchProvider>
        <Analytics />
      </body>
    </html>
  );
}
