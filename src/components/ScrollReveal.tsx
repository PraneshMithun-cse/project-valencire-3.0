"use client";

import { useEffect, useRef, useState, ReactNode, JSX } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation type */
  animation?: "fade-up" | "fade-in" | "slide-up-text" | "push-up" | "scale";
  /** Delay in seconds */
  delay?: number;
  /** Intersection threshold */
  threshold?: number;
  /** Additional class names */
  className?: string;
  /** Duration in ms */
  duration?: number;
  /** Tag to render */
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  className = "",
  duration = 900,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClasses: Record<string, { hidden: string; visible: string }> = {
    "fade-up": {
      hidden: "opacity-0 translate-y-[60px]",
      visible: "opacity-100 translate-y-0",
    },
    "fade-in": {
      hidden: "opacity-0",
      visible: "opacity-100",
    },
    "slide-up-text": {
      hidden: "opacity-0 translate-y-[100%]",
      visible: "opacity-100 translate-y-0",
    },
    "push-up": {
      hidden: "opacity-0 translate-y-[40px] scale-[0.98]",
      visible: "opacity-100 translate-y-0 scale-100",
    },
    "scale": {
      hidden: "opacity-0 scale-[0.92]",
      visible: "opacity-100 scale-100",
    },
  };

  const anim = animClasses[animation] || animClasses["fade-up"];

  return (
    <div
      ref={ref}
      className={`transition-all ${isVisible ? anim.visible : anim.hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

/** 
 * SplitTextReveal: Reveals text word-by-word with staggered animation.
 * Like the Star Fades "REIMAGINING DENIM" text reveal.
 */
export function SplitTextReveal({
  text,
  className = "",
  wordDelay = 0.06,
  baseDelay = 0,
  threshold = 0.2,
}: {
  text: string;
  className?: string;
  wordDelay?: number;
  baseDelay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-block mr-[0.3em]">
          <span
            className={`inline-block transition-all ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[110%] opacity-0"
            }`}
            style={{
              transitionDuration: "800ms",
              transitionDelay: `${baseDelay + idx * wordDelay}s`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * LineReveal: Reveals content with a clip/mask line effect
 */
export function LineReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className={`transition-transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          transitionDuration: "1000ms",
          transitionDelay: `${delay}s`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
