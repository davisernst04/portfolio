import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ isAdmin: false });
  }

  const adminGithubId = process.env.ADMIN_GITHUB_ID;

  if (!adminGithubId) {
    console.error("ADMIN_GITHUB_ID not set in environment variables");
    return Response.json({ isAdmin: false });
  }

  // Query the account from the database
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: "github",
    },
  });

  const isAdmin = account && account.accountId === adminGithubId;

  return Response.json({ isAdmin });
}
