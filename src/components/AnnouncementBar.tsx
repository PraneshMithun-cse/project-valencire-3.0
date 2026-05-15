"use client";

const MESSAGES = [
  "Free Shipping on Orders Above ₹2,999",
  "New Summer Collection — SS 2026",
  "Members Exclusive: 10% Off Sitewide",
  "Premium Menswear. Crafted in India.",
  "Easy Returns • 30-Day Guarantee",
  "Free Shipping on Orders Above ₹2,999",
  "New Summer Collection — SS 2026",
  "Members Exclusive: 10% Off Sitewide",
  "Premium Menswear. Crafted in India.",
  "Easy Returns • 30-Day Guarantee",
];

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white py-2.5 overflow-hidden select-none marquee-wrapper">
      <div className="animate-marquee announcement-track flex items-center">
        {MESSAGES.map((msg, i) => (
          <span
            key={i}
            className="mx-10 text-[10px] tracking-[0.35em] uppercase font-ui font-light"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {msg}
            {i < MESSAGES.length - 1 && (
              <span className="mx-10 text-white/30">◆</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
