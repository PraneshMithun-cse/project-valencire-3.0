"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextLogo } from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  // Exclude from checkout page to keep it clean
  if (pathname === "/checkout") return null;

  return (
    <footer className="bg-white text-black border-t border-gray-200 pt-20 pb-10 md:pt-32 md:pb-16 font-sans relative z-10 w-full mt-auto overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 md:mb-32 gap-16 lg:gap-24">
          
          {/* Left: Newsletter (Minimalist) */}
          <div className="max-w-md w-full">
            <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-4" style={{ fontFamily: "var(--font-inter)" }}>Join The Club</h3>
            <p className="text-[15px] text-gray-500 mb-8 font-light leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
              Subscribe for exclusive access to new collections, editorial content, and private sales.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full border-b border-black pb-3 text-sm focus:outline-none placeholder-gray-400 bg-transparent transition-colors" 
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <button 
                className="absolute right-0 bottom-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-gray-500 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
          
          {/* Right: Links (New Layout) */}
          <div className="flex flex-wrap gap-16 md:gap-24 lg:gap-32 w-full lg:w-auto">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-8 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Discover</h4>
              <ul className="space-y-5">
                <li><Link href="/collections/jeans" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Jeans</Link></li>
                <li><Link href="/collections/trousers" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Trousers</Link></li>
                <li><Link href="/collections/shirts" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Shirts</Link></li>
                <li><Link href="/new-in" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold mb-8 text-gray-400" style={{ fontFamily: "var(--font-inter)" }}>Services</h4>
              <ul className="space-y-5">
                <li><Link href="/contact" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Contact Us</Link></li>
                <li><Link href="/shipping" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Shipping & Returns</Link></li>
                <li><Link href="/faq" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>FAQ</Link></li>
                <li><Link href="/terms" className="text-[11px] font-semibold uppercase tracking-widest hover:text-gray-500 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>Legal Information</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom: Massive Brand Text & Copyright */}
        <div className="flex flex-col items-center">
          <TextLogo className="w-[80vw] h-[15vw] md:h-[10vw] mb-12" />
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 pt-8 border-t border-gray-100" style={{ fontFamily: "var(--font-inter)" }}>
            <p>© 2026 Valenciré. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
              <a href="#" className="hover:text-black transition-colors">Pinterest</a>
              <a href="#" className="hover:text-black transition-colors">Twitter</a>
            </div>
            <p>Designed in Dubai, UAE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
