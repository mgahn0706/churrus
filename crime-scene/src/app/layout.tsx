import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "추러스 : 서울대학교 중앙 추리동아리",
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
