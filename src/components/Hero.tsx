"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const SCROLL_END = 280; // px — where logo fully reaches navbar
const LOGO_START = 650; // px — hero logo size
const LOGO_END = 240;    // px — navbar logo landing size

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [centerY, setCenterY] = useState(400);

  useEffect(() => {
    setCenterY(window.innerHeight / 2);
    const onResize = () => setCenterY(window.innerHeight / 2);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const progress = Math.min(scrollY / SCROLL_END, 1);

  // Interpolated values
  const logoSize = LOGO_START + (LOGO_END - LOGO_START) * progress;
  const topPx = centerY + (35 - centerY) * progress; // center-screen → navbar center (35px)
  const opacity = progress < 0.82 ? 1 : 1 - (progress - 0.82) / 0.18;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background video */}
      <video
        src="/videos/dior-hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

      {/* ── Morphing logo: starts large in hero, flies into navbar on scroll ── */}
      <div
        style={{
          position: "fixed",
          top: topPx,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: logoSize,
          height: logoSize * 0.25,
          opacity,
          pointerEvents: "none",
          zIndex: 55,
          filter: `invert(${Math.max(0, 1 - progress * 2)})`, // Starts white, fades to black
        }}
      >
        <Image
          src="/images/text-logo-nav copy.png"
          alt="Valenciré"
          fill
          className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          priority
        />
      </div>

      {/* CTA */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="/collections/all"
          className="group flex items-center bg-white text-black px-10 py-4 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em] transition-transform duration-500 hover:scale-105"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  );
}
