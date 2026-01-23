import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Corner - Blog",
  description:
    "Personal blog by Davis Ernst. Thoughts on software development, technology, and computer science.",
  openGraph: {
    title: "Corner - Davis Ernst's Blog",
    description:
      "Personal blog with articles on software development and technology.",
  },
};

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    .replace(/^\s*>\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^(-{3,}|_{3,}|\*{3,})$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default async function PublicCornerPage() {
  const posts = await prisma.post.findMany({
    where: { publish: true },
    orderBy: { createdAt: "desc" },
  });

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <main className="text-foreground min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-center text-7xl md:text-8xl lg:text-9xl font-bold mb-2">
          Davis Corner
        </h1>
        <div className="flex justify-center">
          <p className="text-center text-lg mb-12 max-w-3xl text-muted-foreground">
            Not really sure what this is supposed to be. I guess it&apos;s a
            blog? A place to dump my thoughts?
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">Nothing here yet...</h2>
            <p className="text-muted-foreground">
              Check back soon for updates!
            </p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <Link
                href={`/corner/post/${featuredPost.slug}`}
                className="block group/featured mb-12"
              >
                <Card className="hover:shadow-xl transition-all duration-200 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                    <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-lg">
                      <Image
                        src={featuredPost.imageUrl || "/profile_pic.JPEG"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover/featured:scale-110 transition-transform duration-300"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-4 lg:p-8 flex flex-col justify-center">
                      <div className="space-y-4 transition duration-200 group-hover/featured:translate-x-2">
                        <time
                          dateTime={featuredPost.createdAt.toISOString()}
                          className="text-sm text-muted-foreground block uppercase tracking-wide"
                        >
                          {new Date(featuredPost.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight group-hover/featured:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-lg text-muted-foreground line-clamp-4">
                          {stripMarkdown(featuredPost.content).substring(
                            0,
                            300,
                          )}
                          ...
                        </p>
                        <Button
                          variant="default"
                          className="w-fit group-hover/featured:shadow-lg transition-shadow"
                        >
                          Read Full Article →
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {remainingPosts.length > 0 && (
              <hr className="border-t border-border my-12" />
            )}

            {remainingPosts.length > 0 && (
              <BentoGrid className="max-w-7xl mx-auto">
                {remainingPosts.map((post) => {
                  const plainTextPreview = stripMarkdown(
                    post.content,
                  ).substring(0, 150);

                  return (
                    <Link
                      key={post.id}
                      href={`/corner/post/${post.slug}`}
                      className="block"
                    >
                      <BentoGridItem
                        title={
                          <span className="line-clamp-2 group-hover/bento:text-primary transition-colors">
                            {post.title}
                          </span>
                        }
                        description={
                          <div className="space-y-2">
                            <time
                              dateTime={post.createdAt.toISOString()}
                              className="text-xs text-muted-foreground block"
                            >
                              {new Date(post.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </time>
                            <p className="line-clamp-3">
                              {plainTextPreview}...
                            </p>
                          </div>
                        }
                        header={
                          <div className="relative w-full h-32 rounded-lg overflow-hidden">
                            <Image
                              src={post.imageUrl || "/profile_pic.JPEG"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover/bento:scale-110 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        }
                      />
                    </Link>
                  );
                })}
              </BentoGrid>
            )}
          </>
        )}
      </div>
    </main>
  );
}
