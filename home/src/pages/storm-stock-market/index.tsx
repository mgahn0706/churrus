import StormStockMarketPageContent from "@/features/storm-stock-market/components/StormStockMarketPageContent";
import usePreventUnload from "@/hooks/usePreventUnload";
import Head from "next/head";

export default function StormStockMarketPage() {
  usePreventUnload();

  return (
    <>
      <Head>
        <title>폭풍의 증권시장</title>
      </Head>
      <StormStockMarketPageContent />
    </>
  );
}
