import GlobalHeader from "@/components/Navigation/GlobalHeader";
import QuizIndexPage from "@/features/quiz/components/QuizIndexPage";
import Head from "next/head";

export default function Quiz() {
  return (
    <>
      <Head>
        <title>문제적 추러스 : 서울대 추리 동아리</title>
      </Head>
      <GlobalHeader />
      <QuizIndexPage />
    </>
  );
}
