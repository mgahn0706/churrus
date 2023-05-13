
export const startUpSuspects: SuspectType[]  = [{
name: '김성균' ,
image: '/Suspect_Logo.png',
age: 29,
gender: 'male',
job: '데이터 관리자',
description: '데이터 관리자입니다.',
finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
},

{
    name: '강지혜' ,
    image: '/Suspect_Logo.png',
    age: 27,
    gender: 'female',
    job: '마케팅 담당자',
    description: '마케팅 담당자입니다.',
    finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
    },

    {
        name: '박지혁' ,
        image: '/Suspect_Logo.png',
        age: 29,
        gender: 'male',
        job: '영업팀장',
        description: '데이터 관리자입니다.',
        finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
        },



];

export const startUpVictim: SuspectType = {
name: '한채원',
image: '/Suspect_Logo.png',
age: 28,
gender: 'female',
job: '추러스 대표이사',
description: '추러스 대표이사입니다.'
};

interface InterrogationType {
    id: number;
    statements: string[];
}

export interface SuspectType {
    name: string;
    image?: string;
    age: number;
    gender: 'male' | 'female';
    job: string;
    description: string;
    finalArgument?: string;
}

export type VictimType = SuspectType;