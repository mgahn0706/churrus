import type { ClueType } from "@/types";
import { createAdditionalQuestions } from "../utils";

export const circusAdditionalQuestions = createAdditionalQuestions([]);

const clueImage = "/image/scenario/circus/clues";

export const circusClues: ClueType[] = [
  {
    id: 1, title: "객석 카메라", x: 13, y: 30, image: `${clueImage}/camera.svg`,
    description: "8시 10분부터 20분까지 촬영된 리허설 영상이다. 윤마술과 서곡예가 무대 위에서 계속 연습하는 모습이 끊김 없이 보인다.",
    type: "basic", place: "ring",
  },
  {
    id: 2, title: "리허설 일정표", x: 37, y: 19, image: `${clueImage}/document.svg`,
    description: "8시 10분부터 20분까지 윤마술과 서곡예의 합동 리허설, 같은 시간 조명실의 실시간 조명 점검이 예정되어 있다.",
    type: "basic", place: "ring",
  },
  {
    id: 3, title: "조명실 기록", x: 67, y: 31, image: `${clueImage}/document.svg`,
    description: "8시 11분, 14분, 18분에 오조명이 조명 큐를 직접 조정한 기록이 있다. 조명실 출입 기록과 동료의 증언도 그가 8시 10분부터 20분까지 안에 있었음을 확인한다.",
    type: "basic", place: "ring",
  },
  {
    id: 4, title: "단장의 사무 공간", x: 17, y: 25, image: `${clueImage}/scene.svg`,
    description: "강단장이 이곳에서 숨진 채 발견되었다. 조사 결과 사건은 밤 8시 10분부터 20분 사이에 벌어진 것으로 추정된다. 책상에는 현금 정산표가 펼쳐져 있다.",
    type: "basic", place: "backstage",
  },
  {
    id: 5, title: "정산표 원본", x: 18, y: 42, image: `${clueImage}/document.svg`,
    description: "입장권 현금 매출의 합계가 보관함에 남은 금액과 맞지 않는다. 해당 날짜의 정산 담당자는 한매표다.",
    type: "additional", place: 4,
  },
  {
    id: 6, title: "단장의 메모", x: 18, y: 58, image: `${clueImage}/document.svg`,
    description: "‘한매표, 8시 10분에 원본 들고 사무실로. 현금 내역을 오늘 확인할 것.’이라는 단장의 필기다.",
    type: "additional", place: 4,
  },
  {
    id: 7, title: "무대 뒤 출입 기록", x: 48, y: 26, image: `${clueImage}/document.svg`,
    description: "한매표의 출입 카드가 8시 12분 무대 뒤 출입문에서 사용되고 8시 21분에 다시 사용되었다. 리허설 동안 무대 뒤에 가지 않았다는 진술과 어긋난다.",
    type: "basic", place: "backstage",
  },
  {
    id: 8, title: "매표소 집계표", x: 69, y: 39, image: `${clueImage}/document.svg`,
    description: "한매표가 작성한 집계표의 일부 현금 매출 항목이 정산표 원본과 다르다. 수정 시각은 그날 오후 7시 58분이다.",
    type: "basic", place: "backstage",
  },
  {
    id: 9, title: "무대 뒤 복도 카메라", x: 52, y: 57, image: `${clueImage}/camera.svg`,
    description: "복도 영상에는 한매표가 8시 12분 단장의 사무 공간에 들어갔다가 8시 20분에 나오는 모습이 보인다. 그 사이 다른 사람은 드나들지 않았다.",
    type: "basic", place: "backstage",
  },
];
