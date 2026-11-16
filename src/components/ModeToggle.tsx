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
  const requestIdRef = React.useRef(0);
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
    const requestId = ++requestIdRef.current;
    const previousTransition = transitionRef.current;
    transitionRef.current = null;

    // A skipped transition can still run its update callback. Only the latest
    // click may apply a theme or clear the pending request.
    const update = () => {
      if (requestId === requestIdRef.current) {
        flushSync(() => setTheme(nextTheme));
      }
    };
    const finish = () => {
      if (requestId === requestIdRef.current) {
        transitionRef.current = null;
        requestedThemeRef.current = null;
      }
    };

    try {
      previousTransition?.skipTransition();
      if (typeof document.startViewTransition !== "function") {
        update();
        finish();
        return;
      }

      const transition = document.startViewTransition(update);
      transitionRef.current = transition;
      // Theme switching must still succeed if snapshot capture fails.
      void transition.ready.catch(update);
      void transition.finished.then(finish, () => {
        update();
        finish();
      });
    } catch {
      update();
      finish();
    }
  };

  return (
    <Button
      type="button"
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
