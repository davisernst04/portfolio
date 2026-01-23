import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    // Check if user is authenticated admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    let posts;
    if (session?.user) {
      // Verify admin status
      const adminGithubId = process.env.ADMIN_GITHUB_ID;
      const account = await prisma.account.findFirst({
        where: {
          userId: session.user.id,
          providerId: "github",
        },
      });

      const isAdmin = account && account.accountId === adminGithubId;

      if (isAdmin) {
        // Admins see all posts including drafts
        posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
        });
      } else {
        // Non-admins only see published posts
        posts = await prisma.post.findMany({
          where: { publish: true },
          orderBy: { createdAt: "desc" },
        });
      }
    } else {
      // Unauthenticated users only see published posts
      posts = await prisma.post.findMany({
        where: { publish: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
