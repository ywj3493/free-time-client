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

  get startDate() {
    return new Date(this.start);
  }

  get endDate() {
    return new Date(this.end);
  }

  get id() {
    return `${this.date}_${this.start}_${this.end}`;
  }

  // DaySchedule.tsx 의 ScheduleGage 컴포넌트의 위치를 잡는데 사용하는 비율 값
  get topRatio() {
    const dayStart = startOfDay(this.startDate);
    const minutesFromStart = differenceInMinutes(this.startDate, dayStart);

    return minutesFromStart / (24 * 60);
  }

  // DaySchedule.tsx 의 ScheduleGage 컴포넌트의 높이를 잡는데 사용하는 비율 값
  get heightRatio() {
    const difference = differenceInMinutes(this.endDate, this.startDate);

    return difference / (24 * 60);
  }

  get schedule() {
    return {
      start: this.startDate.toISOString(),
      end: this.endDate.toISOString(),
    };
  }
}
