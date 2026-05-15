"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { DENIMS, BEST_SELLERS, JUST_ARRIVED, ALL_PRODUCTS } from "@/data/products";
import ScrollReveal, { SplitTextReveal, LineReveal } from "@/components/ScrollReveal";
import TrouserEditorialGrid from "@/components/TrouserEditorialGrid";

type Product = { id: string; name: string; price: string; image: string; category?: string; subcategory?: string; [key: string]: unknown };

function ProductSection({ title, subtitle, products, showFilter = false, allProducts = [] }: {
  title: string;
  subtitle?: string;
  products: Product[];
  showFilter?: boolean;
  allProducts?: Product[];
}) {
  const [activeFilter, setActiveFilter] = useState("Pleated");

  const subcategoryMap: Record<string, string> = {
    "Pleated": "pleated",
    "Baggy": "relaxed-fit",
    "Cargo": "cargo"
  };

  const categoryPool = showFilter ? allProducts.filter((p) => p.category === "trousers") : products;
  const displayProducts = showFilter
    ? categoryPool.filter((p) => p.subcategory === subcategoryMap[activeFilter]).slice(0, 4)
    : categoryPool.slice(0, 4);

  return (
    <section className="py-20 w-full">
      <div className="flex justify-between items-start mb-8 px-6 md:px-10 max-w-[1440px] mx-auto">
        <div>
          {subtitle && (
            <ScrollReveal animation="fade-up" delay={0}>
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-2">{subtitle}</p>
            </ScrollReveal>
          )}
          <LineReveal delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">{title}</h2>
          </LineReveal>
        </div>
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">VIEW ALL</Link>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-black transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <button className="text-gray-400 hover:text-black transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {showFilter && (
        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="flex justify-center gap-4 md:gap-6 mb-20 px-4">
            {["Pleated", "Baggy", "Cargo"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-8 py-3 md:px-12 md:py-4 text-[12px] md:text-[14px] font-bold uppercase tracking-[0.1em] border-[4px] border-black transition-none ${
                  activeFilter === filter 
                    ? "bg-[#8b8b8b] text-black shadow-[inset_4px_4px_0px_0px_#4a4a4a,inset_-2px_-2px_0px_0px_#ffffff] pt-[14px] md:pt-[18px] pb-[10px] md:pb-[14px]" 
                    : "bg-[#c0c0c0] text-black shadow-[inset_4px_4px_0px_0px_#ffffff,inset_-4px_-4px_0px_0px_#8b8b8b] hover:bg-[#d4d4d4] active:bg-[#8b8b8b] active:shadow-[inset_4px_4px_0px_0px_#4a4a4a,inset_-2px_-2px_0px_0px_#ffffff]"
                }`}
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  WebkitFontSmoothing: "none",
                  letterSpacing: "0.15em"
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-2 gap-[1px] bg-white border-y border-white md:grid-cols-4">
        {displayProducts.length > 0 ? (
          displayProducts.map((prod, idx) => (
            <ScrollReveal key={prod.id} animation="fade-up" delay={0.1 + idx * 0.08}>
              <ProductCard prod={prod} />
            </ScrollReveal>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 py-10 uppercase tracking-widest text-xs font-bold">No products found in this category.</p>
        )}
      </div>
    </section>
  );
}

/* ── Horizontal Marquee Section (SFI-inspired) ── */
function MarqueeSection() {
  const text = "PREMIUM MENSWEAR ✦ EDITORIAL STYLE ✦ CINEMATIC TAILORING ✦ REFINED MATERIALS ✦ ";

  return (
    <section className="marquee-section">
      <div className="marquee-section-track">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="marquee-section-text">
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-white">
      <div className="animate-fade-up">
        <Hero />
      </div>

      {/* 1. Trousers Editorial Grid */}
      <TrouserEditorialGrid />

      {/* 2. Best Sellers Section */}
      <ProductSection
        title="Best Sellers"
        products={BEST_SELLERS}
      />


      {/* 4. Dynamic Campaign Gallery */}
      <section className="py-32 bg-[#EAE8E3] overflow-hidden border-y-[4px] border-black relative">
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 md:mb-24 relative">
            <h2 className="text-[60px] md:text-[120px] font-black text-black tracking-tighter leading-none mb-6 uppercase" style={{ fontFamily: "var(--font-inter)" }}>
              More campaigns
            </h2>
            <p className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-black" style={{ fontFamily: "'Courier New', Courier, monospace" }}>
              Style Like No One&apos;s Watching
            </p>
          </div>

          {/* Staggered Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
            
            {/* Column 1 */}
            <ScrollReveal animation="fade-up" delay={0.1} className="md:mt-16 group">
              <div className="relative w-full aspect-[4/5] overflow-hidden border-[3px] border-black bg-black/5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <Image src="/images/more-cases-1.png" alt="Campaign 1" fill className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter sepia-[0.1]" />
              </div>
            </ScrollReveal>

            {/* Column 2 */}
            <ScrollReveal animation="fade-up" delay={0.2} className="mt-12 md:mt-40 group">
              <div className="relative w-full aspect-[3/4] overflow-hidden border-[3px] border-black bg-black/5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <Image src="/images/more-cases-2.png" alt="Campaign 2" fill className="object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter sepia-[0.1]" />
              </div>
            </ScrollReveal>

            {/* Column 3 (with decorative element) */}
            <ScrollReveal animation="fade-up" delay={0.3} className="md:mt-4 group relative">
              <div className="absolute -top-16 -right-10 z-20 w-32 h-32 pointer-events-none hidden md:block">
                {/* Retro 4-point star in yellow */}
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_8s_linear_infinite]">
                  <path d="M50 0 C 50 40 60 50 100 50 C 60 50 50 60 50 100 C 50 60 40 50 0 50 C 40 50 50 40 50 0 Z" fill="#FFF44F" stroke="black" strokeWidth="3"/>
                </svg>
              </div>
              <div className="relative w-full aspect-[4/5] overflow-hidden border-[3px] border-black bg-black/5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <Image src="/images/jeans-2.png" alt="Campaign 3" fill className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter sepia-[0.1]" />
              </div>
            </ScrollReveal>

            {/* Column 4 */}
            <ScrollReveal animation="fade-up" delay={0.4} className="mt-20 md:mt-32 group">
              <div className="relative w-full aspect-[2/3] overflow-hidden border-[3px] border-black bg-black/5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <Image src="/images/more-cases-4.png" alt="Campaign 4" fill className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter sepia-[0.1]" />
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 5. Just Arrived Section */}
      <section className="py-24 w-full">
        <div className="flex justify-between items-end mb-20 px-6 md:px-10 max-w-[1440px] mx-auto">
          <div>
            <SplitTextReveal
              text="Just Arrived"
              className="text-5xl md:text-7xl font-semibold text-black tracking-tighter mb-6"
              wordDelay={0.12}
            />
            <ScrollReveal animation="fade-up" delay={0.3}>
              <p className="text-gray-500 text-sm tracking-widest uppercase">Discover the latest in premium menswear.</p>
            </ScrollReveal>
          </div>
          <ScrollReveal animation="fade-up" delay={0.4}>
            <Link href="/new-in" className="text-xs font-bold uppercase underline underline-offset-8 hover:text-gray-600 transition-colors tracking-widest">
              Shop All
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white border-y border-white md:grid-cols-4">
          {JUST_ARRIVED.map((prod, idx) => (
            <ScrollReveal key={prod.id} animation="fade-up" delay={0.1 + idx * 0.08}>
              <ProductCard prod={prod} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. Video Section — Push transition into footer */}
      <section className="video-push-section">
        {/* Looping background video */}
        <video
          src="/videos/The Art of Tailoring _ Cinematic Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        {/* Label */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-center z-10">
          <ScrollReveal animation="fade-up" delay={0}>
            <p className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/50 mb-3">Valencire Films</p>
          </ScrollReveal>
          <LineReveal delay={0.2}>
            <h2 className="text-xs font-bold tracking-[0.5em] uppercase text-white">The Art of Tailoring</h2>
          </LineReveal>
        </div>
      </section>
    </div>
  );
}
