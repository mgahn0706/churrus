import AdventurePageContent from "@/features/adventure/components/AdventurePageContent";
import Head from "next/head";

export default function AdventurePage() {
  return (
    <>
      <Head>
        <title>대이동 아카이브 | 추러스</title>
        <meta
          name="description"
          content="서울 곳곳의 암호를 따라 이동하는 추러스 MT 대이동 아카이브"
        />
      </Head>
      <AdventurePageContent />
    </>
  );
}
