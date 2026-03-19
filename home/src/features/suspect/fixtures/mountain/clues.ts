import { ClueType } from "@/features/suspect/types";
import { createAdditionalQuestions } from "../utils";

export const mountainAdditionalQuestions = createAdditionalQuestions([
  {
    question: "피해자 추리수는 사건 당일 왜 청룡산에 올라갔나요?",
    answer:
      "피해자는 용의자들과 함께 청룡산 정상 부근에서 만나기로 했고, 그 약속 때문에 혼자 먼저 청룡산에 올라갔습니다.",
  },
  {
    question: "표지판이 왜 중요한 단서인가요?",
    answer:
      "표지판의 위치가 뒤바뀌어 있었고, 그 때문에 각 인물이 실제로 이동할 수 있었던 시간과 동선이 완전히 달라집니다.",
  },
  {
    question: "천람석이 단순한 등산객이 아니라고 볼 근거는 무엇인가요?",
    answer:
      "천람석의 가방에서 피가 묻은 채광 도구와 청금석이 대량으로 발견됐고, 스마트폰에는 번개암터 접속 기록도 남아 있었습니다.",
  },
]);

export const mountainClues: ClueType[] = [
  {
    id: 1,
    title: "표지판 부근 청룡산 지도",
    x: 31,
    y: 62,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "청룡산 입구 표지판 옆에 부착된 등산 안내 지도다. 각 지점 사이 거리와 예상 이동 시간이 적혀 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 2,
    title: "표지판 옆 위험 안내문",
    x: 47,
    y: 66,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "표지판과 추러스 가게 사이 구간에 설치된 안내문이다. 이 구간을 뛰면 목숨이 매우 위험하다고 적혀 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 3,
    title: "추리수의 시체",
    x: 69,
    y: 60,
    image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
    description:
      "청룡산 절벽 아래에서 발견된 추리수의 시체다. 외관상 단순 실족으로 보기 어려운 흔적이 보인다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 4,
    title: "청룡산 절벽 위 현장",
    x: 63,
    y: 40,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "절벽 위 현장이다. 현장 바닥과 주변 수풀 상태가 자연 추락과는 다르게 어수선하다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 5,
    title: "천람석의 스마트폰",
    x: 26,
    y: 39,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 스마트폰이다. 경찰서 부근 장소에서 확보됐다. 내부에 여러 사진과 접속 기록이 남아 있다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 6,
    title: "송채린의 스마트폰",
    x: 18,
    y: 56,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린의 스마트폰이다. 번역 기록, 블로그 기록, 개인 이력이 남아 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 7,
    title: "추러스 가게 CCTV",
    x: 40,
    y: 49,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "산 입구 추러스 가게 CCTV 영상이다. 여러 인물의 도착 및 이동 시점이 찍혀 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 8,
    title: "바뀐 표지판",
    x: 58,
    y: 54,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "청룡산 입구 표지판의 방향 표기가 서로 뒤바뀌어 있다. 누군가 오늘 손댄 흔적처럼 보인다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 9,
    title: "최령신의 주머니",
    x: 74,
    y: 51,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "최령신의 주머니에서 나온 소지품이다. 안에 눈에 띄는 장신구가 들어 있다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 10,
    title: "신청지 신당 입구",
    x: 82,
    y: 34,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "신청지 신당의 입구 사진이다. 외형과 내부 장식이 일반적인 등산로 시설과 전혀 다르다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 11,
    title: "최령신의 스마트폰",
    x: 52,
    y: 33,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "최령신의 스마트폰이다. 특정 색과 종교적 내용에 집착한 흔적이 보인다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 12,
    title: "청금석 단속 자료",
    x: 37,
    y: 30,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "관악경찰서에서 정리한 청금석 불법 거래 단속 자료다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 13,
    title: "천람석의 가방",
    x: 19,
    y: 28,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 가방이다. 겉면과 내부 모두 수상한 흔적이 남아 있다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 14,
    title: "신청지 포교 활동 주의 안내서",
    x: 9,
    y: 37,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "경찰서에서 배포한 서울대입구역 부근 신청지 포교 활동 주의 안내서다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 15,
    title: "청룡산 절벽 경고 표지판",
    x: 76,
    y: 23,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "절벽 근처에 세워진 실족주의 표지판이다. 지형이 매우 위험하다는 점이 강조돼 있다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 16,
    title: "차림솔의 스마트폰",
    x: 12,
    y: 71,
    image: "/image/suspect/scenario/mountain/profile/rs_cha.png",
    description:
      "차림솔의 스마트폰이다. 추리수와의 과거 연락, 가계정 기록, 녹음 파일이 남아 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 17,
    title: "추리수의 스마트폰",
    x: 86,
    y: 58,
    image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
    description:
      "추리수의 스마트폰이다. 차단 목록과 MT 참석 관련 기록이 확인된다.",
    type: "basic",
    place: "intersection",
  },
  {
    id: 18,
    title: "송채린의 가방",
    x: 25,
    y: 78,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린의 가방이다. 내부에서 위험한 물건이 발견된다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 19,
    title: "송채린의 손목",
    x: 35,
    y: 82,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린의 손목에는 오래된 상처 흔적이 남아 있다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 20,
    title: "MT 장소 관리자 증언",
    x: 54,
    y: 80,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "MT 장소 관리자가 사건 당일 출발 순서와 인물들의 부재 시간을 증언했다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 21,
    title: "추러스 가게 영업시간 안내",
    x: 69,
    y: 74,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "추러스 가게 출입문에 붙은 영업시간 안내문이다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 22,
    title: "청룡산 통신 음영 지역 안내",
    x: 81,
    y: 69,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "청룡산 전체에는 휴대전화 전파가 잘 터지지 않는다는 안내문이다.",
    type: "basic",
    place: "cafe",
  },
  {
    id: 23,
    title: "시체의 밀쳐진 자국",
    x: 17,
    y: 28,
    image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
    description:
      "시체의 몸에는 강하게 손으로 밀쳐진 듯한 자국이 남아 있다. 단순 실족보다는 타인 개입 가능성을 시사한다.",
    type: "additional",
    place: 3,
  },
  {
    id: 24,
    title: "부러진 나뭇가지",
    x: 18,
    y: 27,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "절벽 위 수풀의 나뭇가지들이 여러 개 부러져 있다. 누군가 격하게 부딪히며 지나간 흔적처럼 보인다.",
    type: "additional",
    place: 4,
  },
  {
    id: 25,
    title: "발자국과 쓸린 흔적",
    x: 22,
    y: 36,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "절벽 위 바닥에는 발자국이 여러 개 찍혀 있고 흙이 쓸린 자국도 남아 있다. 몸싸움 정황을 뒷받침한다.",
    type: "additional",
    place: 4,
  },
  {
    id: 26,
    title: "갤러리 사진: 5분",
    x: 16,
    y: 24,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 스마트폰 갤러리에 저장된 5분 사진이다. 등산 중 특정 지점을 의식적으로 촬영한 것으로 보인다.",
    type: "additional",
    place: 5,
  },
  {
    id: 27,
    title: "갤러리 사진: 30분",
    x: 21,
    y: 31,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 스마트폰 갤러리에 저장된 30분 사진이다. 같은 날 연속적으로 현장을 기록하고 있다.",
    type: "additional",
    place: 5,
  },
  {
    id: 28,
    title: "갤러리 사진: 34분",
    x: 26,
    y: 38,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 스마트폰 갤러리에 저장된 34분 사진이다. 현장 변화 직전 상황을 담고 있다.",
    type: "additional",
    place: 5,
  },
  {
    id: 29,
    title: "갤러리 사진: 36분",
    x: 31,
    y: 45,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "36분 사진에는 원래 가방 위치에 있던 자리에 시체가 보인다. 사건 시점 추정에 중요한 기준이 된다.",
    type: "additional",
    place: 5,
  },
  {
    id: 30,
    title: "번개암터 접속 기록",
    x: 36,
    y: 52,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 스마트폰 인터넷 기록이다. 번개암터에 접속한 흔적이 남아 있다.",
    type: "additional",
    place: 5,
  },
  {
    id: 31,
    title: "파파고 번역 기록",
    x: 15,
    y: 26,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린의 스마트폰 파파고 기록이다. 오후 7시 30분에 바뀐 표지판 내용을 번역한 흔적이 있다.",
    type: "additional",
    place: 6,
  },
  {
    id: 32,
    title: "블로그 기록",
    x: 20,
    y: 33,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린의 블로그 기록이다. 캐나다에서 왔다는 정보와 누군가를 졸라 이 자리에 오게 됐다는 내용이 적혀 있다.",
    type: "additional",
    place: 6,
  },
  {
    id: 33,
    title: "출석 공백 기록",
    x: 25,
    y: 40,
    image: "/image/suspect/scenario/mountain/profile/cr_song.png",
    description:
      "송채린이 2022년 4월 이후 수업에 거의 가지 않았다는 정황 자료다.",
    type: "additional",
    place: 6,
  },
  {
    id: 34,
    title: "CCTV: 송채린 8시 도착",
    x: 16,
    y: 24,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "추러스 가게 CCTV에는 송채린이 오후 8시에 도착하는 장면이 찍혀 있다.",
    type: "additional",
    place: 7,
  },
  {
    id: 35,
    title: "CCTV: 최령신 8시 2분 도착",
    x: 21,
    y: 31,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "추러스 가게 CCTV에는 최령신이 오후 8시 2분에 도착하는 장면이 찍혀 있다.",
    type: "additional",
    place: 7,
  },
  {
    id: 36,
    title: "CCTV: 차림솔 이동",
    x: 26,
    y: 38,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "차림솔은 오후 6시 45분에 출발하여 7시 50분에 복귀한 모습이 찍혀 있다.",
    type: "additional",
    place: 7,
  },
  {
    id: 37,
    title: "CCTV: 천람석 8시 5분 출구",
    x: 31,
    y: 45,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "천람석이 오후 8시 5분에 출구로 나오는 장면이 찍혀 있다.",
    type: "additional",
    place: 7,
  },
  {
    id: 38,
    title: "표지판 조작 흔적",
    x: 17,
    y: 28,
    image: "/image/suspect/scenario/mountain/map/mountain-cafe.png",
    description:
      "표지판 고정 부위가 새로 풀렸다가 다시 조여진 흔적이 남아 있다. 오늘 인위적으로 방향이 바뀌었다는 근거가 된다.",
    type: "additional",
    place: 8,
  },
  {
    id: 39,
    title: "사인이 적힌 키링",
    x: 18,
    y: 28,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "최령신의 사인이 적힌 미니 키링이다. 갈색빛의 신당 입구 모양이 새겨져 있다.",
    type: "additional",
    place: 9,
  },
  {
    id: 40,
    title: "동굴처럼 생긴 입구",
    x: 17,
    y: 26,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "신당 입구는 경찰서 쪽에서 보면 동굴처럼 생겨 있다. 일반적인 종교 시설 안내와는 상당히 이질적이다.",
    type: "additional",
    place: 10,
  },
  {
    id: 41,
    title: "청록색과 7월 강조",
    x: 22,
    y: 33,
    image: "/image/suspect/scenario/mountain/map/mountain-intersection.png",
    description:
      "신당 내부 안내와 종교 물품은 유독 청록색과 7월을 강조하고 있다. 날짜 표기도 모두 7월로 고정돼 있다.",
    type: "additional",
    place: 10,
  },
  {
    id: 42,
    title: "청록색 스크랩",
    x: 17,
    y: 25,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "최령신의 스마트폰에 저장된 스크랩이다. 청록색과 관련된 이미지와 문구가 반복적으로 모여 있다.",
    type: "additional",
    place: 11,
  },
  {
    id: 43,
    title: "2020년 욕설 기록",
    x: 22,
    y: 32,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "다른 신도가 최령신에게 불경하다며 욕을 한 2020년 기록이다. 종교 내부 갈등을 짐작하게 한다.",
    type: "additional",
    place: 11,
  },
  {
    id: 44,
    title: "청룡신 제물 관련 글",
    x: 27,
    y: 39,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "제물을 바치면 청룡신이 소원을 들어준다는 내용의 글이다.",
    type: "additional",
    place: 11,
  },
  {
    id: 45,
    title: "망설이는 메모",
    x: 32,
    y: 46,
    image: "/image/suspect/scenario/mountain/profile/rs_choi.png",
    description:
      "최령신이 실제로 제물을 바칠지 망설이는 듯한 메모가 남아 있다.",
    type: "additional",
    place: 11,
  },
  {
    id: 46,
    title: "가방 겉면의 혈흔",
    x: 18,
    y: 25,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "천람석의 가방 겉면에는 눈에 띄는 혈흔이 묻어 있다.",
    type: "additional",
    place: 13,
  },
  {
    id: 47,
    title: "가방 속 청금석과 채광 도구",
    x: 23,
    y: 32,
    image: "/image/suspect/scenario/mountain/profile/rs_cheon.png",
    description:
      "가방 안에는 청금석이 가득 들어 있고 채광 도구도 다수 들어 있다. 천람석이 단순 방문객이 아니었음을 보여 준다.",
    type: "additional",
    place: 13,
  },
  {
    id: 48,
    title: "추리수 스마트폰 기록",
    x: 17,
    y: 26,
    image: "/image/suspect/scenario/mountain/profile/rs_chu.png",
    description:
      "추리수의 스마트폰에는 차림솔과 송채린의 전화 차단 기록, 그리고 MT 참석 투표 기록이 함께 남아 있다.",
    type: "additional",
    place: 17,
  },
];
