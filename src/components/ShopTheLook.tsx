"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { useState } from "react";

export default function ShopTheLook() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Select the items for this look
  const lookProducts = [
    { ...ALL_PRODUCTS.find(p => p.id === "shirt-2")!, top: "28%", left: "48%", direction: "right" as const },
    { ...ALL_PRODUCTS.find(p => p.id === "pant-6")!, top: "74%", left: "62%", direction: "left" as const },
  ];

  const activeProd = lookProducts[activeIndex];

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % lookProducts.length);
  };

  const prevProduct = () => {
    setActiveIndex((prev) => (prev - 1 + lookProducts.length) % lookProducts.length);
  };

  return (
    <section className="py-16 max-w-[1000px] mx-auto px-6 md:px-10 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Product Slider */}
        <div className="flex flex-col max-w-sm mx-auto w-full">
          <h2 className="text-3xl font-medium tracking-tight text-black text-center mb-8" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>Shop the look</h2>
          
          <div className="flex flex-col">
            {/* Active Product Image */}
            <Link href={`/product/${activeProd.id}`} className="relative w-full aspect-[3/4] overflow-hidden bg-[#f0f0f0] mb-6">
              <Image 
                src={activeProd.image} 
                alt={activeProd.name} 
                fill 
                className="object-cover transition-opacity duration-500" 
              />
            </Link>
            
            {/* Active Product Details */}
            <div className="flex flex-col items-start mb-8">
              <Link href={`/product/${activeProd.id}`}>
                <h3 className="text-[12px] font-bold uppercase tracking-widest text-black mb-1">{activeProd.name}</h3>
              </Link>
              <p className="text-[12px] text-gray-500">RS. {activeProd.price}.00</p>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                {lookProducts.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-[2px] transition-all duration-300 ${idx === activeIndex ? "w-8 bg-black" : "w-4 bg-gray-300"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={prevProduct} className="text-gray-400 hover:text-black transition-colors">
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button onClick={nextProduct} className="text-gray-400 hover:text-black transition-colors">
                  <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Image with Hotspots */}
        <div className="bg-[#f0f0f0] relative w-full aspect-[3/4] lg:aspect-auto lg:h-[550px] overflow-hidden rounded-sm">
          <Image 
            src="/oldmoney pics/oldmoney skyblue1.JPG" 
            alt="Shop the look" 
            fill 
            className="object-cover object-center" 
          />
          
          {/* Dynamic Hotspots */}
          {lookProducts.map((prod, idx) => (
            <div 
              key={prod.id}
              onClick={() => setActiveIndex(idx)}
              className={`absolute cursor-pointer group transition-all duration-300 ${activeIndex === idx ? "opacity-100 scale-110 z-10" : "opacity-60 scale-100 hover:opacity-100 z-0"}`}
              style={{ top: prod.top, left: prod.left }}
            >
              {prod.direction === "right" ? (
                <div className="absolute bottom-0 right-0 flex items-start translate-x-[5px] translate-y-[5px]">
                  <span className="text-black font-semibold tracking-[0.2em] uppercase text-[10px] mr-2 mt-[4px] drop-shadow-[0_0_8px_rgba(255,255,255,1)] whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                    {prod.name}
                  </span>
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none" className="drop-shadow-[0_0_6px_rgba(255,255,255,1)]">
                    <path d="M 0 10 C 20 10, 40 10, 45 35" stroke="black" strokeWidth={activeIndex === idx ? "2.5" : "1.5"} strokeLinecap="round" className="transition-all duration-300" />
                    <path d="M 35 28 L 45 35 L 46 22" stroke="black" strokeWidth={activeIndex === idx ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />
                  </svg>
                </div>
              ) : (
                <div className="absolute bottom-0 left-0 flex items-start -translate-x-[5px] translate-y-[5px]">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none" className="drop-shadow-[0_0_6px_rgba(255,255,255,1)]">
                    <path d="M 50 10 C 30 10, 10 10, 5 35" stroke="black" strokeWidth={activeIndex === idx ? "2.5" : "1.5"} strokeLinecap="round" className="transition-all duration-300" />
                    <path d="M 15 28 L 5 35 L 4 22" stroke="black" strokeWidth={activeIndex === idx ? "2.5" : "1.5"} strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />
                  </svg>
                  <span className="text-black font-semibold tracking-[0.2em] uppercase text-[10px] ml-2 mt-[4px] drop-shadow-[0_0_8px_rgba(255,255,255,1)] whitespace-nowrap" style={{ fontFamily: "var(--font-inter)" }}>
                    {prod.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
