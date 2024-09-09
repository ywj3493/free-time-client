interface IScheduleAdapter {
  start: string;
  end: string;
}

export class ScheduleAdapter implements IScheduleAdapter {
  public start;
  public end;

  protected constructor({ start, end }: IScheduleAdapter) {
    this.start = start;
    this.end = end;
  }

  public create(data: IScheduleAdapter) {
    return new ScheduleAdapter(data);
  }
}
