import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import Header from "@/features/suspect/components/Header";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

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
        display="flex"
        gap={12}
        justifyContent="center"
        alignItems="center"
        width="80%"
        mb={30}
      >
        {align === "left" && (
          <Image src={image} width={500} height={300} alt="규칙 그림" />
        )}
        <Box width="700px">
          <Typography
            color="white"
            fontSize="48px"
            variant="h2"
            mb={1}
            fontWeight="bold"
            sx={{
              wordBreak: "keep-all",
            }}
          >
            {title}
          </Typography>
          <Typography
            color="lightgray"
            variant="body1"
            fontSize="28px"
            sx={{
              wordBreak: "keep-all",
            }}
          >
            {description}
          </Typography>
        </Box>
        {align === "right" && (
          <Image src={image} width={500} height={300} alt="규칙 그림" />
        )}
      </Box>
    </FadeInSection>
  );
}

export default function Rules() {
  const router = useRouter();
  return (
    <>
      <Header />
      <Box
        sx={{ backgroundColor: "black" }}
        width="100%"
        height="100%"
        pb="300px"
      >
        <FadeInSection>
          <Box width="100%" pt="100px" mb="100px">
            <Typography
              color="white"
              fontWeight="bold"
              fontSize="48px"
              textAlign="center"
            >
              규칙
            </Typography>
          </Box>
        </FadeInSection>

        <RuleCard
          title="살인사건이 일어났습니다!"
          description="단순한 사고일까요? 아니면 의도적인 살인일까요? 여러분은 탐정이 되어 용의자들 중 피해자를 살해한 범인이 누구인지 밝혀내야합니다. "
          image="/image/suspect/rules/1.png"
        />
        <RuleCard
          title="추리 노트에 정답을 적어주세요!"
          description=" 각자 한 장의 '추리 노트'를 받습니다. 이 노트에 범인, 살해 도구,
          동기를 추리해주세요. 범인으로 가장 많이 지목받은 캐릭터가 최종
          지목됩나다."
          image="/image/suspect/rules/2.png"
          align="right"
        />

        <FadeInSection>
          <Box textAlign="center">
            <Typography variant="h2" mb={6}>
              점수표
            </Typography>
            <Box mb={20}>
              <Image
                src="/image/suspect/rules/score.png"
                width={800}
                height={500}
                alt="점수표"
              />
            </Box>
          </Box>
        </FadeInSection>

        <RuleCard
          title="진범은 단 한 명"
          description="피해자를 죽인 살인자는 용의자 중 단 1명입니다. 공범이나 자살,
          외부인에 의한 살인은 없습니다. 제시된 용의자 중 한 사람만이 다른 사람과의 공조 없이 살인을 저지른 범인입니다."
          image="/image/suspect/rules/3.png"
        />
        <RuleCard
          title="차례대로 번호를 말하여 조사합니다"
          description=" 모든 플레이어는 돌아가면서 조사할 단서의 번호를 말합니다. 한번
          조사한 단서도 다시 볼 수 있지만, 단서의 수가 많기 때문에 기록해 놓는
          것을 추천합니다."
          image="/image/suspect/rules/4.png"
          align="right"
        />
        <RuleCard
          title="모든 것이 단서다"
          description="모든 단서는 최대한 사건의 진상을 알아내는데 도움을 주도록
          설계되었으며, ‘알고보니 아무것도 아니었다’하는 단서는 없습니다. 어떤 단서는 진범 검거에 직접적인 힌트를 주지는 않아도, 현 상황이 어떤 상황인지에 대한 간접적 힌트를 주기도 합니다."
          image="/image/suspect/rules/5.png"
        />
        <RuleCard
          title="제시된 증거만을 이용해서 추리할 수 있습니다"
          description=" 제시된 증거만을 이용해서 추리가 가능하도록 최대한 노력했습니다.
          따라서, 제시되지 않은 동기나 살해 도구, 정황은 없다고 생각해주시면
          되겠습니다. "
          image="/image/suspect/rules/6.png"
          align="right"
        />
        <FadeInSection>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" mb={2}>
              범인을 어서 잡고 싶다면?
            </Typography>

            <Button
              size="large"
              variant="outlined"
              onClick={() => {
                router.push("/suspect");
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
