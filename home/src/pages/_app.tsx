import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>추러스 : 서울대학교 중앙 추리동아리</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
