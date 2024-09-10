"use client";

import { WeeklyCalender } from "@/components/free-time/WeeklyCalender";
import { ScheduleContextProvider } from "@/hooks/scheduleContext";

export default function Home() {
  return (
    <ScheduleContextProvider>
      <WeeklyCalender standardDate={new Date()} />
    </ScheduleContextProvider>
  );
}
