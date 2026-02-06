"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Edit, Eye, EyeOff } from "lucide-react";
import { deletePost, updatePost } from "@/actions/posts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";
import Link from "next/link";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

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
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-6xl font-bold">Dashboard</h1>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button asChild className="cursor-pointer">
            <Link href="/corner/dashboard/edit/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>

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

      <BentoGrid className="w-full mx-auto">
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
                        onClick={(e) => {
                          e.preventDefault();
                          togglePublish(post);
                        }}
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
                        asChild
                      >
                        <Link href={`/corner/dashboard/edit/${post.id}`}>
                          <Edit className="h-3 w-3" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(post.id);
                        }}
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
                      src={post.imageUrl || "/photos/profile.JPG"}
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