import type { Metadata } from "next";
import AuroraBackgroundDemo from "@/components/aurora-background-demo";

export const metadata: Metadata = {
  title: "Aurora Background Demo",
  robots: { index: false, follow: false },
};

export default function AuroraDemoPage() {
  return <AuroraBackgroundDemo />;
}
