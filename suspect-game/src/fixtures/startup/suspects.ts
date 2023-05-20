
export const startUpSuspects: SuspectType[]  = [{
name: '김성균' ,
image: '/image/profile/kim_sg.jpeg',
age: 29,
gender: 'male',
job: '데이터 관리자',
description: '데이터 관리자입니다.',
finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
},

{
    name: '강지혜' ,
    image: '/image/profile/kang_jh.jpeg',
    age: 27,
    gender: 'female',
    job: '마케팅 인턴',
    description: '저는 추러스에서 마케팅 업무를 맡고 있는 강지혜라고 합니다. ',
    finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
    },

    {
        name: '박지혁' ,
        image: '/image/profile/park_jh.jpeg',
        age: 29,
        gender: 'male',
        job: '영업 팀장',
        description: '데이터 관리자입니다.',
        finalArgument: '제가 범인이라구요? 저는 그저 데이터를 관리하는 사람이에요. 그런데 왜 저를 용의자로 지목하시는 거죠? 아마 제가 채원이를 좋아했다는 것을 근거로 드신건가요?'
        },



];

export const startUpVictim: VictimType = {
name: '한채원',
image: '/image/profile/han_cw.jpeg',
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