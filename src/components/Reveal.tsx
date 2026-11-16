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
    if (
      !element ||
      !window.IntersectionObserver ||
      element.getBoundingClientRect().top < window.innerHeight - 48
    ) {
      return;
    }

    // Enhance offscreen content only; server-rendered content is visible
    // immediately and stays readable if JavaScript is disabled.
    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -48px 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      element.classList.remove("reveal-pending");
    };
  }, []);

  return (
    <Component
      ref={setRef}
      onFocusCapture={() => ref.current?.classList.remove("reveal-pending")}
      className={cn("scroll-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
