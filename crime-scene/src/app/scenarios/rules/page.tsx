"use client";

import { FadeInSection } from "@/components/FadeInSection";
import Header from "@/components/Header";
import { ShakeTextSection } from "@/components/ShakeTextSection";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RuleCard({
  title,
  description,
  image,
  align = "left",
}: {
  title: string;
  description: string;
  image: string;
  align?: "left" | "right";
}) {
  return (
    <FadeInSection>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: align === "left" ? "row" : "row-reverse",
          },
          gap: { xs: 3, md: 12 },
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "80%" },
          px: { xs: 2, sm: 3, md: 0 },
          mb: { xs: 8, md: 30 },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            maxWidth: { xs: 420, md: 500 },
          }}
        >
          <Image
            src={image}
            width={500}
            height={300}
            alt="규칙 그림"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "700px" },
          }}
        >
          <ShakeTextSection>
            <Typography
              color="white"
              variant="h2"
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                mb: 1,
                fontWeight: "bold",
                wordBreak: "keep-all",
                textAlign: { xs: "left", md: "inherit" },
              }}
            >
              {title}
            </Typography>
          </ShakeTextSection>
          <Typography
            color="lightgray"
            variant="body1"
            sx={{
              fontSize: { xs: "18px", md: "28px" },
              wordBreak: "keep-all",
              lineHeight: { xs: 1.7, md: "inherit" },
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </FadeInSection>
  );
}

const keywordRules = [
  {
    title: "사건 속 단어로 조사합니다",
    description:
      "사건 소개와 용의자의 진술에서 의심스러운 단어를 골라 검색창에 입력하세요. 관련된 증언과 단서가 나옵니다. 처음에는 ‘시체’를 검색해 현장을 살펴보세요.",
    image: "/image/rules/2.png",
  },
  {
    title: "짧고 구체적인 단어를 찾아보세요",
    description:
      "검색어는 대부분 한 단어지만, 두 단어가 이어지거나 한글·영어·숫자가 섞일 수도 있습니다. 띄어쓰기는 무시됩니다. 사람 이름을 검색할 수 없는 사건도 있으니 사물과 장소도 살펴보세요.",
    image: "/image/rules/5.png",
    align: "right" as const,
  },
  {
    title: "서로 다른 증언을 비교하세요",
    description:
      "검색한 단어가 증언에 그대로 적혀 있지 않아도 관련된 결과가 나올 수 있습니다. 증언은 거짓일 수도 있으니, 같은 일을 설명하는 말들을 대조하고 누가 말했는지도 확인하세요.",
    image: "/image/rules/3.png",
  },
  {
    title: "막히면 더 자세히 검색하세요",
    description:
      "넓은 단어로 상황을 파악한 뒤, 새로 발견한 사물의 이름이나 기록 속 표현을 다시 검색해 보세요. 검색 결과에서 다음 단어를 찾을 수 있습니다.",
    image: "/image/rules/1.png",
    align: "right" as const,
  },
  {
    title: "단서를 연결하고 기록하세요",
    description:
      "모든 증언을 찾지 않아도 추리할 수 있습니다. 찾은 단서로 사건의 시간과 용의자의 행적을 맞춰 보고, 중요한 내용은 메모해 두세요. 조사 진행률보다 증언 사이의 관계가 중요합니다.",
    image: "/image/rules/6.png",
  },
  {
    title: "함께 추리하고 범인을 지목하세요",
    description:
      "함께 플레이한다면 용의자 소개와 행적 진술, 조사, 브리핑과 심문, 자유 추리, 최종 투표 순으로 진행하세요. 가장 많은 표를 받은 용의자를 최종 범인 후보로 지목합니다. 질문 시간은 진행자의 안내를 따르세요.",
    image: "/image/rules/4.png",
    align: "right" as const,
  },
  {
    title: "추리를 마친 뒤 정답을 제출하세요",
    description:
      "진범은 용의자 중 단 한 명입니다. 공범이나 자살, 외부인에 의한 살인은 없습니다. 범인과 사건의 경위, 동기를 정리하고 추가 질문이 있다면 함께 답하세요. 제출하면 정답을 확인할 수 있습니다.",
    image: "/image/rules/2.png",
  },
];

export default function Rules() {
  const router = useRouter();
  const [ruleType, setRuleType] = useState<"number" | "keyword">("number");
  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          pb: { xs: "120px", md: "300px" },
          backgroundColor: "black",
        }}
      >
        <FadeInSection>
          <Box
            sx={{
              width: "100%",
              pt: { xs: "88px", md: "100px" },
              mb: { xs: "56px", md: "100px" },
            }}
          >
            <ShakeTextSection>
              <Typography
                component="h1"
                color="white"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "36px", md: "48px" },
                  textAlign: "center",
                }}
              >
                규칙
              </Typography>
            </ShakeTextSection>
          </Box>
        </FadeInSection>

        <Box
          sx={{
            maxWidth: 640,
            mx: "auto",
            px: 2,
            mb: { xs: 8, md: 16 },
            color: "white",
          }}
        >
          <Tabs
            value={ruleType}
            onChange={(_event, value: "number" | "keyword") => setRuleType(value)}
            variant="fullWidth"
            textColor="inherit"
            aria-label="게임 방식별 규칙"
            sx={{
              borderBottom: "1px solid rgba(255,255,255,0.3)",
              "& .MuiTabs-indicator": {
                height: 2,
                backgroundColor: "white",
              },
              "& .MuiTab-root": {
                color: "lightgray",
                fontSize: { xs: 16, md: 20 },
                fontWeight: "bold",
                textTransform: "none",
              },
              "& .Mui-selected": { color: "white" },
            }}
          >
            <Tab
              value="number"
              label="번호로 조사하기"
              id="number-rules-tab"
              aria-controls="number-rules-panel"
            />
            <Tab
              value="keyword"
              label="단어로 조사하기"
              id="keyword-rules-tab"
              aria-controls="keyword-rules-panel"
            />
          </Tabs>
        </Box>

        {ruleType === "number" ? (
          <Box
            role="tabpanel"
            id="number-rules-panel"
            aria-labelledby="number-rules-tab"
          >
            <RuleCard
              title="살인사건이 일어났습니다!"
              description="단순한 사고일까요? 아니면 의도적인 살인일까요? 여러분은 탐정이 되어 용의자들 중 피해자를 살해한 범인이 누구인지 밝혀내야합니다."
              image="/image/rules/1.png"
            />
            <RuleCard
              title="추리 노트에 정답을 적어주세요!"
              description=" 각자 한 장의 '추리 노트'를 받습니다. 이 노트에 범인, 살해 도구,
          동기를 추리해주세요. 범인으로 가장 많이 지목받은 캐릭터가 최종
          지목됩나다."
              image="/image/rules/2.png"
              align="right"
            />

            <FadeInSection>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    mb: { xs: 3, md: 6 },
                    fontSize: { xs: "32px", md: undefined },
                  }}
                >
                  점수표
                </Typography>
                <Box
                  sx={{
                    mb: { xs: 8, md: 20 },
                    px: { xs: 2, md: 0 },
                  }}
                >
                  <Image
                    src="/image/rules/score.png"
                    width={800}
                    height={500}
                    alt="점수표"
                    style={{ width: "100%", maxWidth: 800, height: "auto" }}
                  />
                </Box>
              </Box>
            </FadeInSection>

            <RuleCard
              title="진범은 단 한 명"
              description="피해자를 죽인 살인자는 용의자 중 단 1명입니다. 공범이나 자살,
          외부인에 의한 살인은 없습니다. 제시된 용의자 중 한 사람만이 다른 사람과의 공조 없이 살인을 저지른 범인입니다."
              image="/image/rules/3.png"
            />
            <RuleCard
              title="차례대로 번호를 말하여 조사합니다"
              description=" 모든 플레이어는 돌아가면서 조사할 단서의 번호를 말합니다. 한번
          조사한 단서도 다시 볼 수 있지만, 단서의 수가 많기 때문에 기록해 놓는
          것을 추천합니다."
              image="/image/rules/4.png"
              align="right"
            />
            <RuleCard
              title="모든 것이 단서다"
              description="모든 단서는 최대한 사건의 진상을 알아내는데 도움을 주도록
          설계되었으며, ‘알고보니 아무것도 아니었다’하는 단서는 없습니다. 어떤 단서는 진범 검거에 직접적인 힌트를 주지는 않아도, 현 상황이 어떤 상황인지에 대한 간접적 힌트를 주기도 합니다."
              image="/image/rules/5.png"
            />
            <RuleCard
              title="제시된 증거만을 이용해서 추리할 수 있습니다"
              description=" 제시된 증거만을 이용해서 추리가 가능하도록 최대한 노력했습니다.
          따라서, 제시되지 않은 동기나 살해 도구, 정황은 없다고 생각해주시면
          되겠습니다. "
              image="/image/rules/6.png"
              align="right"
            />
          </Box>
        ) : (
          <Box
            role="tabpanel"
            id="keyword-rules-panel"
            aria-labelledby="keyword-rules-tab"
          >
            {keywordRules.map((rule) => (
              <RuleCard key={rule.title} {...rule} />
            ))}
          </Box>
        )}
        <FadeInSection>
          <Box
            sx={{
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "24px", md: undefined },
              }}
            >
              범인을 어서 잡고 싶다면?
            </Typography>

            <Button
              size="large"
              variant="outlined"
              onClick={() => {
                router.push("/scenarios");
              }}
            >
              지금 플레이
            </Button>
          </Box>
        </FadeInSection>
      </Box>
    </>
  );
}
