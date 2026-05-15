"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ChevronLeft } from "lucide-react";
import { TextLogo } from "@/components/Logo";

export default function CheckoutPage() {
  const { items, cartCount } = useCart();
  
  const subtotal = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter)" }}>
      {/* Minimal Header */}
      <header className="border-b border-gray-200 py-6 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link href="/" className="block">
            <TextLogo className="w-[140px] h-[30px]" />
          </Link>
          <Link href="/cart" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back to Bag
          </Link>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="text-3xl font-medium mb-10" style={{ fontFamily: "var(--font-cormorant)" }}>Checkout</h1>
            
            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-6">1. Contact Information</h2>
              <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 accent-black" />
                  <label htmlFor="newsletter" className="text-xs text-gray-600">Keep me updated on news and exclusive offers</label>
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="mb-12">
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-6">2. Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Last Name" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Address" className="col-span-2 w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="City" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <input type="text" placeholder="Postal Code" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
                <select className="col-span-2 w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-white">
                  <option>United Arab Emirates</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
                <input type="tel" placeholder="Phone" className="col-span-2 w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
            </section>

            {/* Payment */}
            <section className="mb-12">
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-6">3. Payment</h2>
              <div className="border border-gray-300 p-6 bg-gray-50/50">
                <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
                <div className="space-y-4">
                  <input type="text" placeholder="Card Number" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                    <input type="text" placeholder="Security Code" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                  </div>
                  <input type="text" placeholder="Name on Card" className="w-full border border-gray-300 p-4 text-sm focus:outline-none focus:border-black bg-white transition-colors" />
                </div>
              </div>
            </section>

            <button className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors">
              Place Order
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-gray-50 p-8 border border-gray-100 sticky top-10">
              <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-8">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Your bag is empty.</p>
                ) : (
                  items.map((item, idx) => (
                    <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-white border border-gray-200 relative overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full z-10">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-semibold mb-1">{item.name}</h3>
                        <p className="text-[10px] text-gray-500 mb-1">Size: {item.size}</p>
                        <p className="text-xs font-medium">RS. {item.price}.00</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">RS. {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">Calculated at next step</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-black">Total</span>
                  <span className="text-xl font-bold">
                    RS. {subtotal.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
