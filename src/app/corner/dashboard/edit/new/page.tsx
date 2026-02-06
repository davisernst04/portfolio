import PostEditor from "@/components/PostEditor";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "New Post - Dashboard",
};

export default async function NewPostPage() {
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

  return <PostEditor isNew={true} />;
}