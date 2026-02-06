import PostEditor from "@/components/PostEditor";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  return {
    title: post ? `Edit: ${post.title}` : "Edit Post",
  };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Server-side auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/corner");
  }

  // Double check admin status
  const adminGithubId = process.env.ADMIN_GITHUB_ID;
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  const isAdmin = account && account.accountId === adminGithubId;

  if (!isAdmin) {
      redirect("/corner");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <PostEditor
      isNew={false}
      initialData={{
        id: post.id,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        publish: post.publish,
      }}
    />
  );
}
