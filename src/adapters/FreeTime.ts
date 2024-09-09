interface IFreeTime {
  date: string;
  day: Day;
  freeTime: Schedule[];
}

export class FreeTime implements IFreeTime {
  public date;
  public day;
  public freeTime: Schedule[];

  protected constructor({ date, day, freeTime }: IFreeTime) {
    this.date = date;
    this.day = day;
    this.freeTime = freeTime;
  }

  public create(data: IFreeTime) {
    return new FreeTime(data);
  }
}
