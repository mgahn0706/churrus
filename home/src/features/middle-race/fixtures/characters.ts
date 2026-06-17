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
  "골인 지점을 통과하는 순간 해당 플레이어의 특수능력이 사라지며, 통과한 플레이어는 지목의 대상이 될 수 없다.",
  "특수능력에 의해 여러 개의 말이 이동해야 할 경우 캐릭터 번호순으로 이동하며, 그로 인해 또 다른 특수능력이 발휘될 경우 이를 처리한 뒤 다음 순서로 넘어간다.",
  "유니온과 푸시의 능력 조건이 동시에 충족될 경우 푸시의 능력이 먼저 발동한다.",
  "푸시와 유니온은 스타트 라인에 있을 때 특수능력이 발휘되지 않는다.",
  "위드의 특수능력에 의해 동시에 골인지점을 통과했을 경우 이동 전 골인지점에 더 가까이 있었던 캐릭터가 먼저 들어온 것으로 인정한다. 같은 칸에서 이동했을 경우 캐릭터 번호가 앞 번호인 플레이어가 먼저 들어온 것으로 인정한다.",
  "다른 캐릭터의 능력을 복사하여 사용 중인 카피를 사일런스가 무력화할 경우, 무력화가 풀릴 때 해당 능력으로 돌아가지 않는다. 즉, 복사한 능력이 없는 카피로 돌아간다.",
  "카피가 누군가의 능력을 복사할 때 해당 캐릭터의 순서와 번호까지 복사되는 것은 아니다.",
  "카피가 복사한 특정 캐릭터가 사일런스에게 공격당했을 때 카피는 이미 해당 능력을 복사해 놓은 상태이기 때문에 복사한 능력이 같이 무력화되지는 않는다.",
  "카피가 복사한 캐릭터가 골인 지점을 통과해도 이미 복사한 특수능력은 사라지지 않는다.",
  "카피는 사일런스에게 공격당해 무력화된 캐릭터의 특수능력을 복사해 사용할 수 없다.",
] as const;

export const MIDDLE_RACE_CHARACTERS: MiddleRaceCharacterType[] = [
  {
    id: "gravity",
    label: "그래비티",
    name: "Gravity",
    priority: 1,
    ability:
      "자신의 순서에 이동카드 1장을 버리고 이동을 포기하면 1명을 지목해 해당 플레이어가 자신의 앞에 있을 경우 자신의 1칸 앞, 뒤에 있을 경우 자신의 1칸 뒤로 당겨올 수 있다. 버린 이동카드는 공개된다.",
    color: "#A649A0",
    imageSrc: "/image/middle-race/characters/gravity.png",
  },
  {
    id: "push",
    label: "푸시",
    name: "Push",
    priority: 2,
    ability: "다른 캐릭터와 같은 칸에 있게 될 경우 1칸 앞이나 뒤로 선택하여 밀어낸다.",
    color: "#4D4E14",
    imageSrc: "/image/middle-race/characters/push.png",
  },
  {
    id: "delete",
    label: "딜리트",
    name: "Delete",
    priority: 3,
    ability:
      "다른 캐릭터의 특수능력에 의해 자신이 이동하면 다른 플레이어 중 1명을 선택하여 해당 플레이어의 이동카드를 본인만 확인한 뒤, 1장만 남기고 모두 없앤다.",
    color: "#A20E0E",
    imageSrc: "/image/middle-race/characters/delete.png",
  },
  {
    id: "offer",
    label: "오퍼",
    name: "Offer",
    priority: 4,
    ability:
      "자신의 카드가 리셋될 때마다 이동카드 4장 중 1장을 선택하여 다른 플레이어에게 준다.",
    color: "#C36A1D",
    imageSrc: "/image/middle-race/characters/offer.png",
  },
  {
    id: "with",
    label: "위드",
    name: "With",
    priority: 5,
    ability:
      "남은 이동카드가 1장일 때 다른 플레이어 중 1명을 지목하여 남은 카드의 숫자만큼 함께 이동한다.",
    color: "#B32501",
    imageSrc: "/image/middle-race/characters/with.png",
  },
  {
    id: "union",
    label: "유니온",
    name: "Union",
    priority: 6,
    ability:
      "자신의 1칸 앞쪽에 있는 플레이어를 모두 자기 칸으로 끌어들일 수 있다. 선택적으로 능력을 사용할 수 있다.",
    color: "#DE8300",
    imageSrc: "/image/middle-race/characters/union.png",
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
    id: "one",
    label: "원",
    name: "One",
    priority: 7,
    ability:
      "다른 플레이어가 1을 사용할 경우, 그 즉시 1칸 앞이나 뒤로 이동한다. 1을 사용한 플레이어는 원이 유니온과 푸시의 능력을 포함하여 움직인 뒤에 이동한다. 단, 그래비티가 1카드를 버리고 특수능력을 사용한 경우는 이에 해당되지 않는다.",
    color: "#214B1B",
    imageSrc: "/image/middle-race/characters/one.png",
  },
  {
    id: "copy",
    label: "카피",
    name: "Copy",
    priority: 10,
    ability:
      "자신의 카드가 리셋될 때마다 다른 플레이어 1명을 지목해 해당 플레이어의 특수능력을 복사하여 자신의 것으로 만들고 다음 리셋 때까지 사용한다.",
    color: "#206163",
    imageSrc: "/image/middle-race/characters/copy.png",
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
    id: "reset",
    label: "리셋",
    name: "Reset",
    priority: 13,
    ability:
      "자신의 말이 뒤로 이동할 때마다 다른 플레이어 1명을 지목하여 이동카드를 리셋시킨다.",
    color: "#592A1A",
    imageSrc: "/image/middle-race/characters/reset.png",
  },
  {
    id: "quick",
    label: "퀵",
    name: "Quick",
    priority: 12,
    ability:
      "모든 이동카드를 2배수로 사용할 수 있다. 단, 이동카드 4장 중 최대 2장까지만 앞으로 가는 데 사용할 수 있으며, 나머지 카드들은 뒤로 가는 데 사용된다. 사일런스에 의해 무력화된 경우 무조건 앞으로만 이동해야 하며, 이때 사용된 카드도 앞으로 가는 데 사용한 카드로 카운팅된다.",
    color: "#010661",
    imageSrc: "/image/middle-race/characters/quick.png",
  },
  {
    id: "silence",
    label: "사일런스",
    name: "Silence",
    priority: 11,
    ability:
      "자신의 턴에 이동카드를 제출하기 전, 1명을 지목해 다음 사일런스의 턴이 돌아올 때까지 해당 플레이어의 능력을 무력화시킨다. 새로 1명을 지목한 순간부터 기존에 무력화된 캐릭터는 능력이 다시 발동된다.",
    color: "#3B2E9F",
    imageSrc: "/image/middle-race/characters/silence.png",
  },
];
