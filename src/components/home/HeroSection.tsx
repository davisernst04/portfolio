import Image from "next/image";
import portrait from "../../../public/photos/optimized/profile.webp";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="shrink-0 pb-[clamp(0.75rem,3dvh,2rem)] [@media(max-height:420px)]:pb-2"
    >
      <Image
        src={portrait}
        alt="Portrait of Davis Ernst"
        sizes="clamp(2.5rem, 11dvh, 5rem)"
        placeholder="blur"
        loading="eager"
        className="mb-2 size-[clamp(2.5rem,11dvh,5rem)] rounded-full border border-border object-cover"
      />
      <h1
        id="hero-name"
        className="hero-name text-3xl font-bold md:text-4xl [@media(max-height:420px)]:text-2xl"
      >
        <span className="hero-word">Davis</span>{" "}
        <span className="hero-word">Ernst</span>
      </h1>
      <p className="hero-subtitle mt-1 text-base text-muted-foreground sm:text-lg [@media(max-height:420px)]:text-sm">
        Computer Science Student at the University of Saskatchewan · Software
        Developer
      </p>
    </section>
  );
}
