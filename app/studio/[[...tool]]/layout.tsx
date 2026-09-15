import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GAIO Engine Studio",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
