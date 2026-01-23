"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: number | string;
}

export function MarkdownEditor({
  value,
  onChange,
  height = 500,
}: MarkdownEditorProps) {
  return (
    <div className="h-full">
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview="live"
        className="overflow-hidden rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        textareaProps={{
          placeholder: "Start writing your masterpiece...",
        }}
      />
    </div>
  );
}
