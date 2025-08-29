import {
  april_fools_day,
  april_fools_day2,
  pepero_day,
  pepero_day3,
  white_day,
  white_day2,
  valentine_day,
  valentine_day2,
  new_year,
  new_year2,
  christmas,
  christmas2,
} from "../assets";

export interface EventData {
  annName: string;
  annDt: string;
  id: string;
  title: string;
  date: string;
  message: string;
  quiz: string;
  image: string;
  image2: string;
  buttonText: string;
}

export const events: EventData[] = [
  {
    annName: "새해",
    annDt: "2026-01-01",
    id: "new_year",
    title: "Happy New Year 🎆",
    date: "1월 1일",
    message: "새해의 시작을 기념해보세요.",
    quiz: "1월 1일 새해가 왔어요!",
    image: new_year,
    image2: new_year2,
    buttonText: "새해 이벤트 참여하기",
  },
  {
    annName: "발렌타인데이",
    annDt: "2026-02-14",
    id: "valentine_day",
    title: "로맨틱 발렌타인 데이 ❤️",
    date: "2월 14일",
    message: "발렌타인 데이의 사랑을 남겨보세요.",
    quiz: "2월 14일 발렌타인데이예요!",
    image: valentine_day,
    image2: valentine_day2,
    buttonText: "발렌타인 데이 이벤트 참여하기",
  },
  {
    annName: "화이트데이",
    annDt: "2026-03-14",
    id: "white_day",
    title: "사랑을 전하는 화이트 데이 💝",
    date: "3월 14일",
    message: "화이트 데이의 사랑을 기록해보세요.",
    quiz: "3월 14일 화이트 데이가 왔어요!",
    image: white_day,
    image2: white_day2,
    buttonText: "화이트 데이 이벤트 참여하기",
  },
  {
    annName: "만우절",
    annDt: "2026-04-01",
    id: "april_fools_day",
    title: "오늘만은 장난 OK! 만우절 🤡",
    date: "4월 1일",
    message: "만우절의 장난스러운 순간을 기록해보세요.",
    quiz: "4월 1일 만우절이 왔어요!",
    image: april_fools_day,
    image2: april_fools_day2,
    buttonText: "만우절 이벤트 참여하기",
  },
  {
    annName: "빼빼로데이",
    annDt: "2025-11-11",
    id: "pepero_day",
    title: "달콤한 빼빼로 데이 🍫",
    date: "11월 11일",
    message: "빼빼로 데이의 달콤한 순간을 남겨보세요.",
    quiz: "11월 11일 빼빼로 데이가 왔어요!",
    image: pepero_day,
    image2: pepero_day3,
    buttonText: "빼빼로 데이 이벤트 참여하기",
  },
  {
    annName: "크리스마스",
    annDt: "2026-12-25",
    id: "christmas",
    title: "메리 크리스마스 🎅",
    date: "12월 25일",
    message: "크리스마스의 따뜻한 추억을 남겨보세요.",
    quiz: "12월 25일 크리스마스가 왔어요!",
    image: christmas,
    image2: christmas2,
    buttonText: "크리스마스 이벤트 참여하기",
  },
];
