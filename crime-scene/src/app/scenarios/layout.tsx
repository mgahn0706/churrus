import type { Metadata } from "next";
import { SITE_URL } from "@/libs/site";

export const metadata: Metadata = {
  title: "온라인 협동 크라임씬",
  description:
    "추러스가 만든 온라인 협동 크라임씬 시나리오를 선택하고 친구들과 함께 단서를 조사해 범인을 찾아보세요.",
  alternates: {
    canonical: "/scenarios",
  },
  openGraph: {
    url: "/scenarios",
    title: "온라인 협동 크라임씬 | 추러스",
    description:
      "다양한 살인사건 시나리오에서 단서를 조사하고 친구들과 함께 범인을 추리해보세요.",
  },
};

export default function ScenariosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "추러스 협동 크라임씬",
    alternateName: "협동 크라임씬",
    url: `${SITE_URL}/scenarios`,
    inLanguage: "ko-KR",
    description:
      "서울대학교 중앙 추리동아리 추러스가 만든 온라인 협동 크라임씬",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
