import TabPanel from "@/components/Answer/TabPanel";
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
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { DetectiveNoteType } from "@/types";
import { FadeInSection } from "@/components/FadeInSection";

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
      localStorage.getItem("startup") == null ||
      !JSON.parse(localStorage.getItem("startup") ?? "").accusedSuspect
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

  const submittedAnswer: DetectiveNoteType = JSON.parse(
    localStorage.getItem("startup") ?? ""
  );

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <FadeInSection>
        <Typography variant="h1" color="white" mt={40} mb={20}>
          {submittedAnswer.accusedSuspect}
          {submittedAnswer.accusedSuspect === "강지혜" ? "는" : "은"}
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
          {submittedAnswer.accusedSuspect === "김성균"
            ? "맞습니다!"
            : "아닙니다!"}
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
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 위스키 물약통을 니코틴이 들어있는 물약통으로 바꿔치기해
            독살
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 짝사랑하던 한채원이 개인정보를 무단 이용한 사건을 본인에게
            덮어씌우려했다.
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
          <List>
            <ListItem sx={{ my: 3 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" mb={2}>
                    Q1. 김성균은 피해자를 평소에 어떻게 생각하고 있었나요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 김성균은 피해자 한채원을 평소에 짝사랑하고 있었습니다.
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
                    Q2. 살해 당시 피해자 맞은 편에 앉아있던 사람은 누구인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 살해 당시 피해자 맞은 편에 앉아있던 사람은
                      박지혁입니다.
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
                    Q3. 박지혁의 연인은 누구인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 박지혁의 연인은 추러스에서 개발한 인공지능인 'Snack
                      Genius'입니다.
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
                    Q4. 강지혜가 추러스에 입사하게 된 계기는 무엇인가요?
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body1" color="white">
                      A. 강지혜는 '와플러브'에서 온 스파이로, 추러스의 기술을
                      유출하기 위해 입사했습니다.
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
            한채원은 위스키를 마시고 니코틴 중독으로 독살되었습니다. 어떻게 된
            일일까요?
            <br />
            먼저, 니코틴은 한채원의 컵과, 위스키의 물약통에서 검출되었습니다.
            즉, 범인은 축하 파티 이전에 한채원의 위스키 물약통에 니코틴을
            넣었습니다. 이런 방법을 사용하기 위해서는 두가지 전제 조건이
            필요합니다. <br />
            첫째, 한채원이 위스키를 물약통에 따로 마신다는 점을 알아야합니다.
            둘째로, 그 물약통을 한채원 혼자서만 마신다는 사실을 알아야합니다.
            한채원은 제품 팀 구성원들하고만 해당 물약통을 썼으므로, 비즈니스
            팀인 박지혁은 이 사실을 알기 힘들 것입니다. 강지혜는 Cask Strength
            를 검색해보는 등 한채원을 조사한 흔적이 있으므로 해당 사실을 알
            가능성이 있습니다.
            <br />
            또, 위스키 물약통을 바꿔치기하기 위해서는 바꿔치기를 할 시간이
            있어야합니다. 위스키 물약통은 5월 25일 저녁까지 정상이었으므로, 살해
            당일인 5월 27일까지의 시간 중에 바꿔치기가 이루어졌어야 합니다.
            한채원이 유일하게 자리를 비운 시간은 26일 7시 30분 이후입니다.
            점심시간에는 한채원을 포함해 항상 사무실에서 점심을 먹는 사람들이
            있었기 떄문에 해당 시간에 바꿔치기는 힘들었을 것입니다.
            <br />
            따라서 범행이 가능한 시간은 5월 26일 저녁입니다. 하지만, 이 날은
            모두 한채원보다 일찍 퇴근했습니다. 즉, 범인은 퇴근 기록을 남기고
            뒷문으로 들어와 저녁 8시 이전에 범행을 마치고 나왔다는 의미가
            됩니다. 회사에 아무도 없다고 판단이 섰을 때, 빠르게 뒷문으로
            들어갔다 나온 것이지요. 여기서 8시까지 모두 회사에서 나온다는 보장이
            없기에, 마지막에 나오면서 사무실이 비었음을 확신할 수 있었던
            김성균의 범행 가능성이 매우 높아집니다. 범인은 이렇게 위스키
            물약통을 한채원의 서랍에서 바꿔치기합니다. 그런데, 범인은
            바꿔치기하는 물약통에 굳이 한채원의 네임펜을 써가며 Cask Strength
            ABV 17이라는, 말이 안되는 메모를 남겼습니다. 범인은 8시까지
            나가야했으니 10분밖에 시간이 없었을 겁니다. 범인은 물약통에 메모가
            남겨져있음을 몰랐고, 바꿔치기하는 그 상황에서 다급하게 원래 물약통의
            글씨를 따라 썼을 것입니다. 하지만, 한채원의 악필로 인해 '67'과
            '17'을 구별하지 못하고 '생위스키 알코올 도수 17도'라는 말이 안되는
            메모를 남기게 된 것입니다. Cask strength 를 미리 검색해본 강지혜나,
            휴림 출신인 박지혁은 이런 실수를 하기 힘들었을 것입니다. 유일하게
            술에 대해 무지했던 김성균이 범인일 가능성이 매우 높아졌습니다.
            <br />
            마지막으로, 동기입니다. 강지혜는 스파이 의심을 살해 전에 받긴
            했지만, 해당 문자는 사건 당일 오후에 받아 이런 계획 범죄를 진행하기
            어려웠을 것입니다. 박지혁은 충분한 살해동기가 있고, 실제로 과도를
            준비하여 살해를 계획한 것처럼 보입니다. 하지만, 살해 방법은 독살이기
            때문에, 과도는 '혹시 죽지 않았을 경우 찔러 죽일 도구' 의 역할일
            것입니다. 그렇다기에는 굳이 '퇴근 후 따로 만나서 보자' 는 증거를
            한채원에게 남겨 본인에게 불리하게 했으며 사람을 죽이기 힘든 '작은'
            과도를 준비했다는 점이 이상합니다. 아마 과도는 협박용으로 보는 것이
            타당할 것입니다. 어쩌면 자해용으로 말이죠.
            <br />
            한편 김성균은 한채원을 짝사랑하고 있었고, 한채원의 노트북의
            비밀번호도 쉽게 알았을 것입니다. 25일 한채원과 김성균의 대화로
            미루어보아, 김성균은 한채원의 말에 의심을 품기 충분하며, 노트북에서
            발표문을 보았을 가능성이 높습니다. 실제로 해당 날짜에 퇴근시간이
            늦게 찍혀있고요. 집으로 돌아가는 길에 '농도가 높은 니코틴' 을
            구매했으며 26일에 범행을 저질렀다고 하면 모든 흐름이 맞게 됩니다.
            마지막으로, 건배를 먼저 유도함으로써 빠르게 한채원이 니코틴을 마시게
            한 사람도 김성균입니다.
            <br />
          </Typography>
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
