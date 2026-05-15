"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductCard({ prod }: { prod: Product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const displayImages =
    prod.images && prod.images.length > 1
      ? prod.images
      : [prod.image, prod.image];

  function handleSizeClick(e: React.MouseEvent, size: string) {
    e.preventDefault();
    addToCart(prod, size);
    setSelectedSize(size);
    setTimeout(() => setSelectedSize(null), 800);
  }

  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white">
      {/* Image container — flush, clips image */}
      <div className="relative overflow-hidden aspect-[3/4] w-full bg-[#f5f3f0]">
        {/* Primary image */}
        <Link href={`/product/${prod.id}`} className="block w-full h-full absolute inset-0">
          <Image
            src={displayImages[0]}
            alt={prod.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover object-top transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={displayImages[1] || displayImages[0]}
            alt={prod.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        {/* Size pills — slide up on hover */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center gap-0.5 bg-white/95 rounded-full px-3 py-1.5 shadow-sm">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={(e) => handleSizeClick(e, size)}
                className={`min-w-[32px] px-2 py-1 text-[11px] rounded-full transition-colors ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info row */}
      <Link href={`/product/${prod.id}`} className="block pt-5 pb-6 flex-grow flex flex-col items-center text-center bg-white">
        <h3 className="text-[12px] font-bold text-black tracking-wide leading-snug">{prod.name}</h3>
        <p className="text-[12px] text-gray-500 mt-1">RS. {prod.price}</p>
      </Link>
    </div>
  );
}
