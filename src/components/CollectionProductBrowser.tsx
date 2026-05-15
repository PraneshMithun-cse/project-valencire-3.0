"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

function priceValue(product: Product) {
  return Number(product.price.replace(/,/g, ""));
}

export default function CollectionProductBrowser({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) {
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const sortedProducts = useMemo(() => {
    const nextProducts = [...products];

    if (sortMode === "price-asc") {
      return nextProducts.sort((a, b) => priceValue(a) - priceValue(b));
    }

    if (sortMode === "price-desc") {
      return nextProducts.sort((a, b) => priceValue(b) - priceValue(a));
    }

    if (sortMode === "newest") {
      return nextProducts.reverse();
    }

    return nextProducts;
  }, [products, sortMode]);

  return (
    <>
      <div className="mb-12 flex items-center justify-between border-y border-gray-100 py-4">
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black">
          <button className="transition-colors hover:text-gray-500">Filter +</button>
          <span className="text-gray-400">{products.length} Results</span>
        </div>
        <select
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
          className="max-w-[190px] cursor-pointer bg-transparent text-right text-[11px] font-bold uppercase tracking-widest text-black outline-none"
          aria-label="Sort products"
        >
          <option value="featured">Sort By: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((prod) => (
            <ProductCard key={prod.id} prod={prod} />
          ))}
        </div>
      ) : (
        <div className="mb-24 border-y border-black/10 bg-[#faf8f4] px-6 py-16 text-center md:mb-0 md:py-24">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.45em] text-black/35">
            Valencire Atelier
          </p>
          <h3 className="text-4xl font-semibold tracking-tight text-black md:text-5xl">Coming Soon</h3>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/55">
            The {title.toLowerCase()} selection is being refined and will arrive soon.
          </p>
          <Link
            href="/"
            className="mt-9 inline-block border-b border-black pb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-black transition-colors hover:text-black/50"
          >
            Return to the collection
          </Link>
        </div>
      )}
    </>
  );
}
