import TabPanel from "@/components/TabPanel";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PlayButtonIcon from "@mui/icons-material/PlayCircleFilled";
import { useRouter } from "next/router";
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

function FadeInSection(props: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return;
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        color: "white",
        padding: "16px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translate(0, 50%)",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 2000ms ease-out, transform 1000ms ease-out",
        willChange: "opacity, visibility",
        display: "flex",
      }}
      ref={domRef}
    >
      {props.children}
    </Box>
  );
}

export default function StartUpAnswer() {
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
      localStorage.getItem("startup") == null
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
            아직 스타트업 살인사건의 진범이 지목되지 않았습니다. <br />
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
                router.push("/startup");
              }}
            >
              확인
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }

  const accusedSuspect = localStorage.getItem("startup");

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <FadeInSection>
        <Typography variant="h1" color="white" mt={50} mb={20}>
          {accusedSuspect}
          {accusedSuspect === "강지혜" ? "는" : "은"}
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
          한채원을 살해한 범인이
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
          {accusedSuspect === "김성균" ? "맞습니다!" : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 김성균
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 위스키 물약통을 니코틴이 들어있는 물약통으로 바꿔치기해
            독살
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h5" color="white">
            살해동기: 짝사랑하던 한채원이 개인정보를 무단 이용한 사건을 본인에게
            덮어씌우려했다.
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
            value="solution"
            label="사건 풀이법"
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
            value="others"
            label="용의자들의 행적"
          />
        </Tabs>
        <TabPanel value={tabValue} index="confess">
          <Typography
            variant="body1"
            color="white"
            sx={{ wordSpacing: 3, lineHeight: 2.5, wordBreak: "keep-all" }}
          >
            확실히 제가 죽였습니다. 하지만 충분히 이유가 있었어요. <br />
            추러스는 2017년 설립된 이후로 승승장구해나가고 있었고, 조만간
            정부에서 투자도 받을 예정이었어요. 올해 3월, 그 폭로가 나기 전에는
            말이에요.
            <br />
            2023년 3월에 경쟁사 와플러브에서 저희 앱에 사용된 인공지능이 잘못
            설계된 것임을 폭로했어요. 저희 회사 이미지는 추락할대로 추락했죠.
            채원이는 어떻게해서든 저희 회사를 살리고 싶었나봐요. 채원이는 저에게
            사용자 데이터를 불법으로 이용해 성능을 올리자고 했죠. 저는 말이
            안되는 불법행위라고 생걱했지만, 그냥 승인했습니다. 저는 채원이를
            좋아하고 있었거든요. 채원이가 곤란해하는 걸 보기가 힘들었어요.
            <br />
            하지만, 이 사건도 왠지 모르게 와플러브에게 넘어갔고, 저희 회사는
            몰락 위기에 처했습니다. 이를 빌미로 저는 채원이와 5월 25일, 그저께
            퇴근 후 대화를 나눴어요. 전 대화하면서 호감을 계속 표시했는데...
            뭔가 분위기가 이상했어요. '너 덕분에 이번 일도 잘 해결될 것
            같다'라던지, '이번에도 부탁해'라는 말이라던지요. 채원이를 위해서라면
            뭐든 해줄 수 있었지만, 아직 얘기 나눴던 게 없었던 걸요.
            <br />
            그렇게 채원이를 먼저 보내고, 채원이의 PC를 켜봤어요. 비밀번호는
            채원이의 생일로 쉽게 알 수 있었습니다 그 안에서 발표문과 신고
            접수서를 발견했어요. 2023년 4월에 있었던 그 유출 사건을 저만의
            독단적인 행동이었다고, 저에게만 책임을 묻겠다는 내용이었어요. 그리고
            적법하게 해고하겠다는 내용도 있었죠. 미친듯이 화가났습니다. 이렇게
            배신을 하다니요.
            <br />
            저는 긴 법정싸움 대신 그냥 한채원이 죽어버렸으면 했습니다.
            고통스럽게. 회사 구성원들이 보는 앞에서요. 어차피 제 인생은
            망했으니, 채원이가 좀 더 고통스러운 길을 택한 것 뿐이에요.
            <br />
            저는 한채원이 따로 먹는 위스키 물약통이 있다는 것을 알았습니다.
            채원이는 다같이 고급 양주를 구성원과 마시는 걸 좋아하고, 채원이만
            따로 먹는 위스키가 있거든요. 거기에 독약을 미리 타놓고 파티를 열기로
            계획했습니다. 독으로는 니코틴을 선택했어요. 무색무취이기도 하고,
            저는 비흡연자라 아무래도 흡연자분들이 용의선상에 먼저 오르지
            않겠어요?
            <br />
            살해날짜는 강지혜의 입사 1주년인 5월 27일로 결정했어요. 니코틴
            구매도 잊지 않았습니다. 전자 담배 판매점에서 니코틴 농도가 낮다고
            하니 퓨어 니코틴을 구할 수 있었어요. 살해 전날인 26일, 저는 7시
            30분에 퇴근하는 척 나갔다가 다른 문으로 다시 들어왔어요. 그 문은
            8시에 닫히기에 30분 안에 일을 끝내야했어요.
            <br />
            한채원의 서랍을 열어 물약통을 바꿔치기했습니다. 그런데, 문제가 하나
            있었어요. 원래 물약통에 네임펜으로 뭐라뭐라 주종 같은게
            쓰여있던거였죠. 저는 네임펜으로 급하게 따라 썼습니다. 필체도 꽤나
            비슷하게 쓰였고, 한채원도 유심히 볼 것 같지 않았어서 안심했죠.
            <br />
            그렇게 오늘 저녁 7시, 저희는 예정되어있었던 파티를 열었어요. 저는
            가만히 지켜보면서, 채원이가 위스키를 자신의 술잔에 넣는 것을 보고
            있었습니다. 한채원은 쓰디 쓴 니코틴을 마시고, 곧 고통스럽게
            쓰러졌어요. 다행이었어요. 제가 원하는 방향대로 일이 진행되었습니다.
            다들 당황한 표정이에요. ‘빨리 119에 신고 좀 해주세요!’ 저는
            외쳤습니다. 마치 아직 짝사랑하는 것마냥… 짝사랑했던 이를 잃은 것
            마냥 말이죠. 한채원을 붙잡고, 계속 정신 차리라고 말했어요. 그렇게
            119에 실려간 그녀를 바라보며 안도감이 들었습니다. 저는 나름
            치밀했다고 생각해요. 여러분이 절 잡았다고 해도, 상관 없습니다. 이미
            제 목적은 끝났거든요.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index="additional">
          Item Two
        </TabPanel>
        <TabPanel value={tabValue} index="solution">
          Item One
        </TabPanel>

        <TabPanel value={tabValue} index="others">
          Item Three
        </TabPanel>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            localStorage.removeItem("startup");
            router.push("/");
          }}
          sx={{ mb: 20 }}
        >
          메인 화면으로 돌아가기
        </Button>
      </Box>
    </Box>
  );
}
