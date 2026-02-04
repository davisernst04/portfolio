import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const initialItems = [
  {
    title: "Tyler Durden",
    image:
      "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.2,
    offsetY: 50,
    rotate: -5,
  },
  {
    title: "The Narrator",
    image:
      "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.25,
    offsetY: 180,
    rotate: -7,
  },
  {
    title: "Iceland",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.4,
    offsetY: 30,
    rotate: 8,
  },
  {
    title: "Japan",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.55,
    offsetY: 150,
    rotate: 10,
  },
  {
    title: "Norway",
    image:
      "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.35,
    offsetY: 100,
    rotate: 2,
  },
  {
    title: "New Zealand",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.45,
    offsetY: 120,
    rotate: -7,
  },
  {
    title: "Canada",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offsetX: 0.3,
    offsetY: 40,
    rotate: 4,
  },
];

export function DraggableCards() {
  const [visibleCards, setVisibleCards] = useState<number[]>(
    initialItems.map((_, i) => i),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerPos, setContainerPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerPos({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  const handleCardRemove = (index: number) => {
    setVisibleCards((prev) => prev.filter((i) => i !== index));
  };

  const handleReset = () => {
    setVisibleCards(initialItems.map((_, i) => i));
  };

  return (
    <div className="flex flex-col gap-4">
      <DraggableCardContainer
        ref={containerRef}
        className="relative flex w-full items-center justify-center min-h-[500px] md:min-h-[600px]"
      >
        <p className="absolute top-1/2 mx-auto max-w-xs md:max-w-sm -translate-y-3/4 text-center text-xl md:text-2xl lg:text-4xl font-black text-neutral-400 dark:text-neutral-800 px-4">
          If its your first day at Fight Club, you have to fight.
        </p>
        {initialItems.map((item, index) =>
          visibleCards.includes(index) ? (
            <DraggableCardBody
              key={index}
              style={{
                top: containerPos.top + item.offsetY,
                left: containerPos.left + containerPos.width * item.offsetX,
                rotate: `${item.rotate}deg`,
              }}
              onRemove={() => handleCardRemove(index)}
            >
              import Image from "next/image";

// ... (rest of the component)

              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={320}
                className="relative z-10 h-60 w-60 md:h-80 md:w-80 object-cover rounded-md"
              />
              <h3 className="mt-4 text-center text-xl md:text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </h3>
            </DraggableCardBody>
          ) : null,
        )}
      </DraggableCardContainer>
      {visibleCards.length < initialItems.length && (
        <Button onClick={handleReset} variant="outline" className="mx-auto">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Cards
        </Button>
      )}
    </div>
  );
}
