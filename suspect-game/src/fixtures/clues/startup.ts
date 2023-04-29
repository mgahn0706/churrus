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
    x: 44.39,
    y: 41.81,
    reliability: 'high',
    description: '피해자 한채원의 시체이다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}

]