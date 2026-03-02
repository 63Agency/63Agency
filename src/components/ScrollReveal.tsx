"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** "fadeUp" | "fade" | "fadeLeft" | "fadeRight" */
  variant?: "fadeUp" | "fade" | "fadeLeft" | "fadeRight";
  /** Root margin for intersection (e.g. "0px 0px -80px 0px" = trigger when 80px from bottom) */
  rootMargin?: string;
  /** Only animate once (default true) */
  once?: boolean;
};

const variantClasses = {
  fadeUp: "scroll-reveal-up",
  fade: "scroll-reveal-fade",
  fadeLeft: "scroll-reveal-left",
  fadeRight: "scroll-reveal-right",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
  rootMargin = "0px 0px -60px 0px",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (once) observer.disconnect();
        timeoutId = setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay, once, rootMargin]);

  const baseClass = variantClasses[variant];
  return (
    <div
      ref={ref}
      className={`${baseClass} ${visible ? "scroll-reveal-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
