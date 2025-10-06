import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diário com Deus - Devocional em 7-10 minutos",
  description: "Devocional guiado e prático para sentir a presença de Deus diariamente",
  manifest: "/manifest.json",
  themeColor: "#cc3f39",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Diário com Deus",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

