import { simpleHash } from "@/utils";
import { differenceInMinutes, format, startOfDay } from "date-fns";

function isIScheduleAdapter(obj: any): obj is IScheduleAdapter {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "start" in obj &&
    "end" in obj &&
    "isFreeTime" in obj &&
    typeof obj.start === "string" &&
    typeof obj.end === "string" &&
    typeof obj.isFreeTime === "boolean"
  );
}

// 타입 가드 함수
function isScheduleResponse(obj: any): obj is ScheduleResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "start" in obj &&
    "end" in obj &&
    typeof obj.start === "string" &&
    typeof obj.end === "string"
  );
}

interface IScheduleAdapter {
  start: string;
  end: string;
  isFreeTime: boolean;
}

export class ScheduleAdapter implements IScheduleAdapter {
  public start;
  public end;
  public isFreeTime;

  protected constructor({ start, end, isFreeTime }: IScheduleAdapter) {
    this.start = start;
    this.end = end;
    this.isFreeTime = isFreeTime;
  }

  public static create(
    data: ScheduleAdapter | IScheduleAdapter | ScheduleResponse,
    isFreeTime?: boolean
  ) {
    if (data instanceof ScheduleAdapter) {
      return data;
    } else if (isIScheduleAdapter(data)) {
      return new ScheduleAdapter({ ...data });
    } else if (isScheduleResponse(data)) {
      return new ScheduleAdapter({
        ...data,
        isFreeTime: isFreeTime ? true : false,
      });
    }
    throw Error("ScheduleAdapter create error");
  }

  private get startDate() {
    return new Date(this.start);
  }

  private get endDate() {
    return new Date(this.end);
  }

  get id() {
    return simpleHash(`${this.date}_${this.start}_${this.end}`);
  }

  // 하루 안에 제안 요청 구분하므로 시작 날짜만 해도 됨
  get date() {
    return format(this.startDate, "yyyy-MM-dd");
  }

  get startHour() {
    return this.startDate.getHours();
  }

  get endHour() {
    return this.endDate.getHours();
  }

  get startMinute() {
    return this.startDate.getMinutes();
  }

  get endMinute() {
    return this.endDate.getMinutes();
  }

  get scheduleText() {
    return `${this.date} ${this.startHour}시 ${this.startMinute}분 부터 ${this.endHour}시 ${this.endMinute}분 까지`;
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
      scheduleId: this.id,
      start: `${this.date} ${String(this.startHour).padStart(2, "0")}:${String(
        this.startMinute
      ).padStart(2, "0")}:00`,
      end: `${this.date} ${String(this.endHour).padStart(2, "0")}:${String(
        this.endMinute
      ).padStart(2, "0")}:00`,
    };
  }
}
