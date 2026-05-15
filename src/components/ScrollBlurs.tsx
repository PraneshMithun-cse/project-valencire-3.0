"use client";

import { usePathname } from "next/navigation";

export default function ScrollBlurs() {
  const pathname = usePathname();

  // Disable blur effect on product detail pages
  if (pathname?.startsWith("/product/")) return null;

  return (
    <>
      {/* Global Bottom Scroll Blur (Liquid glass fade) - Hidden on mobile */}
      <div 
        className="hidden md:block pointer-events-none fixed bottom-0 left-0 z-40 w-full h-40 backdrop-blur-[24px] [mask-image:linear-gradient(to_top,black_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_10%,transparent_100%)]" 
        aria-hidden="true" 
      />
    </>
  );
}
