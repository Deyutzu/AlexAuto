import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingUi from "@/components/FloatingUi";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AlexAuto | Piese Auto pe bază de Ofertă & Asigurări RCA",
  description:
    "Piese auto identificate după seria de șasiu (VIN) și calculator comparativ RCA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-primary antialiased selection:bg-accent selection:text-bg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingUi />
      </body>
    </html>
  );
}
