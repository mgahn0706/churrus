import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PlayButtonIcon from "@mui/icons-material/PlayCircleFilled";
import LaunchRounded from "@mui/icons-material/LaunchRounded";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetectiveNoteType } from "@/features/suspect/types";
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import { mountainAdditionalQuestions } from "@/features/suspect/fixtures/mountain/clues";
import { saveScenarioCertification } from "@/features/suspect/libs/certification";

export default function MountainAnswer() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuspectAccused, setIsSuspectAccused] = useState(false);
  const [tabValue, setTabValue] = useState("confess");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      localStorage.getItem("mountain") == null ||
      !JSON.parse(localStorage.getItem("mountain") ?? "").accusedSuspect
    ) {
      setIsSuspectAccused(false);
      return;
    }
    setIsSuspectAccused(true);
    saveScenarioCertification(
      "mountain",
      JSON.parse(localStorage.getItem("mountain") ?? "").accusedSuspect
    );
  }, []);

  if (!isSuspectAccused) {
    return (
      <Dialog open>
        <DialogTitle>
          <Typography variant="h6" component="h2">
            이용 안내
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            아직 청룡산 살인사건의 진범이 지목되지 않았습니다. <br />
            게임을 진행해서 진범을 찾아주세요.
          </Typography>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                router.push("/suspect/scenario/mountain");
              }}
            >
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }

  const submittedAnswer: DetectiveNoteType = JSON.parse(
    localStorage.getItem("mountain") ?? ""
  );

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <FadeInSection>
        <Typography variant="h1" color="white" mt={40} mb={20}>
          {submittedAnswer.accusedSuspect}
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center" mb={40}>
          <PlayButtonIcon
            sx={{
              opacity: 0.2,
              width: "50px",
              height: "50px",
              transform: `rotate(90deg)`,
            }}
          />
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Typography variant="h1" color="white" mt={40} mb={20}>
          당신은
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Typography variant="h1" color="white" mt={70} mb={100}>
          추리수를 살해한 범인이
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Typography
          variant="h1"
          color="white"
          mt={50}
          mb={20}
          fontWeight="bold"
        >
          {submittedAnswer.accusedSuspect === "최령신"
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Image
          src={"/image/suspect/scenario/mountain/mountain-reveal.png"}
          alt="범인 공개 이미지"
          width={800}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </FadeInSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 최령신
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 바뀐 표지판을 모른 채 절벽 쪽으로 향했다가, 실랑이 끝에
            우발적으로 피해자를 밀어 추락시켰다.
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 적록색맹 때문에 신청지 종교에서 중시하는 청록색을 구분하지
            못한다는 약점을 추리수가 자극했고, 그 모욕과 불안이 폭발했다.
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.whyDunnit}
          </Typography>
        </Box>
      </FadeInSection>

      <Box display="block" color="white" mx={15} mt={15}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab sx={{ fontSize: "20px" }} value="confess" label="범인의 고백" />
          <Tab
            sx={{ fontSize: "20px" }}
            value="additional"
            label="추가 질문 해답"
          />
          <Tab sx={{ fontSize: "20px" }} value="solution" label="사건 풀이법" />
          <Tab
            sx={{ fontSize: "20px" }}
            value="culprits"
            label="용의자 롤카드 PDF"
          />
        </Tabs>

        <TabPanel value={tabValue} index="confess">
          <Typography
            variant="body1"
            color="white"
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            제가 추리수를 밀었습니다. 죽이려고 계획한 건 아니었어요. 하지만 결국
            제가 그를 절벽 아래로 떨어뜨렸죠. <br />
            신청지에서 청록색은 정말 중요해요. 신당 입구도, 내부 장식도, 제물도
            모두 그 색을 중심으로 의미가 정해지죠. 그런데 저는 그 색을 제대로
            보지 못해요. 적록색맹이 있으니까요. 그건 제가 가장 숨기고 싶었던
            약점이었어요. 2020년에 신도들이 제 키링을 보고 욕을 했을 때, 그 때
            깨달았죠. 나는 이 신성한 색을 못보는구나. <br />
            청룡신에게 소원을 빌까도 했어요. 매년 7월, 청룡산 절벽에 제물을
            바치고 소원 부적에 소원을 적으면 청룡신이 소원을 이뤄주거든요.
            하지만, 저는 차마 소원을 빌지는 못했어요. 그때까지는요. <br />
            사건 당일, 저는 바뀐 표지판이 있는 줄도 모르고 절벽 쪽으로 향했어요.
            그곳에서 추리수는 저보고 눈이 삐었냐며 저를 자극했죠. 저는 참으려
            했지만 안 됐어요. 말다툼이 몸싸움으로 번졌고, 바닥엔 발자국이
            엉망으로 남고 나뭇가지까지 부러졌죠. 그 순간 그가 저를 밀치듯
            다가왔고, 저는 반사적으로 그를 세게 밀어냈어요. 그게 끝이었어요.
            <br />
            그가 아래로 떨어진 뒤에야 무슨 짓을 했는지 알았어요. 하지만 오히려
            기회라고 생각했죠. 마침 오늘은 7월이었고 저는 당황하지 않고 소원을
            빌었어요. ‘청룡신이시여, 제 소원을 들어주세요. 제가 원하는 건 단
            하나입니다. 제가 청록색을 볼 수 있게 해주세요.’ <br />
            그러고 바로 추러스 가게로 왔습니다. 표지판은 바뀌어있었지만, 뭐
            입구쪽의 신당은 제가 자주 가는 곳이었으니까요.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index="additional">
          <List>
            {mountainAdditionalQuestions.map((question, index) => (
              <ListItem key={index} sx={{ my: 3 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" mb={2}>
                      Q{question.no}. {question.question}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body1" color="white">
                        A. {question.answer}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        내 답변:{" "}
                        {submittedAnswer.additionalQuestionAnswers[index] ??
                          "입력되지 않음"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index="solution">
          <Typography
            variant="body1"
            mb={2}
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            추리수는 절벽에서 떨어져 죽었습니다. 그런데 사건 현장에서 가장 먼저
            눈에 띄는 이상점은 표지판의 방향이 달라져 있었다는 사실입니다.
            동시에 추리수는 혼자 실족한 것이 아닙니다. 시체에는 손으로 밀린
            흔적이 남아 있고, 추락 지점 근처 절벽 위에는 부러진 나뭇가지와
            발자국, 쓸린 자국 등 몸싸움의 흔적이 뚜렷하게 남아 있습니다. 따라서
            이 사건은 누군가가 추리수와 함께 절벽 쪽으로 갔고, 그 자리에서
            실랑이 끝에 추리수를 밀어 떨어뜨린 사건으로 봐야 합니다. <br />
            먼저 천람석은 범인에서 제외됩니다. 천람석의 스마트폰에는 절벽
            아래에서 암석 사진을 3~5분 간격으로 찍은 기록이 남아 있습니다.
            그런데 절벽 아래에서 위로 올라오는 데만 2~3분이 걸리는 지형이라면,
            그 짧은 시간 사이에 위로 올라가 추리수와 몸싸움을 벌이고 다시 사진을
            찍는 것은 사실상 불가능합니다. 그러므로 천람석은 현장 근처에 있었을
            수는 있어도, 직접 절벽 위에서 추리수를 밀친 인물로 보기는
            어렵습니다.
            <br />
            송채린 역시 시간상 범인이 될 수 없습니다. 송채린은 뒤늦게 표지판에
            도착해 오프라인 번역기를 30분에 사용했고, 이후 60분에는 추러스
            가게에 도착합니다. 만약 송채린이 범인이라면 그 사이에 절벽으로 가서
            추리수를 죽이고 다시 가게까지 와야 합니다. 그러나 표지판에서 추러스
            가게로 가는 길은 위험해서 뛸 수 없고, 도보로만 30분이 걸립니다.
            더구나 송채린이 번역기를 켰다는 사실은 그가 표지판을 직접 읽어야 할
            정도로 산길에 익숙하지 않았다는 뜻이기도 합니다. 그렇다면 송채린은
            표지판이 가리키는 방향을 따라 바로 가게 쪽으로 걸어갔다고 보는 것이
            가장 자연스럽고, 절벽까지 들를 시간적 여유가 없습니다. 따라서
            송채린도 범인에서 제외됩니다. <br />
            차림솔도 직접 범행을 저지르기는 어렵습니다. 추러스 가게 CCTV를 보면
            차림솔은 6시 45분에 가게를 나가 7시 50분에 다시 들어오므로 총 65분의
            공백이 생깁니다. 또한 표지판에는 차림솔의 지문이 묻어 있어, 표지판을
            바꾼 인물은 차림솔이라고 보는 것이 타당합니다. 그러나 차림솔은
            표지판이 있는 갈림길까지 왕복해야 하고, 추러스 가게와 그 지점 사이는
            편도 30분이 걸리며 뛸 수조차 없습니다. 즉 왕복만 해도 최소 60분이
            필요하므로, 차림솔에게 남는 시간은 5분 정도뿐입니다. 그 짧은 시간
            안에 표지판을 조작한 뒤 다시 절벽으로 이동해 추리수와 몸싸움을
            벌였다고 보기는 어렵습니다. 결국 차림솔은 표지판을 바꾼 인물일 수는
            있어도, 직접 추리수를 밀친 진범은 아닙니다. <br />
            이렇게 천람석, 송채린, 차림솔을 차례로 제외하면 마지막으로 남는
            사람은 최령신뿐입니다. 그리고 최령신에게는 분명한 동기와 심리적
            이유가 있습니다. 신청지에서는 여름과 청록색이 특별히 중요하게
            다뤄지는데, 최령신이 가지고 있던 신당 그림 키링은 그 중요한 색이
            갈색으로 표현돼 있습니다. 이 점을 통해 최령신이 적록색맹이라
            청록색을 제대로 인식하지 못했을 가능성을 추론할 수 있습니다. 다시
            말해, 청록색이 중요한 신청지 안에서 최령신은 그 색을 보고
            싶어하면서도 보지 못한다는 강한 열등감과 집착을 동시에 품고 있었던
            것입니다. <br />
            이런 상황에서 7월 6일 최령신은 바뀐 표지판이 있다는 사실을 모른 채
            추리수와 함께 길을 잘못 들어 절벽 쪽으로 향하게 됩니다. 그리고 그
            자리에서 추리수는 최령신에게 ‘눈이 삐었냐’는 식으로 쏘아붙였고,
            실제로 색맹 콤플렉스를 안고 있던 최령신은 크게 격분합니다. 그 결과
            둘 사이에 몸싸움이 벌어졌고, 현장에 남은 나뭇가지 파손과 발자국,
            쓸린 자국은 바로 그 실랑이를 보여 줍니다. 결국 최령신은 우발적으로
            추리수를 밀쳤고, 추리수는 절벽 아래로 떨어져 사망했습니다. <br />
            이후 최령신은 돌아오면서 비로소 표지판이 바뀌어 있다는 사실을
            확인합니다. 그러나 신당 쪽 방향은 평소에도 자주 다니던 길이라 이미
            알고 있었고, 따라서 마지막으로 남은 방향이 추러스 가게 쪽이라는 점을
            파악해 그쪽으로 이동한 것입니다. 그러므로 이 사건의 진범은
            최령신입니다.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index="culprits">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={10}
          >
            <Button
              variant="contained"
              color="info"
              href="https://drive.google.com/file/d/14pplWE_2NXsdxXvI24b-uQhNv_M-iEpj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mb: 10 }}
            >
              용의자 롤카드 PDF 다운로드
              <LaunchRounded sx={{ ml: 1, fontSize: 20 }} />
            </Button>
          </Box>
        </TabPanel>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        mt={10}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem("mountain");
            router.push("/suspect/certification?scenario=mountain");
          }}
          sx={{ mb: 20 }}
        >
          인증카드 보러가기
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem("mountain");
            router.push("/suspect");
          }}
          sx={{ mb: 20 }}
        >
          메인 화면으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
}
