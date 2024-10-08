export function dayToKor(dayEng: DayEng) {
  switch (dayEng) {
    case "MONDAY":
      return "월";
    case "TUESDAY":
      return "화";
    case "WEDNESDAY":
      return "수";
    case "THURSDAY":
      return "목";
    case "FRIDAY":
      return "금";
    case "SATURDAY":
      return "토";
    case "SUNDAY":
      return "일";
    default:
      return "";
  }
}

export function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(16);
}

export const days: { kor: Day; eng: DayEng }[] = [
  {
    kor: "월",
    eng: "MONDAY",
  },

  {
    kor: "화",
    eng: "TUESDAY",
  },

  {
    kor: "수",
    eng: "WEDNESDAY",
  },

  {
    kor: "목",
    eng: "THURSDAY",
  },

  {
    kor: "금",
    eng: "FRIDAY",
  },

  {
    kor: "토",
    eng: "SATURDAY",
  },

  {
    kor: "일",
    eng: "SUNDAY",
  },
];
