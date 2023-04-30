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
    description: '피해자 한채원의 시체이다. 외상의 흔적은 없다. 사인은 니코틴 중독으로 치사량 이상의 니코틴이 검출되었다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}
,
{
    id: 2,
    title: '한채원의 술잔',
    x: 44,
    y: 41,
    reliability: 'high',
    description: '한채원이 마신 술잔이다. 술잔은 공유 오피스에서 공용으로 제공하는 스테인리스 컵이다. 술잔 안에는 조금의 알코올과 얼음, 다량의 니코틴이 검출되었다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}
,
{
    id: 3,
    title: '제빙기',
    x: 37,
    y: 50,
    reliability: 'high',
    description: '공유 오피스의 제빙기이다. 제빙기 안에는 얼음이 쌓여있다. 일정 시간마다 얼음을 계속 채워주는 방식으로 작동하며, 얼린지 오래 된 얼음은 다시 녹아서 배출되는 방식이다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}

,
{
    id: 4,
    title: '한채원의 노트북',
    x: 44,
    y: 41,
    reliability: 'high',
    description: '한채원의 노트북이다. 비밀번호가 걸려있어 당장은 열 수 없다. 비밀번호 힌트에는 "내 생일"이라고 적혀있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',}
,
{
    id: 5,
    title: '한채원의 휴대폰',
    x: 34, 
    y: 48,
    reliability: 'high',
    type: 'basic',
    description: '한채원의 휴대폰이다. 기종은 아이폰 14 Pro. 추가 조사가 가능하다.',
   image: '/Suspect_Logo.png',}
,{
    id: 6,
    title: '위스키 물약통',
    x: 50,
    y: 50,
    reliability: 'high',
    description: '일반 물약통이다. 물약통 안에는 알코올 냄새가 난다. 물약통 겉면에는 네임펜으로 "Cask Strength ABV 17"이라고 적혀있다.',
  type: 'basic',
    image: '/Suspect_Logo.png',}
    ,
    {
    id: 7,
    title: '한채원의 서랍',
    x: 24,
    y: 41,
    reliability: 'high',
    description: '한채원 자리의 서랍이다. 서랍은 잠겨있지 않고 쉽게 열렸다. 서랍 안에는 한채원의 개인 물품이 들어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 8,
    title: '한채원의 노트',
    x: 24,
    y: 41,
    reliability: 'high',
    description: '한채원이 추러스 투자 관련해서 적혀놓은 노트이다. 노트에는 정부 지원금이 끊겨서 곤란하다는 내용이 주로 적혀있다. 다른 내용은 악필로 알아볼 수가 없다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 9,
    title: '네임펜',
    x: 24,
    y: 41,
    reliability: 'high',
    description: '사용한 흔적이 거의 없는 유성 네임펜이지만, 다른 네임펜과 달리 포장에서 꺼내져있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    
    {
    id: 10,
    title: '냉장고',
    x: 32,
    y: 50,
    reliability: 'high',
    description: '공유 오피스의 냉장고이다. 냉장고 안에는 음식물이 들어있다. 냉동칸은 고장나서 작동하지 않는다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 11,
    title: '인터넷 기사 - 개인정보보호법',
    x: 12,
    y: 34,
    reliability: 'high',
    description: '개인정보보호법 개정안이 2023년부터 바뀐다는 내용의 기사이다. 개인정보를 임의로 사용한 기업의 책임자는 최소 징역까지 갈 수 있게 된다는 내용이다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 12,
    title: '인터넷 기사 - SnackGenius',
    x: 12,
    y: 34,
    reliability: 'high',
    description: '날짜는 2023년 4월 29일. SnackGenius가 개인정보를 무단으로 사용했다는 의심을 경쟁사 "와플러브"에서 발표했다는 내용의 기사이다. ',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 13,
    title: '김지혜의 가방',
    x: 12,
    y: 34,
    reliability: 'high',
    description: '김지혜의 가방이다. 가방 안에는 여러 물건들이 들어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 14,
    title: '케이크와 칼',
    x: 62,
    y: 34,
    reliability: 'high',
    description: '생크림 케이크와 과도가 있다. 칼에는 케이크를 자를 때 묻은 생크림이 묻어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},

    {
    id: 15,
    title: '인사 담당자의 노트',
    x: 62,
    y: 34,
    reliability: 'high',
    description: 'HR 담당자의 기록지이다. 각 구성원의 생일과 입사일이 적혀있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 16,
    title: '술잔',
    x: 62,
    y: 34,
    reliability: 'high',
    description: '한채원의 옆자리에 앉은 사람의 술잔이다. 립스틱 자국이 묻어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 17,
    title: '비어있는 술잔',
    x: 67,
    y: 32,
    reliability: 'high',
    description: '한채원의 앞자리에 앉은 사람의 술잔이다. 술잔 안에는 과일 술 냄새가 나고, 얼음 만이 남아있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 18,
    title: '케이크 접시',
    x: 67,
    y: 32,
    reliability: 'high',
    description: '케이크를 먹은 접시이다. 포크가 놓여져있고, 급하게 먹다 남긴 듯 포크에 케이크가 묻어있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 19,
    title: '사건 당일 한채원에 대해',
    x: 67,
    y: 72,
    reliability: 'high',
    description: '오늘 한채원님이요? 오늘 채원님은 자리를 떠나지 않더군요. 점심도 혼자 자리에서 시켜먹고...  중간중간에 김지현님과 말다툼하러 나가는 것 같긴 했는데, 그 외에는 자리를 떠나지 않았어요.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 20,
    title: '발표문',
    x: 23,
    y: 72,
    reliability: 'high',
    description: '한채원이 작성한 기자회견 발표문이다. 스낵 지니어스 인공지능 개발 과정에서 발생한 개인정보유출 관련하여 사과하는 내용이다. 책임자는 데이터 관리자인 김성균이며, 해당 관리자를 해임 및 적절한 처벌을 하겠다는 내용도 적혀있다. 발표 예정일은 6월 1일이다.'  
    ,type: 'basic',
    image: '/Suspect_Logo.png',},

    {
    id: 21,
    title: '출입문 기록',
    x: 63,
    y: 82,
    reliability: 'high',
    description: '구성원의 출퇴근 기록이다. 해당 출입문을 통해서만 구성원은 출퇴근을 기록할 수 있고, 출퇴근을 기록할 때에만 문이 열린다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},
    {
    id: 22,
    title: '뒷문',
    x: 62,
    y: 8,
    reliability: 'high',
    description: '공유 오피스의 뒷문이다. 해당 문은 출퇴근 기록이 기록되지 않아, 구성원들은 출입문을 열 수 없는 상황일 때 이용할 수 있다.',
    type: 'basic',
    image: '/Suspect_Logo.png',},

    {
    id: 23,
    title: '경비원 : 뒷문에 대해',
    x: 12,
    y: 2,
    reliability: 'high',
    description: '뒷문은 대부분의 사람이 퇴근한 8시에 제가 잠급니다. 어제요? 어제도 분명히 8시 정각에 잠갔습니다. 제가 사무실에 아무도 없는 것 확실히 확인하고 잠근 기억이 있습니다.'
    ,type: 'basic',
    image: '/Suspect_Logo.png',},
    
    


    

]