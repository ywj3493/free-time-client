function isIMeetingAdapter(obj: any): obj is IMeetingAdapter {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "meetingId" in obj &&
    "receiverId" in obj &&
    "requesterId" in obj &&
    "requesterName" in obj &&
    "start" in obj &&
    "end" in obj &&
    "place" in obj &&
    "description" in obj &&
    "status" in obj
  );
}

interface IMeetingAdapter {
  meetingId: number;
  receiverId: number;
  requesterId: number;
  requesterName: string;
  start: string;
  end: string;
  place: string;
  description: string;
  status: MeetingStatus;
}

export class MeetingAdapter implements IMeetingAdapter {
  public meetingId: number;
  public receiverId: number;
  public requesterId: number;
  public requesterName: string;
  public start: string;
  public end: string;
  public place: string;
  public description: string;
  public status: MeetingStatus;

  protected constructor({
    meetingId,
    receiverId,
    requesterId,
    requesterName,
    start,
    end,
    place,
    description,
    status,
  }: IMeetingAdapter) {
    this.meetingId = meetingId;
    this.receiverId = receiverId;
    this.requesterId = requesterId;
    this.requesterName = requesterName;
    this.start = start;
    this.end = end;
    this.place = place;
    this.description = description;
    this.status = status;
  }

  public static create(
    data: IMeetingAdapter | MeetingResponse | MeetingAdapter
  ) {
    if (data instanceof MeetingAdapter) {
      return data;
    } else if (isIMeetingAdapter(data)) {
      return new MeetingAdapter(data);
    }
  }

  get meetingSummary() {
    return `${this.place} 에서 ${this.requesterName} 님과 ${this.start} 부터 ${this.end} 까지 일정이 있습니다.`;
  }
}
