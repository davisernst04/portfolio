"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { createPost, deletePost, updatePost } from "@/actions/posts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarkdownEditor } from "@/components/Editor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  publish: boolean;
  slug: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Form state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("**Hello World!**");
  const [imageUrl, setImageUrl] = useState("");
  const [publish, setPublish] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (!isPending && !session?.user) {
        router.push("/corner");
        return;
      }

      // Check if user is authorized via API
      if (session?.user) {
        try {
          const response = await fetch("/api/auth/check-admin");
          const { isAdmin } = await response.json();

          if (!isAdmin) {
            await signOut();
            router.push("/corner/");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          await signOut();
          router.push("/corner/");
        }
      }
    }

    checkAuth();
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      fetchPosts();
    }
  }, [session]);

  // Fix body scroll when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      document.body.style.overflow = "unset";
      document.body.style.pointerEvents = "auto";
    }
  }, [isDialogOpen]);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingPostId(null);
    setTitle("");
    setContent("**Hello World!**");
    setImageUrl("");
    setPublish(false);
    setIsDialogOpen(true);
  }

  function openEditDialog(post: Post) {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setImageUrl(post.imageUrl || "");
    setPublish(post.publish);
    setIsDialogOpen(true);
  }

  function handleDialogClose(open: boolean) {
    setIsDialogOpen(open);
    if (!open) {
      // Reset form when dialog closes
      setEditingPostId(null);
      setTitle("");
      setContent("**Hello World!**");
      setImageUrl("");
      setPublish(false);
      // Ensure body scroll is enabled
      setTimeout(() => {
        document.body.style.overflow = "unset";
        document.body.style.pointerEvents = "auto";
      }, 100);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    let result;
    if (editingPostId) {
      result = await updatePost({
        id: editingPostId,
        title,
        content,
        imageUrl: imageUrl || null,
        publish,
      });
    } else {
      result = await createPost({
        title,
        content,
        imageUrl: imageUrl || null,
        publish,
      });
    }

    if (result?.error) {
      alert("Error: " + result.error);
      setIsSubmitting(false);
    } else {
      setTitle("");
      setContent("**Hello World!**");
      setImageUrl("");
      setPublish(false);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      setEditingPostId(null);
      fetchPosts();
    }
  }

  async function handleDelete(id: string) {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  async function confirmDelete() {
    if (!postToDelete) return;

    await deletePost(postToDelete);
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
    fetchPosts();
  }

  function cancelDelete() {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  }

  async function togglePublish(post: Post) {
    await updatePost({ id: post.id, publish: !post.publish });
    fetchPosts();
  }

  if (isPending || isLoading)
    return <p className="text-center text-foreground p-6">Loading...</p>;
  if (!session?.user)
    return <p className="text-center text-foreground p-6">Redirecting...</p>;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-6xl font-bold">Dashboard</h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPostId ? "Edit Blog Post" : "Create New Blog Post"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a catchy title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">
                    Featured Image URL (Optional)
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    type="url"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a URL to an image to display with this post
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <div className="h-[400px]">
                    <MarkdownEditor
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      height="400px"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="publish"
                    checked={publish}
                    onCheckedChange={setPublish}
                  />
                  <Label htmlFor="publish" className="cursor-pointer">
                    Publish immediately
                  </Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Saving..."
                      : editingPostId
                        ? "Update Post"
                        : publish
                          ? "Publish Post"
                          : "Save Draft"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="rounded-lg max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Are you sure you want to delete this post?
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelDelete}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={confirmDelete}
                  className="cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              router.push("/");
            }}
            className="cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      </div>

      <BentoGrid className="max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground">
              No posts yet. Time to write something!
            </p>
          </div>
        ) : (
          posts.map((post) => {
            return (
              <BentoGridItem
                key={post.id}
                title={
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-2">{post.title}</span>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => togglePublish(post)}
                        title={post.publish ? "Unpublish" : "Publish"}
                      >
                        {post.publish ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => openEditDialog(post)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive cursor-pointer"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                }
                description={
                  <div className="space-y-2">
                    <div className="text-xs">
                      {post.publish ? (
                        <span className="text-green-600 dark:text-green-400">
                          Published
                        </span>
                      ) : (
                        <span className="text-yellow-600 dark:text-yellow-400">
                          Draft
                        </span>
                      )}{" "}
                      • {new Date(post.createdAt).toLocaleDateString()} •
                      Updated {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                    <p className="line-clamp-3 text-xs">
                      {post.content.substring(0, 150)}...
                    </p>
                  </div>
                }
                header={
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <Image
                      src={post.imageUrl || "/profile_pic.JPEG"}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                }
              />
            );
          })
        )}
      </BentoGrid>
    </main>
  );
}
