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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetectiveNoteType } from "@/features/suspect/types";
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { saveScenarioCertification } from "@/features/suspect/libs/certification";
import { LaunchRounded } from "@mui/icons-material";
import { AnswerRevealSequence } from "@/features/suspect/components/AnswerRevealSequence";

const culprit = "서재승";

export default function NovelistAnswer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuspectAccused, setIsSuspectAccused] = useState(false);
  const [tabValue, setTabValue] = useState("confess");

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      localStorage.getItem("novelist") == null ||
      !JSON.parse(localStorage.getItem("novelist") ?? "").accusedSuspect
    ) {
      setIsSuspectAccused(false);
      return;
    }

    setIsSuspectAccused(true);
    saveScenarioCertification(
      "novelist",
      JSON.parse(localStorage.getItem("novelist") ?? "").accusedSuspect
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
            아직 추리소설가 살인사건의 진범이 지목되지 않았습니다.
            <br />
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
                router.push("/suspect/scenario/novelist");
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
    localStorage.getItem("novelist") ?? ""
  );

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <AnswerRevealSequence
        accusedText={submittedAnswer.accusedSuspect}
        culpritText={culprit}
        imageSrc="/image/suspect/scenario/novelist/novelist-reveal.png"
        methodText="살해방법: 원고 집필을 하던 피해자가 뒤돌아보자 부엌의 식칼로 찔러 살해."
        motiveText="살해동기: 실화 기반 추리 소설에 집착하던 이환 선생이 추리 소설 집필을 위해 피해자의 형에게 교통사고를 일으킨 것에 대한 복수"
        myMethodText={submittedAnswer.howDunnit}
        myMotiveText={submittedAnswer.whyDunnit}
        resultText={
          submittedAnswer.accusedSuspect === culprit ? "맞습니다!" : "아닙니다!"
        }
        targetText="이환을 살해한 범인이"
      />

      <Box display="block" color="white" mx={15} mt={15}>
        <Tabs
          value={tabValue}
          onChange={(event: React.SyntheticEvent, newValue: string) =>
            setTabValue(newValue)
          }
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
            저는 그날 있었던 일을 있는 그대로 말씀드리겠습니다. 꾸밀 생각도
            없고, 변명할 생각도 없습니다. 2026년 1월 10일 오후 6시쯤, 이환 선생
            저택에 도착했습니다. 제가 가장 먼저 도착했습니다. 선생은 1층
            식당에서 저녁 준비를 하고 있었습니다. <br />
            저는 화장실을 간다고 하고 2층으로 올라갔습니다. 그리고 선생 방에
            들어갔습니다. 방 안을 뒤지다가 2025년 3월 2일자 무통장 입금증을
            발견했습니다. 보내는 사람은 ‘브레이크’, 취급점은 이천이었습니다. 제
            형 사고가 바로 다음 날이었습니다. 브레이크 과열 사고였습니다. 그걸
            보는 순간, 우연이 아니라고 생각했습니다. <br />
            그때부터 표절 문제는 아무 의미 없다고 느꼈습니다. 7시쯤 식사가
            시작됐습니다. 윤찬이 표절 얘기를 꺼냈고... 선생은 처음엔 당황하다가,
            곧 태도를 바꿨습니다. 저희를 몰아붙였고, 대화를 끊고 올라갔습니다.
            그 모습을 보면서 더 확신했습니다. 이 사람은 멈추지 않을 거라고
            생각했습니다. 그래서 그때 죽이기로 했습니다. <br />
            9시 20분쯤, 저는 먼저 자리에서 일어났습니다. 이때 식칼 하나를
            가져갔습니다. <br />
            10시쯤, 이환 선생이 원고를 쓰기 시작할 때였죠. 저는 2층으로
            올라갔습니다. 문을 열고 들어갔을 때 선생은 책상에 앉아 있었습니다.
            저는 뒤에서 접근했습니다. 선생이 창문에 비친 저를 보고 돌아봤습니다.
            그런데 그걸 보고도 멈추지는 않았습니다. 오른손으로 칼을 들고, 오른쪽
            가슴을 찔렀고, 선생은 바로 쓰러졌습니다. 칼은 그대로 둔
            상태였습니다. <br />
            그때 노크 소리가 났습니다. 10시 5분쯤이었습니다. 류인영
            목소리였습니다. 숨을 곳이 없어 문 뒤에 섰지만, 창문에 제 모습이
            비치는 게 보여서, 바로 창문을 열었습니다. <br />
            류인영이 들어와 시신을 보고 사진을 찍고 나갔습니다. 계단 내려가는
            소리를 확인하고 바로 방을 나와 제 방으로 돌아갔습니다. 대략 10시
            10분쯤이었습니다. 뭐, 이제 다 끝났군요. 제가 범인입니다. 후회는
            없어요.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index="additional">
          <List>
            <ListItem>
              <ListItemText
                primary="Q1. 홍차에서 검출된 것은 무엇인가요?"
                secondary="수면제 계열 진정 성분"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Q2. 8시 41분 원고 파일을 수정한 계정은 무엇인가요?"
                secondary="YH-Editorial"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Q3. 오민지의 USB는 무엇을 보여주나요?"
                secondary="오민지가 먼저 초고를 갖고 있었고, 표절 방향이 반대였을 가능성"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Q4. 서윤호의 압박은 무엇이었나요?"
                secondary="신작 계약이 무산되면 실적과 편집장 지위를 잃을 위기"
              />
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index="solution">
          <Typography
            variant="body1"
            color="white"
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            핵심은 세 가지입니다. 첫째, 강도현은 8시 24분에 건물을 나가 범행
            시각에서 벗어납니다. 둘째, 오민지의 USB는 표절 의혹의 방향을 뒤집어
            오히려 그녀의 동기를 약화시킵니다. 셋째, 서윤호만이 계약 파탄이라는
            직접적 위기를 안고 있었고, 원고 파일 수정 기록과 엘리베이터 CCTV
            중단 기록까지 남겼습니다.
            <br />
            피해자를 무력화한 수단도 홍차 속 수면제로 설명됩니다. 외상이 거의
            없고 질식 정황이 남은 점까지 합치면, 서윤호가 대화 도중 약을 먹인 뒤
            현장을 조작하려 했다는 결론이 가장 자연스럽습니다.
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
              href="https://drive.google.com/file/d/19D-XLQMvKY4fHwt4peS2L-3HbY-s4Ipr/view?usp=drive_link"
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
            localStorage.removeItem("novelist");
            router.push("/suspect/certification?scenario=novelist");
          }}
          sx={{ mb: 20 }}
        >
          인증카드 보러가기
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem("novelist");
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
