"use client";

import { useState } from "react";
import { DaySchedule } from "./DaySchedule";

import { startOfWeek, endOfWeek, addDays, addWeeks, format } from "date-fns";

const week = ["월", "화", "수", "목", "금", "토", "일"];

const freeTime = [
  { start: "2024-09-08T09:00:00", end: "2024-09-08T12:00:00" },
  { start: "2024-09-08T13:00:00", end: "2024-09-08T15:00:00" },
  { start: "2024-09-08T16:00:00", end: "2024-09-08T18:00:00" },
];

const meetings = [
  { start: "2024-09-08T08:00:00", end: "2024-09-08T09:00:00" },
  { start: "2024-09-08T15:00:00", end: "2024-09-08T16:00:00" },
];

export function WeeklyCalender() {
  const [date, setDate] = useState(new Date());

  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const endDate = endOfWeek(date, { weekStartsOn: 1 });

  const handleAddWeekToDate = () => {
    setDate(() => addWeeks(date, 1));
  };

  const handleSubWeekToDate = () => {
    setDate(() => addWeeks(date, -1));
  };

  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  return (
    <main className="flex flex-col gap-2 justify-center items-center">
      <div className="w-full flex content-between justify-between p-4">
        <button onClick={handleSubWeekToDate}>{"<"}</button>
        <div>{`${formattedStartDate} ~ ${formattedEndDate}`}</div>
        <button onClick={handleAddWeekToDate}>{">"}</button>
      </div>
      <div className="w-full grid grid-cols-7 gap-12 p-4 place-items-center">
        {week.map((day, index) => (
          <DaySchedule
            key={`${day}`}
            date={addDays(startDate, index)}
            day={day}
            freeTime={freeTime}
            meetings={meetings}
          />
        ))}
      </div>
    </main>
  );
}
