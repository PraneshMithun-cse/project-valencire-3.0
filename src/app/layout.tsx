import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import AppShell from "@/components/AppShell";



export const metadata: Metadata = {
  title: "VALENCIRE | Luxury Menswear",
  description:
    "Premium luxury menswear. Defining modern editorial style with precision tailoring and refined materials.",
  keywords: "luxury menswear, premium fashion, designer clothing, Valencire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="font-ui min-h-screen flex flex-col bg-white text-black antialiased"
      >
        <CartProvider>
          <AppShell>
            <div className="push-content-wrapper">
              <Navbar />
              <main className="flex-grow">{children}</main>
            </div>
            <Footer />
          </AppShell>
        </CartProvider>
      </body>
    </html>
  );
}

