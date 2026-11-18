import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-start justify-center min-h-screen px-4 max-w-6xl mx-auto">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-[40ch]">
        This address doesn&apos;t match any page on the site. The projects and
        contact links are on the home page.
      </p>
      <Button asChild size="lg" className="mt-8 text-base">
        <Link href="/">Go to the home page</Link>
      </Button>
    </main>
  );
}
