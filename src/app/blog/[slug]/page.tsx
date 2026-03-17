import { getPostData, getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 flex items-center gap-2 group hover:text-primary transition-colors cursor-pointer">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Button>
      </Link>
      
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
          {postData.title}
        </h1>
        <div className="text-muted-foreground text-lg flex items-center gap-2">
          <time dateTime={postData.date}>
            {new Date(postData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {postData.author && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>{postData.author}</span>
            </>
          )}
        </div>
      </header>
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
      />
      
      <footer className="mt-16 pt-8 border-t">
        <div className="flex justify-between items-center">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="cursor-pointer">
              View all posts
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  );
}
