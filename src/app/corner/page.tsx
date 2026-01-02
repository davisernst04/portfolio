"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/corner/sign-up")}
          className="font-medium px-6 py-2 rounded-md "
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/corner/sign-in")}
          className="border font-medium px-6 py-2 rounded-md "
        >
          Sign In
        </Button>
      </div>
    </main>
  );
}
