export const scenarios : ScenarioType[]= [{
    title: '스타트업 살인사건',
    difficulty: 2,
    numberOfSuspects: 3,
    playTime: 90,
    backgroundImage: '/scenarioImage/startup-main.png',
    cardImage: '/Suspect_Logo.png',
    keyword: 'startup'

}
,
{
    title: '자하연 살인사건',
    difficulty: 3,
    numberOfSuspects: 4,
    playTime: 120,
    backgroundImage: '/Suspect_Logo.png',
    cardImage: '/Suspect_Logo.png',
    keyword: 'jahayeon'

}
,
{
    title: '추러스 MT 살인사건',
    difficulty: 1,
    numberOfSuspects: 3,
    playTime: 120,
    backgroundImage: '/Suspect_Logo.png',
    cardImage: '/Suspect_Logo.png',
    keyword: 'mt'

},
{
    title: '와부고 살인사건',
    difficulty: 4,
    numberOfSuspects: 4,
    playTime: 150,
    backgroundImage: '/Suspect_Logo.png',
    cardImage: '/Suspect_Logo.png',
    keyword: 'highschool'

}
]

export interface ScenarioType {
    title: string;
    difficulty: number;
    numberOfSuspects: number;
    playTime: number;
    backgroundImage: string;
    cardImage: string;
    keyword: string;
}