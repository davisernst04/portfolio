import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono, Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Davis Ernst",
    template: "%s | Davis Ernst",
  },
  description:
    "Personal portfolio and blog of Davis Ernst, a Computer Science student at the University of Saskatchewan passionate about software development.",
  keywords: [
    "Davis Ernst",
    "Software Developer",
    "Computer Science",
    "University of Saskatchewan",
    "Full Stack Developer",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Davis Ernst" }],
  creator: "Davis Ernst",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davisernst.com",
    title: "Davis Ernst | Software Developer & Computer Science Student",
    description:
      "Personal portfolio and blog of Davis Ernst, showcasing projects and technical writing.",
    siteName: "Davis Ernst Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davis Ernst | Software Developer",
    description:
      "Personal portfolio and blog of Davis Ernst, showcasing projects and technical writing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable} ${lora.variable}`}
    >
      <body className="m-0 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <NavigationBar />
            <AuroraBackground className="flex-1">
              {children}
            </AuroraBackground>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
