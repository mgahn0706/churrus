import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "용의자 투표",
  robots: { index: false, follow: false },
};

export default function VoteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
