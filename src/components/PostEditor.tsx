"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MarkdownEditor } from "@/components/Editor";
import { createPost, updatePost } from "@/actions/posts";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface PostEditorProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    publish: boolean;
  };
  isNew?: boolean;
}

export default function PostEditor({ initialData, isNew = false }: PostEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "**Hello World!**");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [publish, setPublish] = useState(initialData?.publish || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-save logic
  useEffect(() => {
    if (!isMounted) return;

    const saveDraft = () => {
      setSaveStatus("saving");
      try {
        const draftKey = isNew ? "blog_post_new_draft" : `blog_post_edit_draft_${initialData?.id}`;
        const draft = {
          title,
          content,
          imageUrl,
          publish,
          id: initialData?.id,
          timestamp: Date.now(),
        };
        localStorage.setItem(draftKey, JSON.stringify(draft));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } catch (error) {
        console.error("Auto-save failed:", error);
        setSaveStatus("error");
      }
    };

    const debounceTimer = setTimeout(saveDraft, 2000);
    return () => clearTimeout(debounceTimer);
  }, [title, content, imageUrl, publish, isMounted, isNew, initialData?.id]);

  // Load draft on mount
  useEffect(() => {
    if (!isMounted) return;
    
    const draftKey = isNew ? "blog_post_new_draft" : `blog_post_edit_draft_${initialData?.id}`;
    const savedDraft = localStorage.getItem(draftKey);
    
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        // If it's a "new" post, or if the draft is newer than the initial data
        if (isNew || (draft.timestamp > new Date().getTime() - 1000 * 60 * 60)) { // within last hour
           if (confirm("You have an unsaved draft for this post. Would you like to restore it?")) {
             setTitle(draft.title || "");
             setContent(draft.content || "");
             setImageUrl(draft.imageUrl || "");
             setPublish(draft.publish || false);
           }
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, [isMounted, isNew, initialData?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let result;
      if (isNew) {
        result = await createPost({ title, content, imageUrl: imageUrl || null, publish });
      } else if (initialData?.id) {
        result = await updatePost({ id: initialData.id, title, content, imageUrl: imageUrl || null, publish });
      }

      if (result?.error) {
        alert("Error: " + result.error);
      } else {
        const draftKey = isNew ? "blog_post_new_draft" : `blog_post_edit_draft_${initialData?.id}`;
        localStorage.removeItem(draftKey);
        router.push("/corner/dashboard");
        router.refresh();
      }
    } catch (error) {
      console.error("Submit failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 text-foreground min-h-screen">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="cursor-pointer">
          <Link href="/corner/dashboard">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {isNew ? "Create New Post" : "Edit Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">Post Title</Label>
            <Input
              id="title"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold py-8 px-4"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Featured Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="url"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Content</Label>
            <div className="border rounded-md overflow-hidden bg-background">
              <MarkdownEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={700}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-muted/30 rounded-lg border">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <Switch
                id="publish"
                checked={publish}
                onCheckedChange={setPublish}
              />
              <Label htmlFor="publish" className="cursor-pointer font-medium">
                Publish immediately
              </Label>
            </div>
            <div className="text-xs text-muted-foreground min-h-[1rem]">
              {saveStatus === "saving" && <span className="animate-pulse text-primary">Saving draft...</span>}
              {saveStatus === "saved" && <span className="text-green-600 dark:text-green-400">Draft saved locally</span>}
              {saveStatus === "error" && <span className="text-destructive">Save failed</span>}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              asChild
              className="flex-1 sm:flex-none cursor-pointer"
            >
              <Link href="/corner/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none cursor-pointer">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isNew ? (publish ? "Publish Post" : "Save Draft") : "Update Post"}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
