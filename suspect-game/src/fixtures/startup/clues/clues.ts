export interface ClueType {
    id: number;
    image: string;
    title: string;
    x: number;
    y: number;
    reliability: 'low' | 'medium' | 'high';
    description: string;
    type: 'basic' | 'additional' | 'interrogation';
}


export const startUpClues: ClueType[] = [
{
    id: 1,
    title: '시체',
    x: 57.23380, y: 64.72874,
    reliability: 'high',
    description: '피해자 한채원의 시체이다. 외상의 흔적은 없다. 사인은 니코틴 중독으로 치사량 이상의 니코틴이 검출되었다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}
,
{
    id: 2,
    title: '한채원의 술잔',
    x: 56.134, y: 51.152,
    reliability: 'high',
    description: '한채원이 마신 술잔이다. 술잔은 공유 오피스에서 공용으로 제공하는 스테인리스 컵이다. 술잔 안에는 조금의 알코올과 얼음, 다량의 니코틴이 검출되었다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}
]