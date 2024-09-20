type MeetingProposalFormData = {
  targetId: number;
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
  status: ProposalStatus;
};
