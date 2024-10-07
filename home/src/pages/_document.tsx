import { Analytics } from "@vercel/analytics/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>추러스 : 서울대 추리 동아리</title>
      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
