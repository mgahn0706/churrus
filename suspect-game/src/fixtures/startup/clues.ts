export interface ClueType {
    id: number;
    image: string;
    title: string;
    x: number;
    y: number;
    reliability: 'low' | 'medium' | 'high';
    description: string;
    type: 'basic' | 'additional' | 'interrogation' | 'locked';
    password?: string;
    passwordHint?: string;
    place: string | number;
}


export const startUpClues: ClueType[] = [
{
    id: 1,
    title: '시체',
    x: 57.23380, y: 64.72874,
    reliability: 'high',
    description: '피해자 한채원의 시체이다. 외상의 흔적은 없다. 사인은 니코틴 중독으로 치사량 이상의 니코틴이 검출되었다.',
    type: 'basic',
    image: 'image/clue/startup-1.png',
    place: 'lounge',

}
,
{
    id: 2,
    title: '한채원의 술잔',
    x: 56.134, y: 51.152,
    reliability: 'high',
    description: '한채원이 마신 술잔이다. 술잔은 공유 오피스에서 공용으로 제공하는 스테인리스 컵이다. 술잔 안에는 조금의 알코올과 얼음, 다량의 니코틴이 검출되었다.',
    type: 'basic',
    image: '/Suspect_Logo.png',
    place: 'lounge',}
,
    {
    id: 3,
    title: '사내메신저: 잡담',
    x: 86.863, y: 7.189,
    reliability: 'high',
    description: '입사 1주년',
    type: 'basic',
    image: '/Suspect_Logo.png',
    place: 'office',},
    {
    id: 4,
    title: '한채원의 서랍',
    x: 82.350, y: 73.617,
    reliability: 'high',
    description: '한채원의 서랍이다. 서랍 안에는 다양한 사무용품이 들어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',
    place: 'office',},
    
    {
    id: 5,
    title: '네임펜',
    x: 24.699, y: 32.253,
    reliability: 'high',
    description: '한채원의 네임펜이다. 네임펜에는 한채원의 이름과 회사명이 적혀있다.',
    type: 'additional',
    image: '/Suspect_Logo.png',
    place: 4,},
    {
    id: 6,
    title: '한채원의 PC',
    x: 79.688, y: 66.424,
    reliability: 'high',
    description: '한채원의 PC이다. 다양한 파일들과 메신저가 열려있다.',
    passwordHint: '한채원의 PC이다. PC는 잠겨있다. 비밀번호 힌트로 "내 생일"이라고 적혀있다.',
    type: 'locked',
    password: '0801',
    image: '/Suspect_Logo.png',
    place: 'office',},
    {
    id: 7,
    title: '발표문',
    x: 19.688, y: 26.424,
    reliability: 'high',
    description: '한채원의 발표문이다. 발표문에는 한채원의 이름과 회사명이 적혀있다.',
    type: 'additional',
    image: '/Suspect_Logo.png',
    place: 6,},
    
]