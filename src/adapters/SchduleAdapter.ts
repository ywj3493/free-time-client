import { differenceInMinutes, startOfDay } from "date-fns";

interface IScheduleAdapter {
  date: Date;
  start: string;
  end: string;
  isFreeTime: boolean;
}

export class ScheduleAdapter implements IScheduleAdapter {
  public date;
  public start;
  public end;
  public isFreeTime;

  protected constructor({ date, start, end, isFreeTime }: IScheduleAdapter) {
    this.date = date;
    this.start = start;
    this.end = end;
    this.isFreeTime = isFreeTime;
  }

  public static create(data: IScheduleAdapter) {
    return new ScheduleAdapter(data);
  }

  get startTime() {
    return new Date(this.start);
  }

  get endTime() {
    return new Date(this.end);
  }

  get id() {
    return `${this.date}_${this.start}_${this.end}`;
  }

  get topRatio() {
    const dayStart = startOfDay(this.startTime);
    const minutesFromStart = differenceInMinutes(this.startTime, dayStart);

    return minutesFromStart / (24 * 60);
  }

  get heightRatio() {
    const difference = differenceInMinutes(this.endTime, this.startTime);

    return difference / (24 * 60);
  }
}
