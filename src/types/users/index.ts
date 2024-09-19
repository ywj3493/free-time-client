type LoginFormData = {
  email: string;
  password: string;
};

type UserUpdateFormData = {
  name: string;
  phone: string;
  preferredNoticeChannel: PreferredNoticeChannel;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

type UserCreateRequest = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  preferredNoticeChannel: PreferredNoticeChannel;
  weeklyFreeTime: FreeTimeWeeklyRequest;
};

type UserUpdateRequest = {
  name: string;
  phone?: string;
  preferredNoticeChannel: PreferredNoticeChannel;
};

type UserResetPasswordRequest = {
  email: string;
  name: string;
  newPassword: string;
};

type UserResetPasswordResponse = {
  email: string;
  name: string;
  secret: string;
};

type UserLoginRequest = {
  email: string;
  password: string;
};

type UserResponse = {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  preferredNoticeChannel: PreferredNoticeChannel;
};

type ScheduleResponse = {
  start: string;
  end: string;
};

type DailyScheduleResponse = {
  date: string;
  day: string;
  freeTime: ScheduleResponse[];
  confirmedMeetings: ScheduleResponse[];
};
