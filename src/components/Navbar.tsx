"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Heart, X, Menu, ChevronRight, ArrowRight, Home } from "lucide-react";
import { VCMark, ValencireWordmark } from "./Logo";
import { ALL_PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const NAV = [
  {
    label: "Shirts",
    href: "/collections/shirts",
    mega: {
      cols: [
        { title: "Fit", links: ["Slim Fit", "Regular Fit", "Relaxed Fit"] },
        { title: "Style", links: ["Button-Down", "Polo", "Overshirts", "Cuban Collar"] },
      ],
      image: "/images/hero-3.png",
    },
  },
  {
    label: "T-Shirts",
    href: "/collections/t-shirts",
    mega: {
      cols: [
        { title: "Style", links: ["Crewneck", "V-Neck", "Long Sleeve", "Heavyweight"] },
        { title: "Collection", links: ["Essentials", "Graphic Tees", "Vintage Wash"] },
      ],
      image: "/images/hero-1.png",
    },
  },
  {
    label: "Pants & Trousers",
    href: "/collections/trousers",
    mega: {
      cols: [
        { title: "Style", links: ["Pleated Pants", "Tailored Chinos", "Cargo Pants", "Jeans"] },
        { title: "Fabric", links: ["Premium Linen", "Wool Blend", "Cotton Twill", "Raw Denim"] },
      ],
      image: "/images/jeans-2.png",
    },
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    mega: {
      cols: [
        { title: "Essentials", links: ["Leather Belts", "Classic Watches", "Sunglasses"] },
        { title: "Leather Goods", links: ["Wallets", "Briefcases", "Weekend Bags"] },
      ],
      image: "/images/stillhouse.png",
    },
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname === "/checkout") return null;

  const searchResults = searchQuery.length >= 2
    ? ALL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];
  const mobileOverlay = pathname === "/" && !scrolled && !searchOpen;
  const mobileTopLinks = [
    { label: "Jeans", href: "/collections/jeans" },
    { label: "Trousers", href: "/collections/trousers" },
    { label: "Shirt", href: "/collections/shirts" },
    { label: "Story", href: "/#story" },
  ];
  
  const isDarkTheme = pathname === "/" && !scrolled && !activeMenu && !searchOpen;
  const textColor = isDarkTheme ? "text-white" : "text-black";
  const iconColor = isDarkTheme ? "#fff" : "#000";
  const desktopCategoryLinks = [
    { label: "Jeans", href: "/collections/jeans", menuLabel: "Jeans" },
    { label: "Trousers", href: "/collections/trousers", menuLabel: "Trousers & Pants" },
    { label: "Shirts", href: "/collections/shirts" },
    { label: "Story", href: "/#story" },
    { label: "New In", href: "/new-in" },
  ];

  return (
    <>
      {/* Background blur overlay when mega menu is open */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500 pointer-events-none ${activeMenu ? "opacity-100" : "opacity-0"}`} 
      />

      <header
        className={`fixed top-0 z-50 w-full transition-all duration-700 ease-in-out ${
          scrolled || activeMenu || searchOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm py-0 border-b border-[#e8e8e8]"
            : "bg-transparent py-4"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[70px] flex items-center justify-between relative">
          
          {/* Left: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 flex-1">
            {NAV.map((item) => (
              <div 
                key={item.label}
                className="relative h-[70px] flex items-center"
                onMouseEnter={() => { setActiveMenu(item.label); setHoveredLink(item.label); }}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={item.href}
                  className={`relative text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 py-2 overflow-hidden flex items-center gap-1 group
                    ${isDarkTheme ? "text-white hover:text-white/70" : "text-black hover:text-black/70"}
                  `}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <span className={`relative z-10 transition-transform duration-300 ${activeMenu === item.label ? "-translate-y-[120%]" : "translate-y-0"}`}>
                    {item.label}
                  </span>
                  
                  {/* Duplicated text for cool slide-up transition */}
                  <span className={`absolute inset-0 flex items-center transition-transform duration-300 ${activeMenu === item.label ? "translate-y-0" : "translate-y-[120%]"}`}>
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <span className={`absolute bottom-1 left-0 w-full h-[1.5px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out ${isDarkTheme ? "bg-white" : "bg-black"}`} />
                </Link>
              </div>
            ))}
          </nav>

          {/* Center: Brand Logo — fades in as hero logo morphs into it */}
          {(() => {
            const isHome = pathname === "/";
            // On homepage: invisible until hero logo arrives (~scrollY 200-280)
            const logoOpacity = isHome
              ? Math.min(Math.max((scrollY - 200) / 80, 0), 1)
              : 1;
            return (
              <div
                className={`flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 transition-transform duration-700 ${scrolled ? "scale-90" : "scale-100"}`}
                style={{ opacity: logoOpacity, transition: "opacity 0.15s linear, transform 0.7s" }}
              >
                <Link
                  href="/"
                  onClick={() => setActiveMenu(null)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <VCMark size={scrolled ? 36 : 42} color={iconColor} />
                  <div className="overflow-hidden">
                    <ValencireWordmark size={scrolled ? "0.55rem" : "0.62rem"} color={iconColor} />
                  </div>
                </Link>
              </div>
            );
          })()}

          {/* Right: Icons */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className={`relative group overflow-hidden w-[18px] h-[18px] ${textColor}`}
            >
              <div className={`absolute inset-0 transition-transform duration-300 ${searchOpen ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}>
                <Search className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
              </div>
              <div className={`absolute inset-0 transition-transform duration-300 ${searchOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                <X className="w-[18px] h-[18px] group-hover:rotate-90 transition-transform" />
              </div>
            </button>
            <Link href="/account" aria-label="Account" className={`hidden sm:block group ${textColor}`}>
              <User className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className={`hidden sm:block group ${textColor}`}>
              <Heart className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
            </Link>
            <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className={`relative group ${textColor}`}>
              <ShoppingBag className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 w-[15px] h-[15px] ${isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'} text-[9px] flex items-center justify-center rounded-full font-bold leading-none animate-scale-in`}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(true)} className={`lg:hidden group ${textColor}`} aria-label="Menu">
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Search Dropdown ── */}
        <div className={`absolute top-full left-0 w-full bg-white border-b border-[#e8e8e8] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${searchOpen ? "max-h-[500px] opacity-100 border-t" : "max-h-0 opacity-0"}`}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-5 flex items-center gap-4">
            <Search className="w-5 h-5 text-[#999] flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH STYLES, COLLECTIONS, PRODUCTS..."
              className="flex-1 bg-transparent text-sm font-semibold tracking-widest text-black placeholder-[#ccc] outline-none"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-[#999] hover:text-black transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-w-[1440px] mx-auto px-6 md:px-10 pb-8 bg-white">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                {searchResults.length} Matches Found
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {searchResults.map((prod, idx) => (
                  <Link
                    key={prod.id}
                    href={`/product/${prod.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="group flex flex-col items-center animate-fade-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 mb-4">
                      <Image src={prod.image} alt={prod.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black text-center mb-1 group-hover:text-gray-500 transition-colors">{prod.name}</p>
                    <p className="text-[10px] text-gray-400">RS. {prod.price}.00</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── High-Transition Mega Menu ── */}
        <div 
          className={`absolute top-full left-0 w-full bg-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            activeMenu && !searchOpen ? "max-h-[600px] opacity-100 border-t border-[#e8e8e8] shadow-2xl" : "max-h-0 opacity-0"
          }`}
        >
          {NAV.map((item) => (
            <div
              key={item.label}
              className={`max-w-[1440px] mx-auto px-10 py-12 flex justify-between absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                activeMenu === item.label ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Links Section */}
              <div className="flex gap-20">
                {item.mega?.cols.map((col, cIdx) => (
                  <div key={col.title} className="min-w-[160px]">
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                      {col.title}
                    </p>
                    <ul className="space-y-4">
                      {col.links.map((link, lIdx) => (
                        <li key={link} className="overflow-hidden">
                          <Link
                            href={`${item.href}?sort=${link.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`flex items-center text-sm font-medium text-black hover:text-gray-500 transition-colors group transform ${activeMenu === item.label ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                            style={{ 
                              fontFamily: "var(--font-inter)",
                              transition: `transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + (cIdx * 0.1) + (lIdx * 0.05)}s, opacity 0.5s ease ${0.1 + (cIdx * 0.1) + (lIdx * 0.05)}s, color 0.2s`
                            }}
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="relative overflow-hidden inline-block pb-1">
                              {link}
                              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Image Reveal Section */}
              <div className="hidden lg:flex items-end gap-10">
                <div className="flex flex-col mb-4">
                  <h3 className="text-3xl font-bold tracking-tight mb-4 max-w-[200px]">{item.label} Collection</h3>
                  <Link 
                    href={item.href} 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 w-fit flex items-center gap-2 group hover:text-gray-500 hover:border-gray-500 transition-colors"
                  >
                    EXPLORE ALL <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div 
                  className={`w-[280px] h-[340px] rounded-2xl overflow-hidden relative transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeMenu === item.label ? "translate-x-0 opacity-100 scale-100" : "translate-x-12 opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: "0.2s" }}
                >
                  <Image src={item.mega?.image || "/images/jeans-2.png"} alt={item.label} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
      {pathname !== "/" && <div className="h-[116px] lg:hidden" aria-hidden="true" />}

      {/* ── Mobile bottom nav ── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 grid h-[76px] grid-cols-3 items-center border-t border-black/10 bg-white/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-3 text-black shadow-[0_-18px_40px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        aria-label="Mobile navigation"
      >
        <Link href="/" aria-label="Home" className="flex h-full items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center border-b border-black">
            <Home className="h-[23px] w-[23px]" strokeWidth={1.35} />
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-full items-center justify-center text-[14px] font-medium uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-inter)" }}
          aria-label="Menu"
        >
          Menu
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="Cart"
          className="relative flex h-full items-center justify-center"
        >
          <ShoppingBag className="h-[25px] w-[25px]" strokeWidth={1.2} />
          {cartCount > 0 && (
            <span className="absolute right-[18%] top-1 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#ff2f1f] px-1 text-[11px] font-bold leading-none text-white">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* ── High-Transition Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[400px] z-[70] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#e8e8e8]">
          <div className="flex items-center gap-3">
            <VCMark size={34} color="#000" />
          </div>
          <button onClick={() => setMobileOpen(false)} aria-label="Close" className="hover:rotate-90 transition-transform duration-300">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-8">
          {NAV.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="group flex flex-col gap-2 overflow-hidden"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <div 
                className={`flex items-center justify-between transform transition-all duration-500 ${mobileOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                style={{ transitionDelay: `${0.1 + idx * 0.05}s` }}
              >
                <span className="text-2xl font-bold tracking-tight">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-[#e8e8e8] px-8 py-8 flex flex-col gap-6">
          <Link href="/account" className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
            <User className="w-5 h-5" /> My Account
          </Link>
          <Link href="/wishlist" className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
            <Heart className="w-5 h-5" /> Saved Items
          </Link>
        </div>
      </div>
    </>
  );
}
