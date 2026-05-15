"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ALL_PRODUCTS } from "@/data/products";

function HeartBtn() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
      className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors"
      aria-label="Wishlist"
    >
      <Heart
        className={`h-4 w-4 transition-colors ${liked ? "fill-black text-black" : "text-gray-600"}`}
        strokeWidth={1.5}
      />
    </button>
  );
}

function Slot({
  prod,
  imgSrc,
  className = "",
}: {
  prod: (typeof ALL_PRODUCTS)[0];
  imgSrc: string;
  className?: string;
}) {
  return (
    <Link
      href={`/product/${prod.id}`}
      className={`group relative overflow-hidden bg-[#f5f3f0] ${className}`}
    >
      <Image
        src={imgSrc}
        alt={prod.name}
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <HeartBtn />
    </Link>
  );
}

export default function TrouserEditorialGrid() {
  const t = ALL_PRODUCTS.filter((p) => p.category === "trousers");
  const getProd = (i: number) => t[i] || ALL_PRODUCTS[i % ALL_PRODUCTS.length];
  const [p0, p1, p2, p3, p4] = [getProd(0), getProd(1), getProd(2), getProd(3), getProd(4)];

  // pant-2's primary image path is wrong in data — use its secondary
  const p0img = p0.images?.[0] ?? p0.image; // pleated_4.png ✓

  return (
    <section className="py-16 bg-[#f5f3f0]">
      <div className="w-full">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 px-6 md:px-10 max-w-[1440px] mx-auto">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-1.5">
              SHOP BY FIT
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">
              Trousers &amp; Pants
            </h2>
          </div>
          <div className="flex items-center gap-5 pt-2">
            <Link
              href="/collections/trousers"
              className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
            >
              VIEW ALL
            </Link>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-black transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-black transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial grid */}
        <div className="flex gap-[1px] bg-white border border-white h-[480px] md:h-[680px]">

          {/* Left — full-height portrait */}
          <Slot
            prod={p0}
            imgSrc={p0img}
            className="hidden md:block w-[25%] h-full flex-shrink-0"
          />

          {/* Middle two columns */}
          <div className="flex-1 flex gap-[1px]">
            {/* Col 2 — tall top, shorter bottom */}
            <div className="flex-1 flex flex-col gap-[1px]">
              <Slot
                prod={p1}
                imgSrc={p1.image}
                className="flex-[3] block"
              />
              <Slot
                prod={p4 ?? p1}
                imgSrc={(p4 ?? p1).image}
                className="flex-[2] block"
              />
            </div>
            {/* Col 3 — shorter top, tall bottom */}
            <div className="flex-1 flex flex-col gap-[1px]">
              <Slot
                prod={p2}
                imgSrc={p2.image}
                className="flex-[2] block"
              />
              <Slot
                prod={p2}
                imgSrc={p2.images?.[0] ?? p2.image}
                className="flex-[3] block"
              />
            </div>
          </div>

          {/* Right — full-height portrait */}
          <Slot
            prod={p3}
            imgSrc={p3.image}
            className="hidden md:block w-[25%] h-full flex-shrink-0"
          />

        </div>
      </div>
    </section>
  );
}
