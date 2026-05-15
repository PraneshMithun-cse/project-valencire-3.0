"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  // Exclude from checkout page to keep it clean
  if (pathname === "/checkout") return null;

  return (
    <footer className="bg-[#111111] text-white border-t border-black pt-16 pb-12 font-sans relative z-10 w-full mt-auto overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr_1fr] gap-12 lg:gap-8">
          
          {/* Col 1: Logo */}
          <div className="flex flex-col">
            <div className="w-[280px] h-[80px] mb-8 relative">
              <TextLogo color="#fff" className="w-full h-full scale-[1.5] lg:scale-[2] origin-left" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-5 pt-2" style={{ fontFamily: "var(--font-inter)" }}>
            <Link href="/collections/all" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Shop All</Link>
            <Link href="/collections/all" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Large Orders</Link>
            <Link href="/collections/all" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Delivery</Link>
            <Link href="/stores" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Store</Link>
            <Link href="/events" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Events</Link>
          </div>

          {/* Col 3: Info Blocks */}
          <div className="flex flex-col gap-10 pt-2" style={{ fontFamily: "var(--font-inter)" }}>
            <div>
              <h4 className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] mb-2">Flagship Boutique</h4>
              <p className="text-[12px] text-gray-300 leading-relaxed font-medium">Fashion Avenue, Dubai Mall,<br/>Dubai, UAE</p>
            </div>
            <div>
              <h4 className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] mb-2">Delivery / Returns / Concierge</h4>
              <p className="text-[12px] text-gray-300 leading-relaxed font-medium">Complimentary worldwide express shipping.<br/><span style={{ fontFamily: 'Arial, sans-serif' }}>24/7</span> client care.</p>
            </div>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="flex flex-col gap-5 pt-2" style={{ fontFamily: "var(--font-inter)" }}>
            <div className="mb-4">
              <h4 className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] mb-2">Contact</h4>
              <a href="mailto:atelier@valencire.com" className="text-[12px] text-gray-300 hover:text-white transition-colors font-medium">atelier@valencire.com</a>
            </div>
            <Link href="/cookies" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Cookies</Link>
            <Link href="/privacy" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/legal" className="text-[12px] uppercase font-extrabold tracking-wide text-[#f5f5f5] hover:text-gray-400 transition-colors">All Legal</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
