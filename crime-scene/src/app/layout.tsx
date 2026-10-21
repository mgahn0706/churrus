import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SITE_URL } from "@/libs/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "협동 크라임씬 | 추러스",
    template: "%s | 추러스",
  },
  description:
    "서울대학교 중앙 추리동아리 추러스가 만든 온라인 협동 크라임씬. 다양한 살인사건 시나리오에서 단서를 조사하고 범인을 추리해보세요.",
  applicationName: "추러스 협동 크라임씬",
  keywords: [
    "크라임씬",
    "추리게임",
    "협동 추리게임",
    "온라인 크라임씬",
    "추러스",
    "서울대학교 추리동아리",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "추러스 협동 크라임씬",
    title: "협동 크라임씬 | 추러스",
    description:
      "단서를 조사하고 용의자를 심문하며 함께 범인을 찾아가는 온라인 협동 추리게임입니다.",
    images: [
      {
        url: "/image/scenario/startup/startup-main.png",
        width: 1536,
        height: 1024,
        alt: "추러스 협동 크라임씬",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "협동 크라임씬 | 추러스",
    description:
      "단서를 조사하고 용의자를 심문하며 함께 범인을 찾아가는 온라인 협동 추리게임입니다.",
    images: ["/image/scenario/startup/startup-main.png"],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/favicon.ico?v=home-20250625",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
