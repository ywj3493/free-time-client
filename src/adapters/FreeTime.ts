interface IFreeTime {
  day: Day;
}

export class FreeTime implements IFreeTime {
  public day;

  protected constructor(data: IFreeTime) {
    this.day = data.day;
  }
}
