type MeetingUpdateRequest = {
  description: string;
  start: string;
  end: string;
};

type MeetingResponse = {
  meetingId: number;
  requesterId: number;
  requesterName: string;
  start: string;
  end: string;
  description: string;
  status: MeetingStatus;
};
