"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "transition-bg relative min-h-screen bg-background text-foreground",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform 
            [background-image:var(--white-gradient),var(--aurora)] 
            [background-size:300%,_200%] 
            [background-position:50%_50%,50%_50%]
            [--aurora:repeating-linear-gradient(100deg,var(--primary)_10%,var(--accent)_15%,var(--secondary)_20%,var(--muted)_25%,var(--primary)_30%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--background)_0%,var(--background)_7%,transparent_10%,transparent_12%,var(--background)_16%)]
            [--white-gradient:repeating-linear-gradient(100deg,var(--foreground)_0%,var(--foreground)_7%,transparent_10%,transparent_12%,var(--foreground)_16%)]
            after:absolute after:inset-0 
            after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:[background-attachment:fixed] 
            after:mix-blend-difference 
            after:content-[""]
            dark:[background-image:var(--dark-gradient),var(--aurora)] 
            dark:invert-0 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient &&
            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
          )}
        ></div>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
