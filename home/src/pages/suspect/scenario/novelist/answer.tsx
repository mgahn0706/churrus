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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetectiveNoteType } from "@/features/suspect/types";
import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { saveScenarioCertification } from "@/features/suspect/libs/certification";

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
              transform: "rotate(90deg)",
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
          이환을 살해한 범인이
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
          {submittedAnswer.accusedSuspect === culprit
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>

      <FadeInSection>
        <Image
          src="/image/suspect/scenario/novelist/novelist-reveal.png"
          alt="범인 공개 이미지"
          width={800}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </FadeInSection>

      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: {culprit}
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 원고 집필을 하던 피해자가 놀라서 뒤돌아보자 부엌의 식칼로
            찔러 살해.
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>

      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 실화 기반 추리 소설에 집착하던 이환 선생이 추리 소설
            집필을 위해 본인의 동생을 살해했다.
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.whyDunnit}
          </Typography>
        </Box>
      </FadeInSection>

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
        </Tabs>

        <TabPanel value={tabValue} index="confess">
          <Typography
            variant="body1"
            color="white"
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            맞아요. 내가 했습니다. 서린 작가가 계약서에 서명하지 않으면 이번
            시즌 라인업 전체가 무너질 상황이었어요. 그런데 그 사람은 계약을
            거절하는 걸 넘어서, 내가 원고를 어떻게 다뤄 왔는지까지 외부에
            알리겠다고 했죠.
            <br />
            오민지의 초고를 먼저 받아 놓고도, 회사에선 그 아이디어 일부를 서린
            작가 원고 쪽으로 정리해 붙이는 걸 문제라고 생각하지 않았어요. 난
            그걸 막지 않았고, 오히려 일정 맞추려면 어쩔 수 없다고 여겼습니다.
            <br />
            그날도 홍차에 약을 타 정신을 흐리게 한 다음, 대화로 설득해서
            마무리할 생각이었어요. 그런데 서린 작가가 노트북을 열어 증거 메일을
            보내려는 걸 보고 눈앞이 캄캄해졌습니다. 결국 쿠션으로 눌렀고,
            움직임이 멈춘 뒤에야 내가 돌이킬 수 없는 선을 넘었다는 걸 알았어요.
            <br />
            엘리베이터 CCTV를 잠깐 끈 것도, 원고 파일을 수정한 것도 전부 시간을
            벌기 위해서였습니다. 마지막까지도 사고처럼 보이게 만들 수 있다고
            믿었는데, 결국 가장 많이 남은 건 제 흔적이었네요.
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
