import { FruitMarketPageContent } from "@/features/fruit-market/components/FruitMarketPageContent";
import Head from "next/head";

export default function FruitMarketPage() {
  return (
    <>
      <Head>
        <title>과일가게 | 추러스</title>
      </Head>
      <FruitMarketPageContent />
    </>
  );
}
