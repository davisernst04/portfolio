import { cn } from "@/lib/utils";
import type { CSSProperties, HTMLProps, ReactNode } from "react";
import light from "../../../public/photos/optimized/aurora-light.webp";
import dark from "../../../public/photos/optimized/aurora-dark.webp";
import lightFlat from "../../../public/photos/optimized/aurora-light-flat.webp";
import darkFlat from "../../../public/photos/optimized/aurora-dark-flat.webp";

interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
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
        "relative isolate min-h-screen bg-background text-foreground",
        className,
      )}
      {...props}
    >
      {/* A viewport-sized layer stays independent of expanding project panels.
          Only its transform moves; the gradient is not repainted every frame. */}
      <div
        aria-hidden="true"
        className="aurora-viewport"
        data-masked={showRadialGradient}
      >
        <div
          data-aurora
          className="aurora-plane"
          style={{
            "--aurora-light": `url("${(showRadialGradient ? light : lightFlat).src}")`,
            "--aurora-dark": `url("${(showRadialGradient ? dark : darkFlat).src}")`,
          } as CSSProperties}
        />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
