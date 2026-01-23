"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return false;
  }

  const adminGithubId = process.env.ADMIN_GITHUB_ID;
  if (!adminGithubId) {
    return false;
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  return account && account.accountId === adminGithubId;
}

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  imageUrl: z.string().url().optional().nullable(),
  publish: z.boolean().optional(),
});

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  imageUrl: z.string().url().optional().nullable(),
  publish: z.boolean().optional(),
});

export async function createPost(data: z.infer<typeof postSchema>) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  const validation = postSchema.safeParse(data);

  if (!validation.success) {
    return { error: "Invalid data provided." };
  }

  try {
    await prisma.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        imageUrl: validation.data.imageUrl,
        publish: validation.data.publish ?? false,
        slug:
          validation.data.title.toLowerCase().replace(/ /g, "-") +
          "-" +
          Date.now(),
      },
    });

    revalidatePath("/corner/dashboard");
    revalidatePath("/corner");
    return { success: true };
  } catch {
    return { error: "Failed to create post." };
  }
}

export async function updatePost(data: z.infer<typeof updatePostSchema>) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  const validation = updatePostSchema.safeParse(data);

  if (!validation.success) {
    return { error: "Invalid data provided." };
  }

  try {
    const updateData: {
      title?: string;
      slug?: string;
      content?: string;
      imageUrl?: string | null;
      publish?: boolean;
    } = {};
    if (validation.data.title !== undefined) {
      updateData.title = validation.data.title;
      updateData.slug =
        validation.data.title.toLowerCase().replace(/ /g, "-") +
        "-" +
        Date.now();
    }
    if (validation.data.content !== undefined)
      updateData.content = validation.data.content;
    if (validation.data.imageUrl !== undefined)
      updateData.imageUrl = validation.data.imageUrl;
    if (validation.data.publish !== undefined)
      updateData.publish = validation.data.publish;

    await prisma.post.update({
      where: { id: validation.data.id },
      data: updateData,
    });

    revalidatePath("/corner/dashboard");
    revalidatePath("/corner");
    return { success: true };
  } catch {
    return { error: "Failed to update post." };
  }
}

export async function deletePost(id: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/corner/dashboard");
    revalidatePath("/corner");
    return { success: true };
  } catch {
    return { error: "Failed to delete post." };
  }
}
