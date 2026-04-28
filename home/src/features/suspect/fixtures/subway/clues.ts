import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const subwayAdditionalQuestions = createAdditionalQuestions([
  {
    question: "정보건이 사건 당일 서울대입구역으로 향한 이유는 무엇인가요?",
    answer:
      "하승객이 텔레그램으로 전달받던 물품과 홍셰프의 수상한 움직임을 확인하기 위해 역 주변에서 접촉하려고 했습니다.",
  },
  {
    question: "전공익이 가장 유력한 용의자로 보이지만 진범이 아닌 이유는 무엇인가요?",
    answer:
      "사물함 속 청산가리와 근무 동선은 의심스럽지만, 독살 수단과 커피 전달 동선은 홍셰프 쪽 단서와 더 정교하게 맞물립니다.",
  },
  {
    question: "이번 사건에서 결정적인 살해 도구는 무엇인가요?",
    answer:
      "홍셰프가 가져간 테이크아웃 아이스아메리카노에 섞인 독성 물질입니다.",
  },
]);

export const subwayClues: ClueType[] = [
  {
    id: 1,
    title: "시체",
    x: 52,
    y: 65,
    image: "/image/suspect/scenario/subway/clues/subway-1.png",
    description:
      "역사 내부에서 발견된 정보건의 시체. 급성 중독 증상과 함께 호흡 마비가 의심되는 상태다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 2,
    title: "마스크 안 구토 자국",
    x: 44,
    y: 62,
    image: "/image/suspect/scenario/subway/clues/subway-2.png",
    description:
      "피해자가 쓰고 있던 마스크 안쪽에 구토 흔적이 남아 있다. 독극물을 섭취한 뒤 급하게 증상이 온 것으로 보인다.",
    type: "additional",
    place: 1,
  },
  {
    id: 3,
    title: "립스틱 자국",
    x: 39,
    y: 48,
    image: "/image/suspect/scenario/subway/clues/subway-3.png",
    description:
      "진한 립스틱 자국이 남은 흔적. 커피컵이나 음용 흔적과 연결해서 봐야 한다.",
    type: "additional",
    place: 5,
  },
  {
    id: 4,
    title: "음료 쓰레기통",
    x: 20,
    y: 74,
    image: "/image/suspect/scenario/subway/clues/subway-4.png",
    description:
      "승강장 근처 음료 전용 쓰레기통. 여러 컵이 버려져 있지만 유독 한 컵만 급히 밀어 넣은 듯 걸쳐 있다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 5,
    title: "버린 플라스틱 커피컵",
    x: 23,
    y: 68,
    image: "/image/suspect/scenario/subway/clues/subway-5.png",
    description:
      "추리스 커피 로고가 찍힌 플라스틱 컵. 컵 테두리에 립스틱 자국이 남아 있다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 6,
    title: "버린 빨대와 캐리어",
    x: 27,
    y: 61,
    image: "/image/suspect/scenario/subway/clues/subway-6.png",
    description:
      "커피컵과 같은 브랜드의 빨대와 캐리어가 따로 버려져 있다. 누군가 컵만 따로 옮겨 버린 흔적처럼 보인다.",
    type: "additional",
    place: 5,
  },
  {
    id: 7,
    title: "음료 버리는 곳의 잔여물",
    x: 16,
    y: 65,
    image: "/image/suspect/scenario/subway/clues/subway-7.png",
    description:
      "음료 처리 통 안쪽에서 일반 커피와 다른 자극성 냄새가 난다. 얼음은 거의 녹지 않은 채 남아 있지 않다.",
    type: "additional",
    place: 4,
  },
  {
    id: 8,
    title: "역사 안내 광고",
    x: 67,
    y: 18,
    image: "/image/suspect/scenario/subway/clues/subway-8.png",
    description:
      "‘코로나19 예방을 위해 마스크 필수 착용’, ‘함부로 남이 준 음료를 먹지 마세요’라는 문구가 함께 붙어 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 9,
    title: "민원 기록 모음",
    x: 73,
    y: 28,
    image: "/image/suspect/scenario/subway/clues/subway-9.png",
    description:
      "평소 피해자가 전공익을 자주 무시했고, 역사 운영과 관련한 민원도 여러 차례 넣었다는 기록이 남아 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 10,
    title: "죽과 독살 관련 메모",
    x: 77,
    y: 36,
    image: "/image/suspect/scenario/subway/clues/subway-10.png",
    description:
      "하승객의 필기 메모. ‘웬만한 독약은 먹고 나서 바로 죽는 게 아니라 서서히 마비된다’는 문장이 표시되어 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 11,
    title: "전공익 사물함 속 청산가리",
    x: 54,
    y: 24,
    image: "/image/suspect/scenario/subway/clues/subway-11.png",
    description:
      "전공익 개인 사물함에서 청산가리 용기가 발견됐다. 뚜껑 주변에 최근 사용 흔적이 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 12,
    title: "가족 입원 기록과 역학조사 결과",
    x: 33,
    y: 19,
    image: "/image/suspect/scenario/subway/clues/subway-12.png",
    description:
      "2020년 3월자 입원 기록과 역학조사 결과. 하승객에게 전달됐고, 면회 요청은 거절당한 흔적이 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 13,
    title: "홍셰프와 정보건의 약속 메시지",
    x: 13,
    y: 22,
    image: "/image/suspect/scenario/subway/clues/subway-13.png",
    description:
      "‘오늘 보건소에서 만나기로 함. 최근에 들킬 뻔했으니 2배로.’라는 대화가 남아 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 14,
    title: "보건소 운영 일정",
    x: 10,
    y: 30,
    image: "/image/suspect/scenario/subway/clues/subway-14.png",
    description:
      "보건소는 주말 휴무라는 일정표. 정보건 역시 오늘 근무할 날이 아닌 것으로 표시돼 있다.",
    type: "additional",
    place: 13,
  },
  {
    id: 15,
    title: "전공익 근무표",
    x: 46,
    y: 15,
    image: "/image/suspect/scenario/subway/clues/subway-15.png",
    description:
      "전공익의 근무시간은 오후 6시부터 다음 날 오전 9시까지로 적혀 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 16,
    title: "전공익의 메모장",
    x: 58,
    y: 31,
    image: "/image/suspect/scenario/subway/clues/subway-16.png",
    description:
      "올해 3월 초부터 하승객을 좋아했다는 내용의 사적인 메모가 남아 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 17,
    title: "하승객의 알바 이력",
    x: 82,
    y: 17,
    image: "/image/suspect/scenario/subway/clues/subway-17.png",
    description:
      "하승객은 3월에 서울대입구역에서 아르바이트를 시작했고, 4월 4일에 일을 그만둔 것으로 되어 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 18,
    title: "텔레그램 대화 기록",
    x: 84,
    y: 25,
    image: "/image/suspect/scenario/subway/clues/subway-18.png",
    description:
      "하승객이 4월 중반부터 던지기 수법을 사용했다는 텔레그램 대화. 좌표와 배달 장소 사진이 반복된다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 19,
    title: "9번 출구 관련 메시지",
    x: 86,
    y: 33,
    image: "/image/suspect/scenario/subway/clues/subway-19.png",
    description:
      "‘오늘도 서울대학교 9번 출구로 가서 놓음’, ‘9번 물품함을 말하는 거냐’는 대화가 남아 있다. 하승객은 상대를 답답해했다.",
    type: "additional",
    place: 18,
  },
  {
    id: 20,
    title: "추리스 커피 근태 기록",
    x: 70,
    y: 44,
    image: "/image/suspect/scenario/subway/clues/subway-20.png",
    description:
      "추리스 커피는 아르바이트생이 자주 바뀌며, 하승객도 4월 10일에 취직했다가 곧바로 잘린 기록이 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 21,
    title: "스크린도어 장애 기록",
    x: 71,
    y: 56,
    image: "/image/suspect/scenario/subway/clues/subway-21.png",
    description:
      "스크린도어가 밤 9시 58분부터 작동 불능 상태였다는 점검 기록이다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 22,
    title: "CCTV 공백 기록",
    x: 60,
    y: 17,
    image: "/image/suspect/scenario/subway/clues/subway-22.png",
    description:
      "역사 CCTV가 오늘 저녁 7시 30분부터 끊겨 있었다. 전공익이라면 이 이상 징후를 알고 있었을 가능성이 크다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 23,
    title: "킷사샤울 메뉴판",
    x: 9,
    y: 43,
    image: "/image/suspect/scenario/subway/clues/subway-23.png",
    description:
      "킷사샤울에서 복어회를 취급하고 있다는 메뉴 안내판이다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 24,
    title: "일식 자격증과 복어조리기능사",
    x: 18,
    y: 49,
    image: "/image/suspect/scenario/subway/clues/subway-24.png",
    description:
      "킷사샤울 벽에 걸린 자격증. 홍셰프가 복어 손질과 관련된 전문 자격을 보유하고 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 25,
    title: "전사장의 메모",
    x: 35,
    y: 42,
    image: "/image/suspect/scenario/subway/clues/subway-25.png",
    description:
      "A+, A-, B+ 같은 등급 표시가 적혀 있는 전사장의 메모. 누군가를 평가하거나 분류한 흔적처럼 보인다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 26,
    title: "수혈증과 감사 메모",
    x: 43,
    y: 36,
    image: "/image/suspect/scenario/subway/clues/subway-26.png",
    description:
      "4월경 정보건이 전사장의 급성 위출혈 때 수혈을 도왔다는 기록과 감사 메모가 함께 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 27,
    title: "전사장 진단서",
    x: 49,
    y: 43,
    image: "/image/suspect/scenario/subway/clues/subway-27.png",
    description:
      "전사장이 평소 만성 신부전을 앓고 있다는 진단서다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 28,
    title: "친자 불일치 확인서",
    x: 39,
    y: 50,
    image: "/image/suspect/scenario/subway/clues/subway-28.png",
    description:
      "가족 관계를 뒤흔들 수 있는 친자 불일치 확인서다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 29,
    title: "테이크아웃 영수증",
    x: 31,
    y: 58,
    image: "/image/suspect/scenario/subway/clues/subway-29.png",
    description:
      "오늘 오전 홍셰프가 아이스아메리카노를 테이크아웃으로 구매했다는 영수증. 캐리어 포함 주문이었다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 30,
    title: "디카페인 관련 진술",
    x: 34,
    y: 65,
    image: "/image/suspect/scenario/subway/clues/subway-30.png",
    description:
      "정보건은 디카페인을 맛으로 구별할 수 있다고 늘 말해 왔다. 그런데 밤에는 분명 디카페인만 사 갔다는 증언이 있다.",
    type: "additional",
    place: 29,
  },
  {
    id: 31,
    title: "홍셰프 출입 시각",
    x: 78,
    y: 73,
    image: "/image/suspect/scenario/subway/clues/subway-31.png",
    description:
      "홍셰프가 밤 9시 50분에 역사 안으로 들어온 기록이다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 32,
    title: "역학조사 동선 지도",
    x: 61,
    y: 28,
    image: "/image/suspect/scenario/subway/clues/subway-32.png",
    description:
      "서울대입구역에서 보건소까지는 10분, 킷사샤울과 추리스 커피까지는 각각 5분 거리라는 원형 동선 지도가 첨부돼 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 33,
    title: "정보건에게 보낸 부탁",
    x: 54,
    y: 37,
    image: "/image/suspect/scenario/subway/clues/subway-33.png",
    description:
      "전사장이 정보건에게 가까워지려는 시도 또는 부탁을 남긴 기록. 정보건은 이를 명확히 거절했다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 34,
    title: "COURSEMOS 공지사항",
    x: 88,
    y: 42,
    image: "/image/suspect/scenario/subway/clues/subway-34.png",
    description:
      "비대면 중간고사 안내 공지. 하승객의 학교 일정과 사건 당일 동선을 맞춰볼 수 있다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 35,
    title: "정기 송금 내역",
    x: 12,
    y: 56,
    image: "/image/suspect/scenario/subway/clues/subway-35.png",
    description:
      "홍셰프가 매달 정보건에게 100만 원씩 송금한 내역이다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 36,
    title: "자영업 피해 구제 신청서",
    x: 18,
    y: 36,
    image: "/image/suspect/scenario/subway/clues/subway-36.png",
    description:
      "홍셰프가 운영하는 킷사샤울 명의의 자영업 피해 구제 신청서.",
    type: "basic",
    place: "B1",
  },
  {
    id: 37,
    title: "하승객의 지하철 사물함 이용 기록",
    x: 12,
    y: 80,
    image: "/image/suspect/scenario/subway/clues/subway-37.png",
    description:
      "하승객이 역사 내 물품보관함을 반복적으로 이용한 기록. 특정 번호대가 유독 자주 등장한다.",
    type: "basic",
    place: "B2",
  },
  {
    id: 38,
    title: "역학조사 결과 보고서",
    x: 25,
    y: 16,
    image: "/image/suspect/scenario/subway/clues/subway-38.png",
    description:
      "하손님의 개인적인 식품 섭취로 인한 식중독 사례를 정리한 보고서. 독극물 은폐나 책임 전가 가능성을 떠올리게 한다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 39,
    title: "폐업 안내문",
    x: 24,
    y: 45,
    image: "/image/suspect/scenario/subway/clues/subway-39.png",
    description:
      "추리스 커피가 4월 4일부터 폐업 처리됐다는 셔터 안내문. 카페 폐업에는 정보건이 깊게 관여했다는 말이 돈다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 40,
    title: "정보건의 주소 기록",
    x: 41,
    y: 29,
    image: "/image/suspect/scenario/subway/clues/subway-40.png",
    description:
      "정보건의 집은 잠실로 기재돼 있다. 사건 현장과의 거리 계산에 필요한 자료다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 41,
    title: "카페 주문 습관",
    x: 29,
    y: 50,
    image: "/image/suspect/scenario/subway/clues/subway-41.png",
    description:
      "정보건은 늘 카페에서 퇴근 전에 디카페인 커피를 사 갔다는 단골 주문 기록.",
    type: "basic",
    place: "B1",
  },
  {
    id: 42,
    title: "선후배 관계 기록",
    x: 47,
    y: 50,
    image: "/image/suspect/scenario/subway/clues/subway-42.png",
    description:
      "홍셰프와 정보건이 선후배 사이라는 사실을 보여주는 기록이다.",
    type: "basic",
    place: "B1",
  },
  {
    id: 43,
    title: "전공익 사물함 비밀번호",
    x: 58,
    y: 40,
    image: "/image/suspect/scenario/subway/clues/subway-43.png",
    description:
      "전공익 사물함 비밀번호가 하승객의 생일로 설정돼 있다.",
    type: "additional",
    place: 11,
  },
  {
    id: 44,
    title: "개찰구 통과 기록",
    x: 28,
    y: 86,
    image: "/image/suspect/scenario/subway/clues/subway-44.png",
    description:
      "사건 당일 주요 인물들의 개찰구 통과 시각이 찍혀 있다. 지하철 사물함 사용 시점과 함께 보면 동선이 더 선명해진다.",
    type: "additional",
    place: 37,
  },
];
