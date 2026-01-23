import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://davisernst.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/corner/dashboard", "/corner/sign-in", "/corner/sign-up"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
