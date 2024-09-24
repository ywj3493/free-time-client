type FreeTimeUpdateFormData = {
  monday: FreeTimeRequest[];
  tuesday: FreeTimeRequest[];
  wednesday: FreeTimeRequest[];
  thursday: FreeTimeRequest[];
  friday: FreeTimeRequest[];
  saturday: FreeTimeRequest[];
  sunday: FreeTimeRequest[];
};

type FreeTimeRequest = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

type FreeTimeWeeklyRequest = {
  monday: FreeTimeRequest[];
  tuesday: FreeTimeRequest[];
  wednesday: FreeTimeRequest[];
  thursday: FreeTimeRequest[];
  friday: FreeTimeRequest[];
  saturday: FreeTimeRequest[];
  sunday: FreeTimeRequest[];
};

type FreeTimeDailyRequest = {
  date: string;
  freeTime: FreeTimeRequest;
};

type FreeTimeMyResponse = {
  user: UserResponse;
  schedules: DailyScheduleResponse[];
  ownedMeetings: MeetingResponse[];
  guestMeetings: MeetingResponse[];
};

type FreeTimeGueestResponse = {
  user: UserResponse;
  schedules: DailyScheduleResponse[];
};

type FreeTimeResponse = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

type FreeTimeWeeklyResponse = {
  monday: FreeTimeResponse[];
  tuesday: FreeTimeResponse[];
  wednesday: FreeTimeResponse[];
  thursday: FreeTimeResponse[];
  friday: FreeTimeResponse[];
  saturday: FreeTimeResponse[];
  sunday: FreeTimeResponse[];
};
