import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수사 인증서",
  robots: { index: false, follow: false },
};

export default function CertificationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
