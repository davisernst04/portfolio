"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const transitionRef = React.useRef<ViewTransition | null>(null);
  const requestedThemeRef = React.useRef<"light" | "dark" | null>(null);
  // Hydration-safe mounted flag: false on the server/first client render,
  // true afterwards — without setState-in-effect.
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const toggleTheme = () => {
    const nextTheme = (requestedThemeRef.current ?? resolvedTheme) === "dark"
      ? "light"
      : "dark";
    requestedThemeRef.current = nextTheme;
    transitionRef.current?.skipTransition();

    const update = () => flushSync(() => setTheme(nextTheme));
    if (!document.startViewTransition) {
      update();
      transitionRef.current = null;
      requestedThemeRef.current = null;
      return;
    }

    // Crossfade two snapshots instead of repainting every theme color per frame.
    const transition = document.startViewTransition(update);
    transitionRef.current = transition;
    // Skipping a superseded transition rejects its capture promise, but the
    // theme update still completes normally.
    void transition.ready.catch(() => {});
    const finish = () => {
      if (transitionRef.current === transition) {
        transitionRef.current = null;
        requestedThemeRef.current = null;
      }
    };
    void transition.finished.then(finish, finish);
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
      className="theme-toggle motion-button text-foreground/80 hover:text-foreground cursor-pointer transition-[transform,background-color] duration-200 ease-[var(--motion-ease)]"
    >
      <Sun
        aria-hidden
        className="theme-icon theme-sun h-[1.2rem] w-[1.2rem]"
      />
      <Moon
        aria-hidden
        className="theme-icon theme-moon absolute h-[1.2rem] w-[1.2rem]"
      />
    </Button>
  );
}
