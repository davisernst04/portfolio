import NavigationBar from "@/components/NavigationBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
export default function Home() {
  return (
    <div className="flex flex-col text-foreground">
      <header className="sticky top-0 z-50">
        <NavigationBar />
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-4 max-w-6xl mx-auto py-4 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16">
            {/* Left side - Text */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-8xl md:text-9xl font-bold tracking-tight sm:text-8xl lg:text-[200px]">
                  Davis Ernst
                </h1>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Decorative background */}
                <div className="z-0 relative rounded shadow-2xl border-border border-4">
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
        {/* Hero Section */}
        <section id="about" className="px-4 max-w-6xl mx-auto ">
          <hr className="max-w-6xl mx-auto my-20 border-border" />
          <h1 className="text-center text-7xl font-bold tracking-tight sm:text-7xl lg:text-9xl">
            About Me
          </h1>
          <Card>
            <CardContent>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </CardContent>
          </Card>


        </section>
      </main>
    </div>
  );
}

