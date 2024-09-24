type MeetingProposalFormData = {
  targetId: number;
  place: string;
  schedules: Schedule[];
  expiredAt: string;
  description: string;
};

type ProposalAcceptRequest = {
  schedule: Schedule;
  description: string;
};

type ProposalCreateRequest = {
  targetId: number;
  place: string;
  schedules: Schedule[];
  expiredAt: string;
  description: string;
};

type ProposalResponse = {
  proposalId: number;
  requesterId: number;
  requesterName: string;
  schedules: Schedule[];
  expiredAt: string;
  description: string;
  place: string;
  status: ProposalStatus;
};
