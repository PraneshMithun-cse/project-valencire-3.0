import Link from "next/link";
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-6 md:px-10 min-h-screen">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>My Account</h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>Welcome back, Guest</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <ul className="flex flex-col gap-6" style={{ fontFamily: "var(--font-inter)" }}>
            <li>
              <Link href="/account" className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-black border-l-2 border-black pl-4">
                <User className="w-4 h-4" /> Profile
              </Link>
            </li>
            <li>
              <Link href="/account/orders" className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pl-4 border-l-2 border-transparent">
                <Package className="w-4 h-4" /> Orders
              </Link>
            </li>
            <li>
              <Link href="/account/addresses" className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pl-4 border-l-2 border-transparent">
                <MapPin className="w-4 h-4" /> Addresses
              </Link>
            </li>
            <li>
              <Link href="/account/payment" className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-black transition-colors pl-4 border-l-2 border-transparent">
                <CreditCard className="w-4 h-4" /> Payment
              </Link>
            </li>
            <li className="pt-8 mt-8 border-t border-gray-100">
              <button className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors pl-4 border-l-2 border-transparent">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 bg-gray-50/50 p-8 md:p-12 border border-gray-100">
          <h2 className="text-xl font-medium mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>Profile Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" style={{ fontFamily: "var(--font-inter)" }}>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">First Name</label>
              <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="John" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
              <input type="text" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input type="email" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="john.doe@example.com" />
            </div>
          </div>
          
          <button className="bg-black text-white px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors" style={{ fontFamily: "var(--font-inter)" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
