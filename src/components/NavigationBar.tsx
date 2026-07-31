"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ModeToggle } from "@/components/ModeToggle";

const navigationItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
];

const underlineClasses =
  "absolute inset-x-0 -bottom-0.5 h-px bg-current origin-left scale-x-0 motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The Radix sheet locks page scroll (body overflow: hidden) until its close
 *  lifecycle finishes, so a programmatic scroll issued earlier is dropped. */
function isPageScrollLocked() {
  return getComputedStyle(document.body).overflow === "hidden";
}

/** Returns the section id for a same-page hash href, or null when the
 *  default navigation should be left alone (other routes, unknown ids). */
function getTargetId(href: string): string | null {
  if (window.location.pathname !== "/") return null;
  const id = href.startsWith("/#")
    ? href.slice(2)
    : href.startsWith("#")
      ? href.slice(1)
      : null;
  return id && document.getElementById(id) ? id : null;
}

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  // Monotonic request token: every new scroll request invalidates any older
  // pending RAF/timeout callback, so only the latest selection can scroll.
  const requestTokenRef = useRef(0);
  const pendingRafRef = useRef<number | null>(null);

  const cancelPendingScroll = useCallback(() => {
    requestTokenRef.current += 1;
    if (pendingRafRef.current !== null) {
      cancelAnimationFrame(pendingRafRef.current);
      pendingRafRef.current = null;
    }
    // Cancel any in-progress native smooth scroll so a stale animation
    // cannot drag the page back toward a previous target.
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  }, []);

  /** Queues exactly one scroll to the target. The scroll is issued only once
   *  the sheet's scroll lock releases, and only if no newer request has
   *  superseded this one in the meantime. */
  const requestScrollToSection = useCallback(
    (id: string, smooth: boolean) => {
      cancelPendingScroll();
      const token = requestTokenRef.current;
      const target = document.getElementById(id);
      if (!target) return;
      const behavior: ScrollBehavior =
        smooth && !prefersReducedMotion() ? "smooth" : "auto";
      const step = () => {
        if (token !== requestTokenRef.current) return; // superseded
        if (isPageScrollLocked()) {
          pendingRafRef.current = requestAnimationFrame(step);
          return;
        }
        pendingRafRef.current = null;
        target.scrollIntoView({ block: "start", behavior });
      };
      step();
    },
    [cancelPendingScroll],
  );

  // Drop any queued scroll when the bar unmounts.
  useEffect(() => cancelPendingScroll, [cancelPendingScroll]);

  // Direct hash loads: the browser's fragment jump happens before hydration,
  // so re-align (instantly) once React is up and again after fonts/images
  // settle in case layout shifted the target. A user selection supersedes
  // these callbacks.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    let realignToken = requestTokenRef.current;
    const realign = () => {
      if (realignToken !== requestTokenRef.current) return;
      requestScrollToSection(id, false);
      realignToken = requestTokenRef.current;
    };
    const frame = requestAnimationFrame(realign);
    const timer = window.setTimeout(realign, 800);
    window.addEventListener("load", realign);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", realign);
    };
  }, [requestScrollToSection]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const id = getTargetId(href);
    if (!id) return;
    event.preventDefault();
    window.history.pushState(null, "", `/#${id}`);
    requestScrollToSection(id, true);
  };

  const handleSheetNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const id = getTargetId(href);
    if (!id) return;
    event.preventDefault();
    setOpen(false);
    window.history.pushState(null, "", `/#${id}`);
    // Instant scroll once the sheet's scroll lock releases: deterministic
    // for rapid sequential selections (no smooth animation left to race).
    requestScrollToSection(id, false);
  };

  return (
    <nav
      aria-label="Primary navigation"
      className="px-4 w-full bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="px-4 flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <div className="lg:hidden -ml-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  aria-label="Open navigation menu"
                >
                  <Menu aria-hidden className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col gap-4 mt-8 px-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleSheetNavClick(event, item.href)}
                      className="group relative w-fit text-lg font-medium text-foreground/80 hover:text-foreground focus-visible:text-foreground transition-colors px-1 py-2 cursor-pointer"
                    >
                      {item.label}
                      <span aria-hidden className={underlineClasses} />
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation - Left Aligned */}
          <div className="hidden lg:flex items-center gap-6 -ml-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="group relative text-md font-medium text-foreground/80 hover:text-foreground focus-visible:text-foreground transition-colors px-1 py-2 cursor-pointer"
              >
                {item.label}
                <span aria-hidden className={underlineClasses} />
              </a>
            ))}
          </div>

          {/* Theme Toggle - Right Aligned */}
          <div className="ml-auto -mr-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
