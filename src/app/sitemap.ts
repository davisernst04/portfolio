import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://davisernst.com";

  // Get all published blog posts
  const posts = await prisma.post.findMany({
    where: { publish: true },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const postUrls = posts.map((post: { slug: string; updatedAt: Date }) => ({
    url: `${baseUrl}/corner/post/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/corner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postUrls,
  ];
}
