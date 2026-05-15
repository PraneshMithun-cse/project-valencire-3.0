"use client";

import { useEffect, useState, useRef } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let frame: number;
    let current = 0;
    const step = () => {
      if (current < 100) {
        current += 0.8 + Math.random() * 0.4;
        if (current > 100) current = 100;
        setProgress(current / 100);
        frame = requestAnimationFrame(step);
      } else {
        // Complete
        setTimeout(() => setExiting(true), 400);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1600);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-[1000ms] ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Video Container with reduced width */}
      <div className="w-[320px] md:w-[400px] flex flex-col items-center justify-center">
        <video
          src="/videos/smoothloader.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-contain"
        />
        
        {/* Progress Counter */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <span
            className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-bold tabular-nums"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {String(Math.round(progress * 100)).padStart(3, "0")}
          </span>
          
          {/* Minimalist progress line */}
          <div className="w-[60px] h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Brand Tagline */}
      <div
        className={`absolute bottom-20 left-1/2 -translate-x-1/2 text-center transition-all duration-700 ${
          progress > 0.3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p
          className="text-[8px] tracking-[0.6em] uppercase text-white/25 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Defining Modern Menswear
        </p>
      </div>
    </div>
  );
}
