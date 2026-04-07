export interface MiddleRaceCharacterType {
  id: string;
  label: string;
  name: string;
  priority: number;
  ability: string;
  color: string;
  imageSrc: string;
}

export const MIDDLE_RACE_COMMON_RULES = [
  "다른 플레이어를 지목하는 능력은 연속으로 같은 플레이어에게 사용할 수 없다.",
  "골인 지점을 통과한 플레이어는 특수능력을 잃고 더 이상 지목의 대상이 될 수 없다.",
  "한 능력으로 여러 말이 이동할 경우 캐릭터 번호가 빠른 순서대로 이동하며, 그 과정에서 새 능력이 발동되면 먼저 처리한다.",
  "푸시와 유니온은 스타트 라인에서는 발동하지 않는다.",
  "위드로 동시에 골인하면 이동 전 골인지점에 더 가까웠던 캐릭터가 먼저 들어오며, 같은 칸이었다면 캐릭터 번호가 더 빠른 캐릭터가 먼저 들어온다.",
] as const;

export const MIDDLE_RACE_CHARACTERS: MiddleRaceCharacterType[] = [
  {
    id: "gravity",
    label: "그래비티",
    name: "Gravity",
    priority: 1,
    ability:
      "자신의 순서에 이동카드 1장을 버려서 공개하고 이동을 포기한 뒤, 1명을 지목한다. 그 플레이어가 자신의 앞에 있을 경우 자신의 1칸 앞으로, 뒤에 있을 경우 자신의 1칸 뒤로 당겨온다.",
    color: "#A649A0",
    imageSrc: "/image/middle-race/characters/gravity.png",
  },
  {
    id: "reset",
    label: "리셋",
    name: "Reset",
    priority: 2,
    ability:
      "자신의 말이 뒤로 이동할 때마다 다른 플레이어 1명(본인 제외)을 지목하여 이동카드를 리셋시킨다.",
    color: "#592A1A",
    imageSrc: "/image/middle-race/characters/reset.png",
  },
  {
    id: "push",
    label: "푸시",
    name: "Push",
    priority: 3,
    ability: "다른 캐릭터와 같은 칸에 있게 될 경우 1칸 앞이나 뒤로 선택하여 밀어낸다.",
    color: "#4D4E14",
    imageSrc: "/image/middle-race/characters/push.png",
  },
  {
    id: "delete",
    label: "딜리트",
    name: "Delete",
    priority: 4,
    ability:
      "다른 캐릭터의 특수능력에 의해 자신이 이동하면 다른 플레이어 중 1명을 선택하여 해당 플레이어의 이동카드를 본인만 확인한 뒤, 1장만 남기고 모두 없앤다. 이미 카드를 한 장밖에 가지고 있지 않은 플레이어에게도 사용할 수 있지만 아무 일도 일어나지 않는다.",
    color: "#A20E0E",
    imageSrc: "/image/middle-race/characters/delete.png",
  },
  {
    id: "with",
    label: "위드",
    name: "With",
    priority: 5,
    ability:
      "마지막 남은 이동카드 1장을 사용할 때 다른 플레이어 중 1명을 지목하여 자신이 이동하는 만큼 함께 이동한다.",
    color: "#B32501",
    imageSrc: "/image/middle-race/characters/with.png",
  },
  {
    id: "union",
    label: "유니온",
    name: "Union",
    priority: 6,
    ability:
      "자신의 1칸 앞쪽에 있는 플레이어를 모두 자기 칸으로 끌어들인다. 단, 유니온과 푸시의 능력의 조건이 동시에 충족될 경우 푸시의 능력이 먼저 발동한다.",
    color: "#DE8300",
    imageSrc: "/image/middle-race/characters/union.png",
  },
  {
    id: "one",
    label: "원",
    name: "One",
    priority: 7,
    ability:
      "다른 플레이어가 1을 사용할 경우, 그 즉시 1칸 앞이나 뒤로 이동한다. 1을 사용한 플레이어는 원이 움직인 뒤에 이동한다. 단, 그래비티가 1카드를 버리고 특수능력을 사용한 경우는 이에 해당되지 않는다.",
    color: "#214B1B",
    imageSrc: "/image/middle-race/characters/one.png",
  },
  {
    id: "mirror",
    label: "미러",
    name: "Mirror",
    priority: 8,
    ability:
      "자신이 다른 캐릭터의 특수능력에 의해 이동될 경우, 다른 플레이어 1명을 지목해 같은 수만큼 반대 방향으로 이동시킨다.",
    color: "#590356",
    imageSrc: "/image/middle-race/characters/mirror.png",
  },
  {
    id: "jump",
    label: "점프",
    name: "Jump",
    priority: 9,
    ability:
      "자신의 이동카드로 움직일 때 다른 플레이어가 있는 칸은 건너뛴다. 또한 0~4까지 5장의 이동카드를 사용하며 이동카드가 2장일 때도 리셋할 수 있다. 단, 이동카드가 1장일 땐 리셋할 수 없다.",
    color: "#206163",
    imageSrc: "/image/middle-race/characters/jump.png",
  },
  {
    id: "silence",
    label: "사일런스",
    name: "Silence",
    priority: 10,
    ability:
      "자신의 턴에 이동카드를 제출하기 전, 1명을 지목해 다음 사일런스의 턴이 돌아올 때까지 해당 플레이어의 능력을 무력화시킨다. 새로 1명을 지목한 순간부터 기존에 무력화된 캐릭터는 능력이 다시 발동된다.",
    color: "#3B2E9F",
    imageSrc: "/image/middle-race/characters/silence.png",
  },
  {
    id: "quick",
    label: "퀵",
    name: "Quick",
    priority: 11,
    ability:
      "모든 이동카드를 2배수로 사용할 수 있다. 단, 이동카드 4장 중 최대 2장까지만 앞으로 가는데 사용할 수 있으며, 나머지 카드들은 뒤로 가는 데 사용된다. 사일런스에 의해 무력화된 경우 무조건 앞으로만 이동해야 하며, 이때 사용된 카드도 앞으로 가는 데 사용한 카드로 계산된다.",
    color: "#010661",
    imageSrc: "/image/middle-race/characters/quick.png",
  },
];
