import { ScheduleAdapter } from "./SchduleAdapter";

interface IProposalAdapter {
  proposalId: number;
  requesterId: number;
  requesterName: string;
  schedules: ScheduleAdapter[];
  expiredAt: string;
  status: ProposalStatus;
}

export class ProposalAdapter implements IProposalAdapter {
  public proposalId: number;
  public requesterId: number;
  public requesterName: string;
  public schedules: ScheduleAdapter[];
  public expiredAt: string;
  public status: ProposalStatus;

  protected constructor({
    proposalId,
    requesterId,
    requesterName,
    schedules,
    expiredAt,
    status,
  }: IProposalAdapter) {
    this.proposalId = proposalId;
    this.requesterId = requesterId;
    this.requesterName = requesterName;
    this.schedules = schedules;
    this.expiredAt = expiredAt;
    this.status = status;
  }

  public static create(
    data: ProposalAdapter | ProposalResponse | IProposalAdapter
  ) {
    if (data instanceof ProposalAdapter) {
      return data;
    } else {
      return new ProposalAdapter({
        ...data,
        schedules: data.schedules.map((value) =>
          ScheduleAdapter.create({ ...value, isFreeTime: false })
        ),
      });
    }
  }

  get proposalResponse(): ProposalResponse {
    return {
      proposalId: this.proposalId,
      requesterId: this.requesterId,
      requesterName: this.requesterName,
      schedules: this.schedules.map((value) => value.schedule),
      expiredAt: this.expiredAt,
      status: this.status,
    };
  }

  get proposalInfo() {
    return this.schedules.map((value) => value.scheduleText);
  }
}
