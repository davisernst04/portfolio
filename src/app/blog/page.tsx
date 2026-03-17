import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function BlogPage() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      {allPostsData.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allPostsData.map(({ slug, title, date, excerpt }) => (
            <Link key={slug} href={`/blog/${slug}`} className="block group">
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 group-hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">{excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No blog posts found. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
