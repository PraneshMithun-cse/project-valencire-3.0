import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-6 md:px-10 min-h-screen">
      <div className="mb-16 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>Saved Items</h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>0 items</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-32 text-center border border-gray-100 bg-gray-50/50">
        <Heart className="w-12 h-12 text-gray-300 mb-6" strokeWidth={1} />
        <h2 className="text-2xl font-medium text-black mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>Your wishlist is empty</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
          Save the pieces you love and keep track of your most wanted items.
        </p>
        <Link 
          href="/collections/jeans" 
          className="bg-black text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Discover Collections
        </Link>
      </div>
    </div>
  );
}
