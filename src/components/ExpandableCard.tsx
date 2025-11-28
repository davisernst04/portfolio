"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// 1. Define your data structure
const items = [
  {
    id: 1,
    title: "Project A",
    description: "Click to expand me",
    content: "Full content for Project A...",
  },
  {
    id: 2,
    title: "Project B",
    description: "Click to expand me",
    content: "Full content for Project B...",
  },
];

export default function ExpandableCard() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const uniqueId = useId(); // Helps generate unique layoutIds

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 2. Render the Grid of Small Cards */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          layoutId={`card-${item.id}-${uniqueId}`} // CRITICAL: This connects the small card to the big one
          onClick={() => setSelectedId(item.id)}
          className="cursor-pointer"
        >
          {/* We wrap the shadcn Card in a motion div */}
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}

      {/* 3. Render the Expanded Overlay */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
            {/* The Backdrop (Dark Background) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)} // Click outside to close
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* The Expanded Card */}
            <motion.div
              layoutId={`card-${selectedId}-${uniqueId}`} // MATCHING ID: This tells framer to morph from the small card
              className="w-full max-w-lg bg-background rounded-xl shadow-2xl z-10 overflow-hidden relative"
            >
              {/* Reuse Shadcn Card parts or build custom structure */}
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 p-2 bg-black/10 rounded-full hover:bg-black/20 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="p-6">
                  {/* We find the active item data */}
                  {items.map(
                    (item) =>
                      item.id === selectedId && (
                        <div key={item.id}>
                          <motion.h2
                            layoutId={`title-${item.id}-${uniqueId}`}
                            className="text-2xl font-bold mb-2"
                          >
                            {item.title}
                          </motion.h2>
                          <motion.p
                            layoutId={`desc-${item.id}-${uniqueId}`}
                            className="text-muted-foreground mb-4"
                          >
                            {item.description}
                          </motion.p>

                          {/* Expanded-only content (fade in) */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <p>{item.content}</p>
                            <div className="mt-4 p-4 bg-secondary rounded-lg">
                              More details that were hidden...
                            </div>
                          </motion.div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
