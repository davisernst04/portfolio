"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleProps extends Omit<
  React.ComponentProps<typeof CollapsiblePrimitive.Root>,
  "children"
> {
  expandDirection?: string;
  expandBehavior?: string;
  initialDelay?: number;
  onExpandStart?: () => void;
  onExpandEnd?: () => void;
  children?:
    | React.ReactNode
    | ((props: { isExpanded: boolean }) => React.ReactNode);
}

function Collapsible({
  onExpandStart,
  onExpandEnd,
  children,
  ...props
}: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = React.useState(
    props.defaultOpen || false,
  );

  React.useEffect(() => {
    if (isExpanded && onExpandStart) {
      onExpandStart();
    }
  }, [isExpanded, onExpandStart]);

  const handleOpenChange = (open: boolean) => {
    setIsExpanded(open);
    if (props.onOpenChange) {
      props.onOpenChange(open);
    }
    if (open && onExpandEnd) {
      setTimeout(onExpandEnd, 100);
    }
  };

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
      open={isExpanded}
      onOpenChange={handleOpenChange}
    >
      {typeof children === "function" ? children({ isExpanded }) : children}
    </CollapsiblePrimitive.Root>
  );
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

interface CollapsibleContentProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
> {
  preset?: string;
  stagger?: boolean;
  staggerChildren?: number;
  keepMounted?: boolean;
  animateIn?: Record<string, unknown>;
}

function CollapsibleContent({
  keepMounted,
  ...props
}: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      forceMount={keepMounted ? true : undefined}
      {...props}
    />
  );
}

interface CollapsibleCardProps extends React.ComponentProps<"div"> {
  collapsedSize?: { width: number; height: number };
  expandedSize?: { width: number; height: number };
  hoverToExpand?: boolean;
  expandDelay?: number;
  collapseDelay?: number;
}

function CollapsibleCard({ className, ...props }: CollapsibleCardProps) {
  return (
    <div
      data-slot="collapsible-card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collapsible-card-header"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CollapsibleCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collapsible-card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CollapsibleCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="collapsible-card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleCard,
  CollapsibleCardHeader,
  CollapsibleCardContent,
  CollapsibleCardFooter,
};
