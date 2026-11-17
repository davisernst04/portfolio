import { ModeToggle } from "@/components/ModeToggle";

export default function NavigationBar() {
  return (
    <header
      className="site-header px-4 w-full bg-background border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="px-4 flex items-center justify-end h-16">
          <div className="-mr-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
