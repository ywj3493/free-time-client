"use client";

import { ScheduleContextProvider } from "@/hooks/ScheduleContext";
import { WeeklyCalender } from "./WeeklyCalender";

interface FreeTimeProps {
  userId: string;
}

export default function FreeTime({ userId }: FreeTimeProps) {
  return (
    <ScheduleContextProvider>
      <WeeklyCalender standardDate={new Date()} />
    </ScheduleContextProvider>
  );
}
