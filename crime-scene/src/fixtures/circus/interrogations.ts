import type { ClueInterrogation } from "@/types";

export const circusInterrogations: ClueInterrogation[] = [
  {
    id: "rody-1",
    suspectName: "로디",
    prompt: "인간 생체 실험을 진행 중이다.",
    requiredReferenceIds: ["20-a", "20-b"],
    result: {
      referenceId: "52",
      title: "로디의 진술 1",
      description:
        "저는 몰래 인간들을 이용해 연구를 진행 중이었습니다. 쓸모없는 것들을 이렇게라도 써주겠다는데 무슨 문제라도 있습니까? 가끔 실패해서 폐기물이 탄생하긴 하지만 뭐 대체로 재밌는 결과가 많이 나오죠.",
    },
  },
  {
    id: "rody-2",
    suspectName: "로디",
    prompt: "이상식욕을 가지고 있다.",
    requiredReferenceIds: ["12", "27", "56"],
    result: {
      referenceId: "53",
      title: "로디의 진술 2",
      description:
        "그렇습니다. 저는 수인 고기를 먹는 것을 좋아합니다. 한 번 먹기 시작한 후로 그 쫄깃하고 야들한 식감을 잊을 수가 없더군요. 관심 있으면 연락 주시죠. 흐흐흐..",
    },
  },
  {
    id: "trixie-1",
    suspectName: "트릭시",
    prompt: "토끼굴을 통해 서커스에 무단 침입하였다.",
    requiredReferenceIds: ["25", "29"],
    result: {
      referenceId: "54",
      title: "트릭시의 진술 1",
      description:
        "네. 저는 이 서커스에 몰래 들어왔어요. 이런 역겨운 공연에 제 돈 한 푼도 쓰기 아까운 걸요? 어디서 표를 구하는지도 잘 모르겠고…",
    },
  },
  {
    id: "trixie-2",
    suspectName: "트릭시",
    prompt: "단장에게 입막음의 대가로 돈을 받았다.",
    requiredReferenceIds: ["21", "33-a"],
    result: {
      referenceId: "55",
      title: "트릭시의 진술 2",
      description:
        "이 돈이 어디서 났냐구요? 어… 그게… 네? 제대로 얘기 안 하면 체포하겠다구요?? 이건 말이죠 어… 단장 자식이 돈으로 저를 회유하려 하길래 일단 받는 척하고 이 서커스 밖으로 빠져나온 다음에 공론화하려고 했죠! …혹시 뺏어갈 생각은 아니시죠?",
    },
  },
  {
    id: "trixie-3",
    suspectName: "트릭시",
    prompt: "로디가 수인을 뜯어먹은 이후의 모습을 포착했다.",
    requiredReferenceIds: ["34"],
    result: {
      referenceId: "56",
      title: "트릭시의 진술 3",
      description:
        "으… 정말 무서운 광경이었어요. 저 여우 놈이 헝클어진 모습으로 입에 피를 잔뜩 묻히고 서 있던 거 있죠?! 제가 한 마디 하려다가 급한 일이 있어서.. 제가 말했다는 말은 하지 말아주세요!",
    },
  },
  {
    id: "reynold-1",
    suspectName: "레이놀드",
    prompt:
      "메모장에 적힌 동물들이 실종되거나 사고사 처리된 서커스 직원들임을 알고 있다.",
    requiredReferenceIds: ["8-a", "19"],
    result: {
      referenceId: "57",
      title: "레이놀드의 진술 1",
      description:
        "여기 적힌 동물들은 전부 실종되거나 사고사 처리된 서커스 직원들입니다. 정황상 여기 적힌 ‘사자’는 저일 겁니다. 단장님이 저를 죽이려 한 것 아니냐고요? 무슨 말씀을! 단장님이 그러실 리 없습니다.",
    },
  },
  {
    id: "boss-1",
    suspectName: "빅 보스",
    prompt: "서커스에 자금을 투자하고 ‘인간 처형식’을 요구하였다.",
    requiredReferenceIds: ["4-c", "8-b"],
    result: {
      referenceId: "58",
      title: "보스의 진술 1",
      description:
        "그래. 내가 이 이벤트를 계획했지. 인간을 매달기로 했는데 말이야.. 설마 자신이 이 이벤트의 주인공이 될 생각을 할 줄이야 까까까까!",
    },
  },
  {
    id: "boss-2",
    suspectName: "빅 보스",
    prompt: "인간이 고통받는 모습에서 아름다움을 느낀다.",
    requiredReferenceIds: ["4-d", "58"],
    result: {
      referenceId: "59",
      title: "보스의 진술 2",
      description:
        "왜 이런 끔찍한 이벤트를 생각해냈냐고? 끔찍? 저게? 네놈은 저 아름다움을 느끼지 못하는겐가?",
    },
  },
];
