"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  as: Component = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((element: HTMLDivElement | HTMLLIElement | null) => {
    ref.current = element;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;

    // Server-rendered content stays visible without JavaScript. Only hide
    // offscreen content while waiting for its first intersection.
    if (element.getBoundingClientRect().top >= window.innerHeight - 48) {
      element.classList.add("reveal-pending");
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // Start after a visible paint, including on first load and reload.
          frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(() => {
              element.classList.remove("reveal-pending");
              if (!element.matches(":focus-within")) {
                element.classList.add("reveal-enter");
              }
            });
          });
        }
      },
      { rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      element.classList.remove("reveal-pending", "reveal-enter");
    };
  }, []);

  return (
    <Component
      ref={setRef}
      onFocusCapture={() => ref.current?.classList.remove("reveal-pending", "reveal-enter")}
      className={cn("scroll-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
