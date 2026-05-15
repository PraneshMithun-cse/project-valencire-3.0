"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import Link from "next/link";
import { TextLogo } from "@/components/Logo";

const mono = "'Courier New', Courier, monospace";
const sf = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";

type CartItem = Product & {
  quantity: number;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const addToCart = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, isCartOpen, setIsCartOpen }}>
      {children}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm transition-opacity duration-400 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[400px] flex flex-col bg-white border-l border-[#e8e8e8] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="px-8 py-6 bg-white border-b border-[#e8e8e8] flex justify-between items-center flex-shrink-0">
          <div>
            <div className="mb-4 mt-2">
              <TextLogo className="w-[100px] h-[20px]" />
            </div>
            <h2 className="text-[20px] font-medium text-black leading-tight tracking-tight" style={{ fontFamily: "var(--font-cormorant)" }}>
              Your Bag
            </h2>
            {cartCount > 0 && (
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-400 hover:text-black"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1L13 13M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <p className="text-[16px] font-medium text-black leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Your bag is empty
                </p>
                <p className="text-[11px] tracking-widest text-gray-400 mt-2 uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                  Add items to get started
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-8 py-3 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors w-full"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item.id}-${item.size}`}
                className={`flex gap-6 pb-6 ${i < items.length - 1 ? "border-b border-[#e8e8e8]" : ""}`}
              >
                {/* Image */}
                <div className="relative w-[90px] h-[120px] flex-shrink-0 bg-gray-50 rounded-sm overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-[13px] font-medium text-black leading-snug tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-black transition-colors"
                        aria-label="Remove item"
                      >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1L13 13M13 1L1 13" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[13px] text-gray-500 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                      RS. {item.price}.00
                    </p>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                        Size: {item.size}
                      </span>
                      <span className="text-[11px] text-gray-500" style={{ fontFamily: "var(--font-inter)" }}>
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-white border-t border-[#e8e8e8] flex-shrink-0 px-8 py-6">
            {/* Subtotal row */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium" style={{ fontFamily: "var(--font-inter)" }}>
                Subtotal
              </span>
              <span className="text-[16px] font-medium text-black" style={{ fontFamily: "var(--font-inter)" }}>
                RS. {subtotal.toLocaleString()}.00
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-black text-white py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-center hover:bg-gray-900 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Proceed to Checkout
            </Link>
            <div className="mt-6 flex items-center justify-center gap-4">
              {["Free Shipping", "Secure Pay", "Easy Returns"].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-300"></span>}
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium" style={{ fontFamily: "var(--font-inter)" }}>{t}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};
