import type { InterrogationQuestion } from "@/types";

const combinations: Record<number, string[]> = {
  1: ["phase-4::body", "phase-4::evidence-b89b8208"],
  2: ["phase-4::evidence-6810b6b5", "phase-3::notice"],
  3: ["phase-4::forecast-original", "phase-1::evidence-aec28b2a", "phase-4::director-note"],
  4: ["phase-4::door-log", "phase-4::evidence-560e89ff"],
  5: ["phase-4::badge-a", "phase-4::evidence-a20cd9ba", "phase-4::forecast-original"],
  6: ["phase-4::evidence-bebfe84a", "phase-4::evidence-a20cd9ba", "phase-4::evidence-560e89ff"],
  7: ["phase-1::schedule", "phase-4::pill-log"],
  8: ["phase-4::evidence-0b93f6fb", "phase-4::evidence-9e01afc2", "phase-3::ledger-b"],
  9: ["phase-1::footage", "phase-4::evidence-560e89ff", "phase-4::evidence-a0669973"],
};

function question(number: number, person: "A" | "B" | "C", answer: string): InterrogationQuestion {
  return {
    id: `final-interrogation-combination-${number}-${person.toLowerCase()}`,
    evidenceIds: combinations[number],
    answer: [{ speaker: `실험체 ${person}`, text: answer }],
  };
}

export const psychicFinalQuestions: Record<"A" | "B" | "C", InterrogationQuestion[]> = {
  A: [
    question(1, "A", "소장이 알약을 두 번 먹었다는 거야? 근데 그걸 왜 먹었겠어? 실수로 먹었을 수도 있잖아."),
    question(2, "A", "차는 내가 준비했어. 그런데 알약이 하나 없어졌다고 내가 넣었다는 증거는 없잖아. 짜장면에 들어갔을 수도 있고."),
    question(3, "A", "뭐? B가 무조건 이기는 능력이었다고? 어쩐지 한 번도 안 지더라. 야, 그럼 나랑 C만 계속 설거지한 거잖아!"),
    question(4, "A", "밤 11시 30분에 누가 소장실에 들어갔다고? 그 시간에 굳이 들어갈 일이 있었나? 난 모르겠는데."),
    question(5, "A", "그럼 욕조의 피가 C의 능력으로 만들어졌다는 거야? 하긴, 그 많은 피가 사람 한 명한테서 나왔을 리는 없지."),
    question(6, "A", "누가 시체를 캐비닛에 숨겨놨다고? 근데 그걸 또 굳이 욕조로 옮겼다는 거야? 참 이상한 짓을 했네."),
    question(7, "A", "그래, 돈이 급했어. 그래서 여기 들어온 거고. 근데 3년 동안 월급도 제대로 안 주고 짜장면만 먹이잖아. 불만이 없겠냐고."),
    question(8, "A", "B가 열쇠를 훔쳤다고? 그러고 보니 저녁에 화장실 간다면서 안 돌아왔잖아. 소장실에서 대체 뭘 한 거야?"),
    question(9, "A", "소장한테 딸이 있었다고? 그럼 이 연구소에도 있는 거야? 나는 처음 듣는 얘긴데."),
  ],
  B: [
    question(1, "B", "잠깐, 그럼 손목 때문에 죽은 게 아니야? 누가 약을 먹였을 수도 있겠네. 근데 소장도 그 위험성은 알고 있었을 텐데?"),
    question(2, "B", "차? 난 저녁에 없었잖아. 누가 준비했는지도 몰라. 근데 소장한테만 먹이려면 차가 확실하긴 하겠다."),
    question(3, "B", "아하하, 들켰네. 맞아, 내 능력이 그거야. 솔직히 별 쓸모없는 능력인데, 설거지할 때는 진짜 좋더라고."),
    question(4, "B", "10년 전 사건? 아, 그거... 나도 조금 알아."),
    question(5, "B", "잠깐, 그러면 C가 피를 소환한 거야? ...C한테 그런 능력이 있었구나. 근데 왜 그런 짓을 했을까?"),
    question(6, "B", "10년 전이랑 똑같은 모습이잖아. 이 정도면 누가 일부러 따라 했다고 봐야겠는데? ...C가 예전에 했던 말이 생각나네."),
    question(7, "B", "A가 돈 때문에 고생하는 건 알았는데, 대출까지 받으려고 했구나. 하긴, 수당을 그렇게 밀리는데 누가 안 힘들겠어."),
    question(8, "B", "아, 젠장. 여기까지 알아냈으면 어쩔 수 없네. 맞아, 나 다른 연구소에서 왔어. 약물 제조 기술 좀 알아내려고 했지. 근데 자료는 하나도 못 찾았다고. 그리고 소장을 죽이지도 않았어."),
    question(9, "B", "유기체 씨가 C의 어머니야. C가 그 일로 얼마나 힘들어했는지 나도 알아. 그래서 자료를 발견하고 그냥 모른 척할 수가 없었어."),
  ],
  C: [
    question(1, "C", "아버지가 약물 중독으로 돌아가셨다고요? 이상하네요. 그럼 손목의 상처는 어떻게 설명하실 건데요?"),
    question(2, "C", "소장님은 원래 식사할 때 차를 자주 드셨어요. 설마 그 차에 약이 들어있었던 건가요?"),
    question(3, "C", "잠깐만요. 그러면 지금까지 저랑 A만 설거지를 한 게 우연이 아니었다는 거네요? 하... B씨, 아주 대단한 능력을 얻으셨네요."),
    question(6, "C", "...네. 제가 옮겼어요. 소장님은 제가 발견했을 때 이미 돌아가신 상태였고요. 어머니에게 했던 짓을 똑같이 돌려주고 싶었어요. 제 행동이 잘못됐다는 건 알아요. 하지만 ..."),
    question(7, "C", "A씨가 그렇게 돈이 급하신 줄은 몰랐네요. 수당이 밀리는 건 저도 알고 있었지만... 아버지도 참, 이런 문제는 좀 제대로 처리하시지."),
    question(8, "C", "B씨가 산업스파이라고요? ...참나, 저한테는 그런 얘기 한 번도 안 하더니. 친한 사이라고 생각했는데, 조금 서운하네요."),
    question(9, "C", "맞아요. 김짜장은 제 아버지고, 유기체는 제 어머니예요. 어머니의 시체를 처음 발견한 사람도 저였어요. 아버지는 지난 10년 동안 저를 속이셨고요. ...그동안 제가 얼마나 바보 같았는지 아세요?"),
  ],
};
