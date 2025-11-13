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
import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { LaunchRounded } from "@mui/icons-material";

export default function DureAnswer() {
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
      localStorage.getItem("dure") == null ||
      !JSON.parse(localStorage.getItem("dure") ?? "").accusedSuspect
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
            아직 두레문예관 살인사건의 진범이 지목되지 않았습니다. <br />
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
                router.push("/suspect/scenario/dure");
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
    localStorage.getItem("dure") ?? ""
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
        <Typography variant="h1" color="white" mt={70} mb={100}>
          당신은
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Typography variant="h1" color="white" mt={70} mb={100}>
          이예진을 살해한 범인이
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
          {submittedAnswer.accusedSuspect === "백장훈"
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 백장훈
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 망치로 머리를 가격하여 살해한 후, 감전 사고사로 위장
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 1년 전 강제호 살인사건의 진범이 자신임을 숨기기 위해
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
        </Tabs>
        <TabPanel value={tabValue} index="confess">
          <Typography
            variant="body1"
            color="white"
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            1년 전, 물리천문학부 강제호 사건의 진범이 저라는 걸 이제는 인정하려
            합니다. 그 일은 충동이 아니라 계산된 행동이었고, 돌이킬 수 없는
            선택이었습니다. 강제호는 저와 같은 과이자 같은 동아리 사람이었고,
            같은 인턴 자리에 지원했습니다. 저는 그 인턴 자리가 꼭 필요했습니다.
            제호가 저보다 스펙이 조금 더 좋다는 걸 알고 있었기에, 그때부터
            불안했던 것 같네요.
            <br /> 2022년 6월 2일, 두레문예관 306호에서 제호를 독살했고, 자살로
            위장했습니다. 사건은 그렇게 종결됐고, 모두가 잊은 줄 알았어요.
            <br />
            하지만 예진이가 그 사건을 모티브로 추리게임을 준비하면서 상황이 다시
            움직이기 시작했습니다. 저는 불안했어요. 그래서 추러스 진행자로
            자원했습니다.. 특히 그 게임이 306호에서 열리는 건 위험했습니다. 실제
            사건 장소였기 때문이었어요. 그래서 어떻게든 306호만은 막아야 했죠.
            <br />
            2023년 6월 1일, 아무도 없는 틈을 타 306호 전등을 고장냈습니다.
            전선을 잘라 불이 들어오지 않게 했고, 그 과정에서 손을 베였지만,
            처음엔 몰랐습니다. 그 직후 전등이 고장났다고 알리고, 게임 장소를
            403호로 바꾸게 했습니다. 짐을 옮기던 중 송가연이 불러서 고개를
            들었을 때, 전등에 제 피가 묻어 있는 걸 봤습니다. 그제야 사태를
            인식했고, 다음날 아침 일찍 와서 닦아야겠다고 생각했습니다.
            발자국도요. 허점들이 그제야 보이더군요.
            <br /> 6월 2일, 약속시간보다 45분 일찍인 12시 15분에 도착했습니다.
            307호 창문을 통해 발코니로 나가, 306호 창문으로 들어갔습니다.
            안쪽에서 전등 아래 책상을 옮기고, 걸레로 피를 닦기 시작했습니다.
            그때 누군가 문을 여는 소리가 들려 급히 창문 밖으로 숨었습니다.
            제준과 예진이 들어왔고, 예진은 제준에게 1년 전 사건이 자살이 아니라
            살인일 가능성이 크다고 말했습니다. 그 말을 듣고 저는 예진이 저를
            의심하고 있다는 걸 확신했습니다. <br />
            둘이 나간 후, 예진이 다시 돌아왔습니다. 전날 찍어둔 사진과
            비교했는지, 책상이 움직여 있고 창문이 열려 있다는 걸 눈치챘습니다.
            예진은 창문 밖을 내다봤고, 결국 저를 봤습니다. “다 끝났어. 오늘
            추리게임에서 너의 만행을 밝힐 거야.” 그렇게 말했습니다. <br />그 뒤
            일은 짧았습니다. 저는 궁지에 몰렸고, 반사적으로 행동했습니다. 제
            옆에는 공구상자와 망치가 있었습니다. 그게 전부였습니다. 이후 저는
            시체를 감전사로 위장했어요. 전날 제가 전선을 끊어 전등을 망가뜨렸던
            것을 이용한거죠. 전등을 고치려다 감전된 것처럼 꾸미면 자연스러울
            거라 생각했습니다. 시체를 전등 아래로 옮기고, 바닥에 피를 늘려 추락
            흔적을 만들었습니다. 망치는 닦아서 공구상자에 다시 넣었고, 창문 밖
            통로를 통해 307호로 나왔습니다. <br />
            계단을 오르던 중 선재를 마주쳤습니다. 저는 아무렇지 않은 척 “지금 막
            올라오던 참이었다”고 말했습니다. 그리고 403호로 가서 사람들 사이에
            섞였습니다. 그렇게 된 것입니다. <br />
            이미 2명을 살해했어요. 제 손에 묻은 피는 영원히 절 괴롭힐 거에요.
            어쩔 수 없었어요. 어쩔 수 없었다구요.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index="additional">
          <List>
            <ListItem sx={{ my: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={2}>
                    Q1. 박선재의 주머니 속 목걸이의 구입 자금 출처는 어디인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 추러스 회비에서 횡령한 금액입니다.
                    </Typography>
                    <Typography variant="body2" color="gray">
                      내 답변:{" "}
                      {submittedAnswer.additionalQuestionAnswers[0] ??
                        "입력되지 않음"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ my: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={2}>
                    Q2. 송가연은 박선재를 어떻게 생각하고 있었나요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 송가연은 박선재를 짝사랑하고 있었습니다.
                    </Typography>
                    <Typography variant="body2" color="gray">
                      내 답변:{" "}
                      {submittedAnswer.additionalQuestionAnswers[1] ??
                        "입력되지 않음"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ my: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={2}>
                    Q3. 고제준이 연구실 자료 사진을 찍은 이유는 무엇인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 고제준은 남파공작원으로, 댐 관련 기밀을 빼내기
                      위해서입니다.
                    </Typography>
                    <Typography variant="body2" color="gray">
                      내 답변:{" "}
                      {submittedAnswer.additionalQuestionAnswers[2] ??
                        "입력되지 않음"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ my: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={2}>
                    Q4. 1년 전 강제호 사건의 진범은 누구인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 진범은 백장훈입니다.
                    </Typography>
                    <Typography variant="body2" color="gray">
                      내 답변:{" "}
                      {submittedAnswer.additionalQuestionAnswers[3] ??
                        "입력되지 않음"}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </TabPanel>
        <TabPanel value={tabValue} index="solution">
          <Typography
            variant="body1"
            mb={2}
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            이예진을 살해할 수 있는 사람은 세 가지 조건을 만족해야 합니다. 첫째,
            이예진이 306호에 있다는 사실을 알아야 합니다. 둘째, 사망 추정
            시간대에 306호에 갈 수 있어야 합니다. 셋째, 현장을 조작할 만큼
            충분한 시간이 있어야 합니다. <br />이 세 조건을 기준으로 보면,
            가능성 있는 사람은 고제준, 박선재, 그리고 백장훈입니다. 송가연은
            이예진의 위치를 몰랐고, 12시 40분 수색 당시 306호의 문이 잠겨
            있었으며, 그 시각 고제준과 함께 3층과 4층을 수색 중이었습니다.
            따라서 송가연은 처음부터 후보에서 제외됩니다. <br />
            알리바이를 살펴보면, 백장훈은 12시부터 12시 45분까지 공백이 있고,
            고제준은 12시부터 12시 30분, 그리고 12시 40분부터 12시 50분 사이에
            공백이 있습니다. 박선재는 12시부터 12시 20분, 12시 45분부터 12시
            50분, 그리고 1시 5분부터 1시 10분까지가 공백입니다. <br />
            살해 도구는 공구 상자의 망치입니다. 피해자의 머리에 남은 자국과
            닫히지 않은 공구 상자로 미루어 볼 때, 피해자를 가격한 것은 망치임이
            분명합니다. 그러나 현장에는 시체가 옮겨져 있었고, 망치는 닦여
            있었으며, 스위치가 눌려 있는 등 감전사로 위장된 흔적이 있었습니다.
            현장에 있던 공구가 사용된 점으로 보아 살인은 우발적이었지만, 현장은
            지나치게 정리되어 있었습니다. 즉, 우발적이면서도 조작 시간이 충분히
            확보된 상황이었습니다. <br />
            조작에는 최소 5분 이상이 필요했을 것이므로, 짧은 공백만 가진 사람은
            제외됩니다. 이 기준으로 다시 보면, 고제준은 짧은 두 구간에만 공백이
            있고, 박선재의 공백 역시 20분 남짓에 불과합니다. 반면, 백장훈은
            45분간의 긴 공백이 있습니다. <br />
            박선재가 범인이라면 고제준의 증언이 거짓이어야 하지만, 고제준의
            안경닦이가 현장에서 발견되었습니다. 시체 옆에서 10분 동안 아무 이유
            없이 머물렀다는 해석은 불가능합니다. 따라서 박선재는 범인이 될 수
            없습니다. <br />
            이제 사건의 결정적 단서인 문으로 눈을 돌려야 합니다. 두레문예관의
            문은 자동으로 잠기지 않습니다. 문은 누군가 의도적으로 잠근 것이며,
            잠긴 시점은 12시 40분 이전, 열린 시점은 1시 5분입니다. 따라서 문을
            잠근 사람은 사건을 은폐하려 한 범인일 가능성이 높습니다. <br />
            고제준이 12시 40분 이후에 살해를 저질렀다면, 그는 307호 창문을 통해
            진입했어야 합니다. 하지만 이 경우, 문은 이예진이 스스로 잠근 셈이
            됩니다. 이예진이 스스로 문을 잠글 이유는 없습니다. 게다가 고제준은
            당시 송가연과 함께 있었기 때문에, 그 짧은 시간 안에 306호에 진입해
            살인을 저지르고 현장을 조작하는 것은 불가능합니다. <br />
            이제 가능한 시나리오는 두 가지입니다. <br />
            (1) 고제준이 12시 30분 이전, 306호에서 이예진과 대화 중 우발적으로
            살해하고 문을 잠그고 307호로 나왔다. <br /> (2) 백장훈이 12시 40분
            이전, 증거를 인멸하다가 이예진에게 들켜 우발적으로 살해하고 문을
            잠근 뒤 307호로 나왔다. <br />
            망치는 창문 밖 공간에서 발견되었습니다. 306호 안에는 각목 등 더 쉽게
            보이는 도구들이 있었음에도, 범인은 굳이 망치를 사용했습니다. 이는
            망치의 위치를 살해 이전부터 알고 있었다는 뜻입니다. 범인이 창문 밖에
            숨어 있었고, 마침 옆에 있던 망치를 집어 든 상황이라면 모든 것이
            설명됩니다. 고제준은 이예진에게 숨을 이유가 없습니다. 그러나
            백장훈은 다릅니다. 그는 306호를 조작했고, 자신의 흔적을 지우기 위해
            306호에 들어가 있었습니다. 이예진이 들어오자 급히 창문 밖으로
            숨었고, 이예진이 창밖에 숨어 있는 그를 발견하자 우발적으로 망치로
            공격했을 것입니다. <br />
            살해 후 백장훈은 시체를 감전사로 위장하고 문을 잠갔습니다. 12시 40분
            이전에 모든 조작을 마친 그는 307호 창문을 통해 탈출했습니다. <br />
            고제준은 이미 밀항을 준비한 상태로, 굳이 살인을 저질러 자신을 드러낼
            이유가 없습니다. 반면 백장훈은 1년 전 살인사건의 진범으로, 이예진이
            그 사실을 알아챘다는 점에서 강한 살해 동기를 가지고 있었습니다.{" "}
            <br />
            모든 정황을 종합하면, 살해 시점, 문이 잠긴 시각, 망치의 위치, 현장
            조작의 완성도, 그리고 동기까지 모두 일치하는 사람은 단 한
            명뿐입니다. 이예진을 살해한 사람은 백장훈입니다.
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
              href="https://drive.google.com/file/d/1QVl9VL2K64-6VGB8okArBc-yTpZ_6bJE/view?usp=drive_link"
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
            localStorage.removeItem("dure");
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
