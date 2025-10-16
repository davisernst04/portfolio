"use client";
import { Button } from "./ui/button";
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";

export default function NavigationBar() {

  const navigationItems = [
    { href: "#/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    // Outer container for floating effect: adds padding to detach from top/sides
    // and ensures the sticky behavior applies to this container.
    <div className="sticky top-0 z-50 ">
      {/* py-4 adds vertical spacing */}
      {/* The nav itself will now be the "floating" element */}
      <nav
        className="sticky top-0 w-full mx-auto
                      bg-background/50 backdrop-blur-md
                      shadow-lg border-x-2 border-b-2 border-border/50
                      px-6 py-4"
      >
        {" "}
        {/* px-6 py-4 for inner padding */}
        {/* Main Grid Container for Left, Center, Right */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left - Logo/Brand */}
          <div className="flex items-center justify-start">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="cursor-pointer"
            >
              <Link href="/">
                DE
              </Link>
            </Button>
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
          </div>
        </div>
      </nav >
    </div >
  );
}
