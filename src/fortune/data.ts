import type { BadgeColor } from "./types";

export interface GradeDef {
  min: number;
  label: string;
  badgeColor: BadgeColor;
}

/** 점수 구간별 등급 (내림차순) */
export const GRADES: GradeDef[] = [
  { min: 90, label: "대길(大吉)", badgeColor: "red" },
  { min: 80, label: "길(吉)", badgeColor: "blue" },
  { min: 70, label: "중길(中吉)", badgeColor: "teal" },
  { min: 55, label: "소길(小吉)", badgeColor: "green" },
  { min: 0, label: "평온(平)", badgeColor: "yellow" },
];

/** 총운 메시지 풀 (등급 라벨로 조회, 모두 해요체) */
export const OVERALL_MESSAGES: Record<string, string[]> = {
  "대길(大吉)": [
    "막힘없이 술술 풀리는 하루예요. 미뤄둔 일에 과감히 도전해 보세요.",
    "생각지 못한 좋은 소식이 찾아와요. 오늘의 결정을 믿어도 좋아요.",
    "무엇을 해도 잘 되는 흐름이에요. 큰 그림을 그려도 좋은 날이에요.",
  ],
  "길(吉)": [
    "노력한 만큼 결과가 따라오는 하루예요. 꾸준함이 빛을 발해요.",
    "주변의 도움으로 일이 순조롭게 풀려요. 감사한 마음을 표현해 보세요.",
    "작은 기회가 큰 행운으로 이어질 수 있어요. 눈을 크게 뜨고 살펴보세요.",
  ],
  "중길(中吉)": [
    "무난하지만 기분 좋은 하루예요. 평소의 리듬을 지키면 충분해요.",
    "서두르지 않으면 좋은 결과가 기다려요. 한 걸음씩 나아가 보세요.",
    "마음이 통하는 사람과 함께라면 더 좋은 하루가 될 거예요.",
  ],
  "소길(小吉)": [
    "조금 더디지만 방향은 맞아요. 조바심 대신 여유를 가져보세요.",
    "작은 정리부터 시작하면 하루가 한결 가벼워져요.",
    "무리하지 않는 선에서 계획을 지키면 마음이 편안해져요.",
  ],
  "평온(平)": [
    "특별한 일 없이 잔잔한 하루예요. 나를 돌보는 시간을 가져보세요.",
    "욕심을 조금 내려놓으면 마음이 한결 편안해지는 날이에요.",
    "충전이 필요한 하루예요. 충분히 쉬는 것도 오늘의 할 일이에요.",
  ],
};

export interface CategoryDef {
  key: string;
  label: string;
  emoji: string;
}

export const CATEGORIES: CategoryDef[] = [
  { key: "love", label: "애정운", emoji: "💕" },
  { key: "money", label: "금전운", emoji: "💰" },
  { key: "health", label: "건강운", emoji: "🍀" },
  { key: "work", label: "직장운", emoji: "💼" },
];

/** 분야별 코멘트 풀 (모두 해요체) */
export const CATEGORY_COMMENTS: Record<string, string[]> = {
  love: [
    "마음을 솔직하게 표현하면 관계가 한층 가까워져요.",
    "먼저 안부를 건네면 반가운 답이 돌아와요.",
    "작은 배려가 오늘의 분위기를 따뜻하게 만들어요.",
    "혼자만의 시간이 마음을 정리하는 데 도움이 돼요.",
  ],
  money: [
    "충동적인 소비만 조심하면 지갑이 든든한 하루예요.",
    "작은 절약이 뜻밖의 여유로 이어져요.",
    "예상치 못한 지출이 있을 수 있으니 미리 챙겨두세요.",
    "가치 있는 곳에 쓰는 돈은 아깝지 않은 날이에요.",
  ],
  health: [
    "가벼운 스트레칭만으로도 컨디션이 확 살아나요.",
    "물을 자주 마시고 무리한 일정은 줄여보세요.",
    "충분한 수면이 오늘의 활력을 좌우해요.",
    "잠깐의 산책이 기분과 몸을 함께 가볍게 해줘요.",
  ],
  work: [
    "집중이 잘 되는 날이라 미뤄둔 일을 처리하기 좋아요.",
    "동료와의 소통이 예상보다 큰 도움이 돼요.",
    "작은 실수는 미리 점검하면 충분히 막을 수 있어요.",
    "새로운 아이디어를 메모해 두면 곧 쓸 일이 생겨요.",
  ],
};

/** 행운의 색 팔레트 */
export const LUCKY_COLORS: Array<{ name: string; hex: string }> = [
  { name: "레드", hex: "#F04452" },
  { name: "오렌지", hex: "#FF9F40" },
  { name: "옐로우", hex: "#FFC043" },
  { name: "그린", hex: "#00C08B" },
  { name: "블루", hex: "#3182F6" },
  { name: "네이비", hex: "#22315B" },
  { name: "퍼플", hex: "#7D5FFF" },
  { name: "핑크", hex: "#FF6B9D" },
  { name: "민트", hex: "#3FD599" },
  { name: "브라운", hex: "#8B5E3C" },
];
