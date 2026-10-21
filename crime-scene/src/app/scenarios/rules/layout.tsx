import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "게임 규칙",
  description:
    "추러스 협동 크라임씬의 조사 방법, 추리 노트 작성법, 범인 지목과 점수 계산 규칙을 확인하세요.",
  alternates: {
    canonical: "/scenarios/rules",
  },
  openGraph: {
    url: "/scenarios/rules",
    title: "게임 규칙 | 추러스 협동 크라임씬",
  },
};

export default function RulesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
