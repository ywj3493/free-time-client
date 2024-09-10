type PreferredNoticeChannel = "EMAIL" | "SMS";

type ProposalStatus = "WAITING" | "ACCEPTED" | "REJECTED";

type MeetingStatus = "ACCEPTED" | "CANCELED";

type Schedule = {
  start: string;
  end: string;
};

type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
type DayEng =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
