import Image from "next/image";
import NavigationBar from "@/components/NavigationBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function About() {
  return (
    <div className="flex flex-col text-foreground">
      <header>
        <NavigationBar />
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 max-w-6xl mx-auto py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
            {/* Left side - Text */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-7xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                  About Me
                </h1>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl">
                Welcome to my portfolio! I am a passionate software developer
                with a keen interest in building innovative solutions.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Decorative background */}
                <div className="relative rounded-full overflow-hidden shadow-2xl border-4 bg-background">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src="/profile_pic.JPEG"
                      alt="Portrait of Davis Ernst"
                      fill
                      className="object-cover"
                      priority
                    />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills/Technologies Section */}
      </main>
    </div>
  );
}
