"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

const emptySubscribe = () => () => {};

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration-safe mounted flag: false on the server/first client render,
  // true afterwards — without setState-in-effect.
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const startViewTransition = (document as ViewTransitionDocument)
      .startViewTransition;

    // Clean fallback: no View Transitions support or reduced motion.
    if (prefersReducedMotion || !startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const { clientX, clientY } = event;
    const transition = startViewTransition.call(document, () => {
      flushSync(() => setTheme(nextTheme));
    });

    transition.ready
      .then(() => {
        const radius = Math.hypot(
          Math.max(clientX, window.innerWidth - clientX),
          Math.max(clientY, window.innerHeight - clientY)
        );
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${clientX}px ${clientY}px)`,
              `circle(${radius}px at ${clientX}px ${clientY}px)`,
            ],
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // Transition was skipped; the theme has already been applied.
      });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? resolvedTheme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      className="text-foreground/80 hover:text-foreground cursor-pointer"
    >
      <Sun
        aria-hidden
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  );
}
