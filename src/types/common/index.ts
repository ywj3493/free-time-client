type PreferredNoticeChannel = "EMAIL" | "SMS";

type ProposalStatus = "WAITING" | "ACCEPTED" | "REJECTED";

type MeetingStatus = "ACCEPTED" | "CANCELED";

type Schedule = {
  start: string;
  end: string;
};

type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
