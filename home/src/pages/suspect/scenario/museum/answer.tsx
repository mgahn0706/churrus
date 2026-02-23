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
import TabPanel from "@/features/suspect/components/Answer/TabPanel";
import { FadeInSection } from "@/features/suspect/components/FadeInSection";
import { LaunchRounded } from "@mui/icons-material";
import { museumAdditionalQuestions } from "@/features/suspect/fixtures/museum/clues";

export default function MuseumAnswer() {
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
      localStorage.getItem("museum") == null ||
      !JSON.parse(localStorage.getItem("museum") ?? "").accusedSuspect
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
            아직 추러스 박물관 살인사건의 진범이 지목되지 않았습니다. <br />
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
                router.push("/suspect/scenario/museum");
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
    localStorage.getItem("museum") ?? ""
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
          도투어를 살해한 범인이
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
          {submittedAnswer.accusedSuspect === "강컨서"
            ? "맞습니다!"
            : "아닙니다!"}
        </Typography>
      </FadeInSection>
      <FadeInSection>
        <Image
          src={"/image/suspect/scenario/museum/museum-reveal.png"}
          alt="범인 공개 이미지"
          width={800}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </FadeInSection>
      <FadeInSection>
        <Box display="flex" justifyContent="center">
          <Typography variant="h2" color="white">
            진범: 강컨서
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white" mt={1}>
            살해방법: 자료실에 있던 피해자를 몽둥이로 때려 살해하고 전시실로
            이동시켜 동기를 숨김
          </Typography>
          <Typography variant="body2" color="gray">
            내 답변: {submittedAnswer.howDunnit}
          </Typography>
        </Box>
      </FadeInSection>
      <FadeInSection>
        <Box textAlign="center">
          <Typography variant="h5" color="white">
            살해동기: 박물관의 공금을 횡령한 사실을 피해자가 알게 되어 입막음을
            위해
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
            저는 그날 제가 한 일을 있는 그대로 말할게요. 꾸밀 것도 없고, 변명도
            없어요. 박물관에서 전시 보수를 하며 가족만 바라보고 살아왔어요. 딸
            강사랑이가 희귀병 진단을 받았을 때, 제 인생은 완전히 무너졌어요.
            신약 비용이 6천만 원이었고, 제 월급 200만 원으로는 도저히 감당할 수
            없었죠. 대출도 거절당했고, 친척들도 큰돈을 빌려주지 않았어요. 그래서
            저는 2025년 1월부터 월급을 ‘부풀리는’ 방식으로 공금을 빼돌리기
            시작했어요. 딱 1년만 해서 딸 치료비를 마련할 생각이었죠. <br />
            그날 아침 저는 평소보다 일찍, 6시 30분에 박물관에 도착했어요. 은행에
            반차를 내고 가야 해서 서둘러 A동과 B동 전시물을 정리하려 했죠. 저는
            늘 끼고 다니던 목장갑을 낀 채 칼 모형을 정렬하고 먼지를 털고
            있었어요. 평소처럼 조용한 아침이라고 생각했어요. <br />
            6시 40분쯤, 저는 A동을 나와 B동으로 향하던 길에 믿기 힘든 장면을
            보게 되었어요. 도투어가 금고를 열고 서류를 뒤지고 있더라고요. 그
            금고 안엔 제가 9개월간 조작한 급여 문서가 모두 들어 있었어요. 저는
            숨이 턱 막혔어요. 그는 저를 보자마자 문서를 움켜쥐고 밖으로 나가려
            했죠. <br />
            저는 제발 눈감아달라고 애원했어요. 딸이 아프다고, 한 번만 봐달라고
            말했죠. 하지만 그는 이미 그걸 이용할 생각뿐이었어요. ‘이걸 들고 나가
            공개하겠다’고 말했어요. CCTV도 바이러스로 꺼놨다고 자랑하더군요. 그
            말을 듣는 순간 저는 끝났다는 생각밖에 들지 않았어요. 들키면 직장도
            잃고, 지금까지 모은 돈도 사라지고, 그러면 딸은… 살릴 수 없어요. 제
            머릿속이 새하얘졌어요. <br />
            그때 저는 일주일 전에 본 인트라넷 공지를 떠올렸어요. 김큐레가 유물을
            자료실 상자에 옮겼다는 내용이었죠. 저는 체념한 척하며 상자 쪽으로
            걸어갔어요. 몸을 숙여 상자를 열자마자 유럽 연쇄살인마 몽둥이 모형이
            눈에 들어왔어요. 저는 그걸 그대로 움켜쥐었죠. <br />
            도투어는 문서를 들고 방을 나가려 하고 있었어요. 저는 그의 뒤에서
            몽둥이를 힘껏 내려쳤어요. 하지만 모형이라 충격이 약했는지 그는
            즉사하지 않았어요. 비틀거리며 쓰러졌고, 저는 멈추지 못했어요. 그의
            머리와 어깨를 여러 번, 더 세게 내려쳤어요. ‘죽어… 우리 딸 대신…’
            이런 말까지 입 밖으로 새어 나왔어요. 지금 생각해도 제 목소리가
            얼마나 떨렸는지 기억나요. 결국 그는 쓰러졌어요. <br />
            6시 50분, 저는 바로 다음 일을 했어요. 문서를 주머니에 넣고 금고를
            다시 잠갔어요. 그 상태 그대로 남겨두면 저라는 게 너무 명확했죠.
            CCTV는 아직 꺼져 있었어요. <br />
            그리고 기념품샵으로 뛰었어요. 시간이 없었어요. 저는 수레를 꺼내 그의
            시신과 함께 도둑 코스프레 복장, 보석 모형, 금화 모형, 추르 키링까지
            잔뜩 담았어요. 그의 시신에 도둑 복장을 입혀 ‘기념품을 훔치다 잡혀
            싸움 끝에 죽은 사람’처럼 보이게 만들려 한 거죠. 완벽하진 않아도
            CCTV가 없으니 어느 정도 혼란은 줄 수 있을 거라 생각했어요. 저는
            사용한 몽둥이와 수레를 시체 옆에 내려놨어요. <br />
            7시가 되자 저는 정문 밖 구석진 곳으로 가서 증거 문서를 라이터로
            태웠어요. 완전히 타지 않았지만, 원본은 없어진 셈이었죠. 그 뒤에 다시
            B동으로 돌아와 아무 일 없다는 듯 보수 작업을 했어요. 누군가 시체를
            발견하길 기다린 거죠. 피가 묻은 목장갑은 깨끗이 빨았습니다. <br />
            7시 30분, 여성의 비명소리가 들렸어요. 제가 모르는 목소리여서 뭔가
            이상했지만, 그 비명으로 상황이 끝났음을 저는 알았어요. 이제 와
            말하자면… 저는 그날 딸을 살리려 했어요. 그 뿐입니다. <br />
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index="additional">
          <List>
            {museumAdditionalQuestions.map((question, index) => (
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
            살해도구의 표면에는 범인의 지문이 온전히 남아있습니다. 하지만, 다른
            사람의 지문은 온전히 남아 있습니다. 따라서 범인이 지문을 닦아낸 것이
            아니라 애초에 장갑 등을 이용하여 지문이 남지 않도록 했다고 판단할 수
            있습니다.
            <br />
            마침 살해 현장 근처 휴지통에서는 피가 묻은 장갑이 발견되었습니다.
            언뜻 보면 범인이 이 장갑을 이용해 범행을 저지른 후 버린 것으로
            보입니다. 하지만, 피해자의 시체 상태를 보면 다른 사실을 암시합니다.
            <br />
            피해자의 손목에는 장갑을 착용했을 때 생기는 고무줄 압흔이 있습니다.
            피해자의 손에는 반지 부분에만 피가 묻어있고, 다른 부위에는 피가 전혀
            없습니다. 피해자가 즉사하지 않았다면 손이 상처 부위나 피 묻은 바닥에
            닿았을 가능성이 충분합니다. 그럼에도 손에 피가 묻지 않았다는 것은
            피해자가 장갑을 착용하고 있었다는 것을 말해줍니다. 즉, 휴지통의
            장갑은 피해자의 장갑으로 보아야 할 것입니다.
            <br />
            피해자의 반지에만 피가 묻어있는 이유는, 피해자가 사건 당시
            결혼반지를 끼고 있지 않았다는 사실과 연결됩니다. 피해자의 주머니에서
            발견된 핀의 흔적, 주머니의 구김과 내용물을 고려했을 때 그날 아침
            신시장과 만났을 때 결혼반지를 주머니에 넣어두었고, 이후 계속
            착용하지 않은 채 사망한 것입니다.
            <br />
            신시장과 피해자는 불륜 관계였고, 신시장은 차기 시장 후보로 이 사실이
            드러나면 정치적 타격을 입을 것이 분명, 피해자의 반지를 주머니에서
            빼서 장갑을 벗기고 반지를 다시 끼운 것입니다. 이 때문에 피해자의
            장갑이 휴지통에 버려진 것입니다. 따라서, 해당 장갑은 피해자의
            것입니다. 최소한, 범인에게는 따로 장갑이 있었어야 함이 분명합니다.
            <br />
            용의자의 장갑 습관을 보면, 김큐레는 평소 장갑을 쓰지 않고 현장에서
            장갑 등을 버린 흔적이 없기 때문에 범인이 될 수 없습니다. 신시장은
            손수건을 이용할 수 있었고 강컨서는 평소에 목장갑을 쓰고 있었습니다.
            <br />
            금고에서 발견된 혈흔은 실제 살해 장소가 자료실 / 창고임을
            알려줍니다. 살해 도구는 창고에 있던 유물입니다. 그것도 상자 안에
            있던, 숨겨진 흉기였습니다. 우발적인 살인이라고 해도 해당 흉기가 상자
            안에 있다는 것을 알기 위해서는 박물관 내부의 정보를 잘 알고 있어야
            합니다. 다른 상자에는 흉기로 쓸 만한 무기가 없기 때문입니다.
            신시장은 외부인이기 때문에 최근 흉기 유물이 창고로 옮겨졌다는 사실을
            모릅니다. 흉기 상자는 다른 유물 상자 아래에 있었기 때문에 우연히
            발견하기도 힘듭니다. 따라서, 신시장은 흉기를 이용했다고 보기
            어렵습니다.
            <br />
            따라서 장갑을 평소에 사용했고 흉기가 어디 있는지 알 수 있었던
            강컨서를 진범으로 지목할 수 있습니다. 강컨서는 사건 당일 평소보다
            일찍 출근했습니다. 그는 금고를 열고 서류를 확인하던 도투어를
            목격했고, 자신의 비밀이 들통났다고 판단해 그 장소에 있던 흉기를
            이용해 살해하기에 이르렀습니다. 그 후 강컨서는 수사관의 혼란을 주기
            위해 도투어가 유물을 훔치다 죽은 것으로 위장하고자 했습니다. 이미
            말다툼으로 CCTV가 다운되었다는 것을 알았던 강컨서는 기념품샵에서
            급하게 옷과 보물을 훔쳐 사건 현장을 조작했습니다. 그 이후 해당
            서류를 박물관 밖에서 불태웠습니다.
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
              href="https://drive.google.com/file/d/1AZKDxRitrGAwiooaqwlwoTcIgDrghT7u/view?usp=drive_link"
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
