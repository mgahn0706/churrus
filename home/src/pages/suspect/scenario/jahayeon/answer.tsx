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
import PlayButtonIcon from "@mui/icons-material/PlayCircleFilled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetectiveNoteType } from "@/features/suspect/types";
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import { jahayeonAdditionalQuestions } from "@/features/suspect/fixtures/jahayeon/clues";
import { LaunchRounded } from "@mui/icons-material";

export default function JahayeonAnswer() {
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
      localStorage.getItem("jahayeon") == null ||
      !JSON.parse(localStorage.getItem("jahayeon") ?? "").accusedSuspect
    ) {
      setIsSuspectAccused(false);
      return;
    }
    setIsSuspectAccused(true);
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            아직 자하연 살인사건의 진범이 지목되지 않았습니다. <br />
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
                router.push("/suspect/scenario/jahayeon");
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
    localStorage.getItem("jahayeon") ?? ""
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
          김하연을 살해한 범인이
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Typography
          variant="h1"
          color="white"
          mt={50}
          mb={50}
          fontWeight="bold"
        >
          {submittedAnswer.accusedSuspect === "조노원"
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 조노원
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 피해자를 술에 취하게 한 후 자하연으로 끌고가서 익사시켰다.
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 군대 가있는 동안 서여친을 뺏겼다는 생각에 대한 복수심
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
          aria-label="secondary tabs example"
        >
          <Tab
            sx={{
              fontSize: "20px",
            }}
            value="confess"
            label="범인의 고백"
          />

          <Tab
            sx={{
              fontSize: "20px",
            }}
            value="additional"
            label="추가 질문 해답"
          />
          <Tab
            sx={{
              fontSize: "20px",
            }}
            value="solution"
            label="사건 풀이법"
          />
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
            군대에 있을 때 그녀에게서 “끝”이라는 말을 들었을 때, 그건 내 안에
            깊은 구멍을 냈어요. 전역하고도 그 구멍은 메워지지 않았고, 그녀가 왜
            나를 떠났는지 계속 알 수 없어서 견딜 수가 없었어요. <br />
            1월 25일, 술자리의 하연이한테서 들은 그 이름을 들었을 때 모든 게
            터졌어요. 서여친이 저와 헤어지기 전에 이미 다른 사람과 사귀고
            있었고, 그 상대가 바로 김하연이라는 말을 들었을 때, 내가 준 편지며
            반지며 내가 쓴 것들이 다른 사람 앞에서 아무것도 아닌 듯 쓰였다는
            생각에 분노가 폭발했거든요. 나는 그 배신을 도저히 용서할 수
            없었어요. <br />
            그래서 1월 28일, 일부러 그 술자리를 만들어 참석했어요. 단둘이 있는
            건 위험하다고 생각했어요. 다른 사람에게 혐의를 뒤집어씌우는 게 훨씬
            좋으니까요.
            <br />
            그날 과방에서 우리가 모였어요. 저는 취한 척 옆 방에 갔죠. 경기는
            먼저 자리를 떴고 구관은 취해 있었어요. 나는 옆 방 소파에 누운
            척하면서 하연이의 동선을 살폈어요. 그는 항상 마지막까지 누군가를
            챙기려드는 사람이었거든요. 그 성향을 이용하면 내가 원하는 대로
            만들기 쉬울 거라고 생각했어요. 역시나 그는 구관이를 보내고 저에게
            오더군요. <br />
            저는 술을 더 먹자고 하고 미리 준비한 고량주를 꺼냈어요. 소주는
            마시는 척 바닥에 버려서 저는 맨정신이었답니다. 그는 점점 정신이
            흐려졌고, 1시 50분경 나는 ‘지금이다’라고 판단했어요. <br />
            자하연으로 데려가는 길은 조심했어요. 데크는 가로등이 밝아 위험하다고
            판단해 CCTV 사각이 있는 갈대 쪽으로 유도했거든요. 아무도 못 보는
            곳으로 데려가면 실족사로 보이게 만들 수 있을 거라 생각했어요. <br />
            그 전에 그의 휴대폰을 따로 빼서 예약문자와 카카오톡 예약 전송을
            걸어놓았어요. 서여친에게 새벽 3시, 4시에 문자를 보낸 것처럼 보이도록
            한 거예요. <br />
            현장을 떠나기 전 기숙사 GS25에 들러 소주와 새우깡을 그의 카드로 추가
            결제했고, 학생증은 길가에 일부러 버렸어요. 그의 동선을 추적하기
            어렵도록, 최소한 3시까지는 살아있었던 걸로 만들기 위함이죠. 동시에
            내 머릿속은 이미 냉정하게 움직이고 있었어요. <br />
            그다음 나는 카카오택시를 문화관으로 불러 택시를 타고 노원구로
            갔어요. 새벽 3시 50분쯤 편의점에서 간식을 사며 나는 내 알리바이를
            확실히 했습니다. 집에 돌아온 뒤에는 모든 흔적을 지우려 했고,
            마음속으로는 ‘사고’로 보이길 바랐어요. <br />
            서여친은 정말 슬퍼할까요? 그건 모르겠어요. 하지만 나는 이제야 마음이
            놓이네요. 그는 죽어 마땅했으니까요.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index="additional">
          <List>
            {jahayeonAdditionalQuestions.map((question, index) => (
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
            모든 단서를 조사했다면 김하연의 사망 시각이 뭔가 이상함을 알 수
            있습니다. 사망추정 시각은 오후 11시 이후. 하연이 연못에 빠진 후 물이
            얼었으므로 시체는 꽤나 이른 시각(자정 근처)에 자하연에 들어갔겠군요.
            그렇다면 하연의 휴대전화에 남겨진 마지막 기록인 새벽 4시까지는
            살아있었을까요? 그렇다면 이 중에 범인은 없습니다. 이구관을 제외하고
            새벽 3시 이후에는 알리바이가 존재합니다. 그렇다면 이구관이 범인인
            것일까요? <br />
            범인의 조건은, 김하연이 혼자 있는 것을 확신할 수 있는 사람. 그리고
            조작된 알리바이로 인해 범인 후보에서 제외되는 사람입니다. 자하연에
            사람을 빠뜨린다는 대범한 생각을 하려면, 먼저 김하연의 의식을 잃게
            하고 그와 단둘이 있어야합니다. 그러러면, 최소한 해당 술자리에
            참석하거나 술에 의해 의식을 잃은 하연이를 빠뜨려야합니다. 서여친은
            11시 52분에 기숙사삼거리에서 내려서 약 자정쯤에 인문대 1동에
            도착합니다. 하지만 이떄 이구관과 마주쳤고, 그 술자리에는 박경기와
            조노원이 같이 있을 때입니다. 그리고 시간상 44분이 걸리는 자취방까지
            바로 돌아온 것으로 보이며 이후 나간 흔적도 없습니다. 즉, 서여친은
            하연이를 만취시켜 의식을 잃게할 시간이 턱없이 부족합니다. 또한,
            술자리의 정확한 장소도 모르고 있었기에 오늘 술자리를 만든 사람은
            더더욱 아니게 됩니다. <br />
            박경기 또한 행적 진술에서 거짓말을 했지만, 반대로 오후 11시 30분 ~
            오전 2시까지는 교수아파트에 있었다는 사실이 드러납니다. 통화기록과
            남양주시까지 걸리는 시간을 고려하면 박경기는 오전 4시 40분에
            남양주시로 기사님 차를 타고 이동한 것이 됩니다. 만약 오후 2시 30분
            경에 몰래 나와 김하연을 죽이고 기다린 뒤 탄것이라면요? 그렇다면
            김하연의 새벽 2시 카드 사용 기록이 진짜라는 것이고 GPS에 귀가가
            기록되었어야했을 것입니다. 더군다나 김하연이 만취해있을지도 박경기는
            알 수 없으며, 설령 어떻게어떻게 의식이 있는 김하연과 만나서
            자하연까지 가도록 유도했다하더라도, 그의 휴대폰을 뺏고 잠금을 풀고
            새벽 4시의 알리바이를 조작하기는 너무 힘듭니다. 휴대폰을 11시 30분
            이전에 훔쳐왔다기에는 오전 12시의 술자리 사진이 남아있습니다. <br />
            이제 이구관과 조노원만 남았습니다. 조노원은 오후 11시 ~ 새벽 2시
            30분 사이의 알리바이가 없으며 이구관은 오전 12시 ~ 오전 6시의
            알리바이가 없습니다. 이 사건의 가장 중요한 점은 최소한 새벽 2시와
            새벽 4시의 알리바이는 조작되었다는 것입니다. 만약 이구관이
            범인이라면, 이구관은 열심히 알리바이를 조작해놓고 정작 ‘기억이
            안난다’는 말과 ‘친구들과 새벽에 만나 확실한 알리바이를 만들 기회를
            버리고’ 굳이 용의자선에 오른 셈이 됩니다. 알리바이가 조작되었으므로
            역설적으로 새벽 3 ~ 4시의 알리바이가 지나치게 뚜렷한 조노원이 매우
            유력한 범인 후보가 됩니다. 그가 미리 예약문자를 테스트해본 점은 그가
            범인임을 강하게 시사합니다. <br />
            이구관은 살해동기도 매우 약합니다. 그는 단지 ‘기숙사에 떨어졌다'는
            것입니다. 심지어 실제 표절을 지시한 사람은 김하연이 아니므로,
            이구관이 김하연을 죽여야겠다는 확신을 가질 근거또한 없습니다.
            알리바이적인 측면에서도, 출입기록에 따르면 그는 자정 이후 1동으로
            다시 들어가지도 않았고, CCTV 기록으로 보아 다른 장소로 옮겨 술을 더
            먹지도 않았습니다. 몸싸움의 흔적도 없기에 그가 2시 이전에 걸어나오던
            김하연을 빠뜨리는 것은 상상하기 어렵습니다. <br />
            가장 결정적인 단서로, 기존 술자리에 존재하지 않았던 고량주가
            있습니다. 이 고량주는 과방 내에서 마셨어야하지만, 11시 55분까지
            사진에는 보이지 않습니다. 자정에는 이구관이 외부에 있었으므로,
            내부에서 고량주를 김하연에게 먹일 수 있었던 것은 조노원 뿐입니다.
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
              href="https://drive.google.com/file/d/127S7glB881imqXyPKi-g5fyL2iWB6s-Q/view?usp=drive_link"
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

      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem("startup");
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
