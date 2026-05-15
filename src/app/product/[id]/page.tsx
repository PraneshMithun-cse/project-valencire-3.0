"use client";

import { getProductById } from "@/data/products";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { X, Heart, ChevronLeft, Plus } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const INFO_PANELS = [
  {
    key: "materials",
    label: "MATERIALS",
    text: "Expertly woven from heritage threads. The robust, textural weave guarantees durability while naturally softening over time. Pure vintage character built for modern resilience.",
  },
  {
    key: "style",
    label: "HOW TO STYLE",
    text: "Pair with wide-leg trousers for a relaxed silhouette. Layer over a slim turtleneck for an elevated look.",
  },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);

  if (!product) return notFound();

  const images = [product.image, ...(product.images ?? [])].filter(Boolean);

  function handleAdd() {
    if (!product || !selectedSize) { setShowSizes(true); return; }
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="relative bg-[#ede9e3]">
      {/* ─── Full-screen horizontal image strip ─────────────────────── */}
      <div
        className="flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 snap-start h-full"
            style={{ width: images.length === 1 ? "100vw" : "52vw" }}
          >
            <Image
              src={src}
              alt={`${product.name} — view ${i + 1}`}
              fill
              sizes="52vw"
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* ─── ← Back button ───────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="fixed top-[76px] left-5 z-50 flex items-center gap-1.5 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 text-[13px] font-medium text-gray-800 shadow-sm hover:bg-white/85 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        Back
      </button>

      {/* ─── Fixed bottom overlay ────────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2.5rem)] max-w-[430px]" style={{ fontFamily: 'var(--font-cormorant-garamond)' }}>

        {/* Info panel (expanded) */}
        {panel && (
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 mb-2 text-white text-[13px] leading-relaxed">
            {INFO_PANELS.find((p) => p.key === panel)?.text}
          </div>
        )}

        {/* Pill buttons */}
        <div className="flex gap-2 mb-3">
          {INFO_PANELS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPanel((prev) => (prev === p.key ? null : p.key))}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider transition-colors ${
                panel === p.key
                  ? "bg-white/90 text-black"
                  : "bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-black/40"
              }`}
            >
              {p.label} <Plus className="w-3 h-3" strokeWidth={2.5} />
            </button>
          ))}
        </div>

        {/* Product card */}
        <div className="bg-gray-500/65 backdrop-blur-xl rounded-2xl overflow-hidden">

          {/* Expanded header */}
          {!compact && (
            <div className="flex items-center gap-3 px-4 pt-4 pb-1">
              <div className="relative w-14 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-400">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-[14px] leading-snug">
                  {product.name}
                </p>
                <p className="text-white/70 text-[13px] mt-0.5">RS. {product.price}</p>
              </div>
              <button onClick={() => setLiked((v) => !v)} className="p-1 flex-shrink-0">
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    liked ? "fill-white text-white" : "text-white/60 hover:text-white"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          )}

          {/* Size picker */}
          {showSizes && !compact && (
            <div className="px-4 pt-2">
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizes(false);
                    }}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-white text-black"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              onClick={handleAdd}
              className="bg-white text-black rounded-full px-5 py-2.5 text-[13px] font-medium hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>

            {compact ? (
              <p className="flex-1 text-white text-[13px] truncate px-1">
                {product.name} &middot; RS. {product.price}
              </p>
            ) : (
              <button
                onClick={() => setShowSizes((v) => !v)}
                className="flex-1 bg-white/15 text-white rounded-full px-4 py-2.5 text-[13px] hover:bg-white/25 transition-colors text-center"
              >
                {selectedSize ? `Size: ${selectedSize}` : "Select size"}
              </button>
            )}

            {/* × collapses to compact */}
            <button
              onClick={() => { setCompact((v) => !v); setShowSizes(false); }}
              className="flex-shrink-0 p-1"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
