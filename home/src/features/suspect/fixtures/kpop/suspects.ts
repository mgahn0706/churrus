import { SuspectType, VictimType } from "@/features/suspect/types";

export const kpopSuspects: SuspectType[] = [
  {
    name: "하루",
    image: "/image/suspect/scenario/kpop/profile/haru.png",
    age: 21,
    gender: "female",
    job: "HaEvE 멤버",
    description:
      "인사드리겠습니다. 둘, 셋! 안녕하세요, HaEvE입니다! HaEvE의 하루예요. 팀에서 퍼포먼스를 맡고 있고, 무대에서는 누구에게도 지고 싶지 않아요. 가끔 성격이 세다는 말을 듣긴 하는데, 할 말은 하고 사는 편이에요.",
    statement:
      "1시쯤 이브랑 말다툼을 했어요. 이브가 먼저 나간 뒤에는 대기실에서 자다가, 2시쯤 혼자 밥을 먹으러 나갔어요. 식사를 마치고 돌아와 커피를 산 다음 촬영장으로 갔고요. 제가 대기실을 나설 때는 책상 위에 쿠키 같은 건 없었어요.",
    finalArgument:
      "지금 장난해요? 이브랑 싸웠다는 이유로 제가 죽였다고요? 저희 둘이 사이 안 좋다는 기사 몇 개 보고 결론 내린 거잖아요. 저는 방송국 밖에서 밥을 먹고 있었고, 돌아온 뒤에도 이브를 만난 적 없어요. 사람 하나 살인자로 만들어놓고 추리한 척하지 마세요.",
  },
  {
    name: "석PD",
    image: "/image/suspect/scenario/kpop/profile/seok_pd.png",
    age: 42,
    gender: "male",
    job: "방송 PD",
    description:
      "안녕하십니까. 추리헌터스 연출을 맡은 석PD입니다. 방송국에서 17년째 일하고 있습니다. 촬영 전에는 출연진과 스태프의 준비 상태를 직접 확인해야 마음이 놓이는 편입니다.",
    statement:
      "1시에는 마사의 출입을 도와줬고, 그 뒤 스태프들과 점심을 먹으며 촬영 준비 상황을 확인했습니다. 식사를 마친 뒤에는 출연자 대기실을 차례로 점검했습니다. 촬영 시간이 다가오는데 제가 현장을 확인하지 않는 게 오히려 이상하지 않겠습니까?",
    finalArgument:
      "이게 지금 무슨 황당한 결론입니까? 담당 PD가 촬영 전에 대기실을 확인한 게 그렇게 수상합니까? 나는 스태프들과 점심을 먹었고, 그 뒤에도 촬영 준비 때문에 움직인 겁니다. 정작 동선 하나 제대로 확인하지 않고 책임자라는 이유로 범인 취급하지 마십시오.",
  },

  {
    name: "매니",
    image: "/image/suspect/scenario/kpop/profile/mani.png",
    age: 28,
    gender: "male",
    job: "HaEvE 매니저",
    description:
      "안녕하세요. HaEvE 담당 매니저 매니입니다. 운전부터 일정 관리, 식사, 현장 정리까지 두 멤버에게 필요한 건 전부 챙기고 있습니다. 하루와 이브가 연습생일 때부터 함께했습니다.",
    statement:
      "1시까지 대기실에 있다가 전화할 일이 있어서 먼저 나왔습니다. 이후 주차장에서 아담과 잠깐 마주쳤고, 급하게 처리할 일이 생겨 차를 타고 방송국 밖으로 나갔습니다. 볼일을 마친 뒤에는 촬영에 늦지 않게 돌아왔습니다. 개인적인 용무라 자세한 내용까지 말씀드리기는 어렵습니다.",
    finalArgument:
      "내가 좀 수상하게 움직였다고 사람까지 죽였다는 겁니까? 그 시간에 나는 방송국 밖에 있었고, 돌아오자마자 촬영부터 챙겼어요. 개인적인 일까지 전부 까발리지 않았다고 살인자가 되는 건 아니잖아요. 증거도 없으면서 멤버를 죽인 매니저 취급하지 마세요.",
  },
  {
    name: "에덴",
    image: "/image/suspect/scenario/kpop/profile/eden.png",
    age: 24,
    gender: "male",
    job: "Forbidden 멤버",
    description:
      "둘, 셋! 유혹 속으로, Forbidden! 안녕하세요, Forbidden의 리더 에덴입니다. 팀에서는 맏형으로서 멤버들을 챙기고 있습니다. 불합리한 일을 보고도 조용히 넘어가는 성격은 아닙니다.",
    statement:
      "1시부터 아담과 로비에서 챌린지 영상을 찍었습니다. 촬영을 마친 뒤에는 혼자 대기실로 돌아가 쉬면서 본 촬영을 준비했습니다. 시간이 되자 바로 촬영장으로 갔습니다... 더 얘기할 게 없네요.",
    finalArgument:
      "결국 제가 하루와 사이가 나빴다는 얘기밖에 없잖아요. 하루에게 불만이 있었다고 왜 제가 이브를 죽입니까? 사건이 벌어졌다는 시간에는 제 대기실에 있었고, 제가 이브를 해쳤다는 증거도 없어요. 감정 몇 마디 이어 붙여놓고 범인이라고 우기지 마세요. 솔직히 수준 낮은 추리네요.",
  },
  {
    name: "아담",
    image: "/image/suspect/scenario/kpop/profile/adam.png",
    age: 23,
    gender: "male",
    job: "Forbidden 멤버",
    description:
      "둘, 셋! 유혹 속으로, Forbidden! 안녕하세요, Forbidden의 메인보컬 아담입니다. 팬분들께서는 밝고 솔직한 모습이 제 매력이라고 해주세요. 사실 숨기는 게 있으면 얼굴에 금방 드러나는 편이에요.",
    statement:
      "에덴 형과 챌린지 영상을 찍고 나서 개인적인 약속이 있어 방송국을 나갔어요. 식당에서 누군가를 만났는데, 그 사람이 갑자기 먼저 나간 뒤 연락을 받지 않았어요. 한동안 기다리며 계속 전화하다가 촬영 시간 때문에 혼자 방송국으로 돌아왔습니다. 누구를 만났는지는 말하기 곤란해요.",
    finalArgument:
      "그날 식당에서 만난 사람, 이브였어요. 숨긴 건 미안하지만 우리 둘이 만나고 있다는 걸 밝힐 수가 없었다고요. 이브가 사라진 뒤 10분 동안 열다섯 번이나 전화했고, 연락이 안 돼서 미칠 것 같았어요. 그런 제가 이브를 죽였다고요? 남의 사생활이나 들춰놓고 말도 안 되는 소리 하지 마세요.",
  },
];

export const kpopVictim: VictimType = {
  name: "이브",
  image: "/image/suspect/scenario/kpop/profile/eve.png",
  age: 21,
  gender: "female",
  job: "HaEvE 멤버",
  description: "HaEvE의 메인보컬.",
  statement: "",
};
