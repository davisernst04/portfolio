"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: number | string;
}

export function MarkdownEditor({
  value,
  onChange,
  height = 700,
}: MarkdownEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ height }} className="w-full bg-muted/20 animate-pulse rounded-md" />;
  }

  const colorMode = theme === "dark" ? "dark" : "light";

  return (
    <div className="w-full flex flex-col" data-color-mode={colorMode}>
      <style jsx global>{`
        .w-md-editor {
          z-index: 100 !important;
        }
        .w-md-editor-fullscreen {
          z-index: 9999 !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          height: 100vh !important;
          width: 100vw !important;
          position: fixed !important;
        }
      `}</style>
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview="live"
        className="w-full"
        textareaProps={{
          placeholder: "Start writing your masterpiece...",
        }}
      />
    </div>
  );
}
