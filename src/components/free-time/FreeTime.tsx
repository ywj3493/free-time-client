"use client";

import { ScheduleContextProvider } from "@/hooks/ScheduleContext";
import { WeeklyCalender } from "./WeeklyCalender";

export default function FreeTime() {
  return (
    <ScheduleContextProvider>
      <WeeklyCalender standardDate={new Date()} />
    </ScheduleContextProvider>
  );
}
