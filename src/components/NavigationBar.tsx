"use client";

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    // Outer container for floating effect: adds padding to detach from top/sides
    // and ensures the sticky behavior applies to this container.
    <div className="sticky top-0 z-50 py-4">
      {/* py-4 adds vertical spacing */}
      {/* The nav itself will now be the "floating" element */}
      <nav
        className="sticky top-0 w-full max-w-6xl mx-auto
                      bg-background/50 backdrop-blur-md
                      rounded-xl shadow-lg border-2 border-border/50
                      px-6 py-4"
      >
        {" "}
        {/* px-6 py-4 for inner padding */}
        {/* Main Grid Container for Left, Center, Right */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left - Logo/Brand */}
          <div className="flex items-center justify-start">
            <Link
              href={{
                pathname: '/',
              }}
              className="text-xl font-bold hover:text-primary transition-colors whitespace-nowrap"
            >
              Davis Ernst
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-6">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side - Mode Toggle and Mobile Menu */}
          <div className="flex items-center justify-end gap-2">
            <ModeToggle />
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigationItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2 px-4 rounded-md hover:bg-accent"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
