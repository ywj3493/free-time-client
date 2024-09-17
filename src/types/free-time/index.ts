type FreeTimeUpdateFormData = {
  monday: FreeTimeRequest;
  tuesday: FreeTimeRequest;
  wednesday: FreeTimeRequest;
  thursday: FreeTimeRequest;
  friday: FreeTimeRequest;
  saturday: FreeTimeRequest;
  sunday: FreeTimeRequest;
};

type FreeTimeRequest = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

type FreeTimeWeeklyRequest = {
  monday: FreeTimeRequest;
  tuesday: FreeTimeRequest;
  wednesday: FreeTimeRequest;
  thursday: FreeTimeRequest;
  friday: FreeTimeRequest;
  saturday: FreeTimeRequest;
  sunday: FreeTimeRequest;
};

type FreeTimeDailyRequest = {
  date: string;
  freeTime: FreeTimeRequest;
};

type FreeTimeMyResponse = {
  user: UserResponse;
  schedules: DailyScheduleResponse[];
  meetings: MeetingResponse[];
};

type FreeTimeGueestResponse = {
  user: UserResponse;
  schedules: DailyScheduleResponse[];
};
