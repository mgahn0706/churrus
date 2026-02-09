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
import { LaunchRounded } from "@mui/icons-material";
import { serialAdditionalQuestions } from "@/features/suspect/fixtures/serial/clues";

export default function SerialAnswer() {
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
      localStorage.getItem("serial") == null ||
      !JSON.parse(localStorage.getItem("serial") ?? "").accusedSuspect
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
            아직 28동-301동 연쇄 살인사건의 진범이 지목되지 않았습니다. <br />
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
                router.push("/suspect/scenario/serial");
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
    localStorage.getItem("serial") ?? ""
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
          여여친과 남남친을 살해한 범인이
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
          {submittedAnswer.accusedSuspect === "황새내"
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 황새내
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 여여친을 옥상으로 불러 벽돌로 살해 후 로프로 알리바이 트릭
            설치, 이후 남남친을 화분으로 살해 후 추락사로 위장
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 남남친과 여여친이 12년 전 언니 '김학생'을 자살로 몰고 간
            것에 대한 복수
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
          {serialAdditionalQuestions.length > 0 && (
            <Tab
              sx={{
                fontSize: "20px",
              }}
              value="additional"
              label="추가 질문 해답"
            />
          )}
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
            맞아요, 제가 죽였어요. 아니, 정확히는 '김딸'이 죽인거죠. 이 얘기를
            하려면 12년 전으로 돌아가야해요. <br />
            김아빠와 최엄마, 그리고 세 살 터울의 김학생이라는 언니 밑에서 자란
            저는, 와부초등학교에 진학하게 되었어요. 제가 입학했을 때, 언니는
            초등학교 4학년이었죠. 하지만, 당시 학급에서 괴롭힘과 심한 폭력을
            당한 언니는 2013년 10월 10일, 스스로 목숨을 끊고 말았어요. <br />
            저보다 더 슬펐던건 당시 저희 부모님이었어요. 아빠는 술에 의지하기
            시작했고, 엄마는 매일매일 울기만 했죠. 그렇게 집안은 점점
            무너져갔어요. 어느 날 그 두 사람은 저를 소풍을 간다며 차에 태웠고,
            저수지로 운전하여 동반자살을 시도했어요. 다행히 저는 차가 물에
            빠지기 전에 탈출할 수 있었죠. <br />그 후, 저는 황아빠라는 분께
            거두어져 지내게 되었어요. 그분은 저를 사랑으로 대해주셨고, 저는
            그분의 딸이 되어 열심히 살았어요. 저를 죽이려고 한 그 두 사람보다요.
            <br /> 그렇게 저는 김딸이 아니라 황새내로서 살아가게 되었어요.
            <br />
            그리고 얼마 전, 추러스 모임에서 남남친과 여여친을 만났어요.
            술자리에서 그들은 저에게 엄마도 없는 사람이라며 욕을 하더군요.
            하지만, 제 심기를 건드린 건 그 말이 아니었어요. 그들이 제 언니였던
            '김학생'을 괴롭히고 자살로 몰고 갔다는 사실이었죠. 그것도
            자랑스럽게, 업적마냥 말이에요. <br />
            그날 이후, 저는 그들을 반드시 벌해야겠다고 결심했어요. 언니가 죽은
            10월 10일, 그날 밤 그들을 동시에 투신시키기로 했어요. 전날에
            철저하게 동선과 트릭을 연습한 저는, 301동에서 공부 중인 여여친을
            먼저 불러냈죠. 옥상으로 올라간 뒤 저는 그녀의 뒤에서 벽돌로 머리를
            내리쳤어요. 그녀가 의식을 잃자, 저는 미리 준비해둔 로프로 옥상
            난간에 매달아 놓았죠. 그런 뒤, 저는 급히 28동으로 이동했어요. <br />
            남남친의 위치는 전화로 간단하게 알 수 있었어요. 여여친이 바람을
            핀다는 핑계로, 증거를 보여주겠다고 하니 28동 문도 순순히
            열어주더군요. 마찬가지로, 그를 뒤에서 화분으로 내리쳤어요. 그는
            즉사했고, 경비원이 여여친을 떨어뜨릴 11시 경에 맞추어 그를
            떨어뜨렸어요. <br />
            그렇게 두 사람은 모두 죽었고, 저는 복수를 완성했어요. 저에게 이제
            남은 건 없어요. 복수도 끝났고, 이미 가족은 사라진지 오래죠. 제
            인생을 망가뜨린 그 두 사람을 죽인 저는 이제 김딸을 완벽하게 잊고
            황새내로서 살아갈 수 있을 거라 생각했어요.
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index="additional">
          <List>
            {serialAdditionalQuestions.map((question, index) => (
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
            두 사람이 거의 동시에 떨어져 죽었습니다. 그리고 두 장소는 걸어서
            20분 거리에 있습니다. 버스를 잘 탔다고 해도 10분은 걸리는
            거리입니다. 사람의 몸이 둘일 수는 없습니다. 따라서 어떤 한 피해자는
            미리 사망 후 어떤 장치에 의해 떨어진 것입니다. 여여친의 몸에
            묶여있던 등산용 로프로 보아 여여친은 칼에 찔린 후 사망한 뒤 로프에
            의해 묶여있다가 11시에 추락했습니다. 따라서 범인이 죽인 피해자의
            순서는 여여친 → 남남친 순입니다. 즉, 안친구는 범인 후보에서 제외할
            수 있습니다. <br /> 그렇다면 범인은 황새내와 권영교로 좁혀집니다. 둘
            다 301동에 있다가 28동으로 이동한 흔적이 있습니다. 301동의 경비원
            순찰주기는 1시간. 여여친이 사망 시점은 오후 10시에서 오후 11시
            사이입니다. 따라서 여여친을 죽인 시점에서 28동은 이미 ‘자연대 학생만
            출입할 수 있는 공간’이 됩니다. 이 둘 중 자연대 건물에 드나들 수 있는
            사람은 누구일까요? <br /> 권영교는 남남친에게 차단되었기 때문에 그를
            불러낼 수 없었습니다. 지나가는 다른 사람의 출입 흔적도 없었기에,
            그가 빌린 권자연의 학생증으로 출입한 것으로 보아야합니다. 권영교는
            행적이 매우 즉흥적입니다. 이미 차단된 남남친에게 전화를 한다든지,
            권자연에게 학생증을 그날 빌린다든지. 이는 미리 계획된 것이 아니라,
            자연대 학생만 오후 10시 이후 출입된다는 사실을 당일에 알았기
            때문입니다. 미리 알았다면 권자연의 학생증을 미리 빌렸을 것입니다.
            그런데, 권자연에게 전화를 한 시점은 오후 10시 15분입니다. 이 말은,
            28동 출입 시도를 오후 10시 15분에 했다는 의미입니다. 301동에서
            28동까지 걸리는 시간은 최소 10분. 따라서 권영교가 여여친을 죽인
            시점은 아무리 늦어도 10시 5분 이전입니다. 즉, 권영교는 경비원이 나간
            시점 뒤, 지체없이 여여친을 죽이고 5분 안에 알리바이 세팅을 해야하는
            것입니다. 또, 301동의 엘리베이터는 최소 5분 이상 걸리는 것으로
            유명하기 때문에 그에게는 시간이 매우 부족합니다. 따라서 사망 추정
            시간 내에 살인을 완료할 수가 없습니다. <br />
            반면, 황새내는 남남친에게 10시 20분에 연락한 기록이 남아있으며
            비교적 28동 출입이 자유롭습니다. 그녀는 10시 10분~20분 사이에
            여여친을 죽이고, 이후 15분동안 걸어서 28동 이동 후 남남친을 이용하여
            28동으로 이동, 28동 옥상에서 살해하는 시간이 유일하게 확보된
            용의자입니다. <br />
            또한 301동에 수업이 없어도 전날 올라가 예행연습을 한 정황, 평소에
            301동에 수업이 많아 경비원 순찰 시간 등을 잘 알 수 있는 사람은
            황새내가 유일합니다.
            <br /> 마지막으로, 황새내가 범인이라면 남는 의문점이 있습니다.
            황새내는 35분 이전에 남남친과 만났는데 떨어진 시간은 10시
            50분입니다. 왜일까요? 아마, 황새내에게는 두 피해자가 동시에
            떨어져야할 이유가 있었을 것 같습니다. 그녀의 언니가 죽은 날인 10월
            10일. 언니가 투신자살한 것처럼 당시 두 가해자가 동시에 떨어져 죽어야
            복수를 완성할 수 있었기 때문에 그녀는 바로 떨어뜨리지 않았습니다.
            경비원이 301동에서 여여친을 떨어뜨릴 오후 11시 부근에 맞추어
            떨어뜨려야, 그녀의 복수가 이뤄지기 때문입니다. <br />
            그리고 공개된 정보의 신고 내용을 봅시다. ‘시체가 추락했다’뇨. 이미
            사망한 채로 떨어졌다는 사실을 알고 있었다는, 황새내의 치명적인
            실수가 보이네요.
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
              href="https://drive.google.com/file/d/1BWJYoRv-0tg30SlbRISxpewsiGBGlClq/view?usp=sharing"
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
