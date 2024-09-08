"use client";

import { differenceInMinutes, startOfDay, format } from "date-fns";

interface DayScheduleProps {
  date: Date;
  day: string;
  freeTime: Schedule[];
  meetings: Schedule[];
}

export function DaySchedule({
  date,
  day,
  freeTime,
  meetings,
}: DayScheduleProps) {
  const formattedDate = format(date, "yyyy-MM-dd");
  return (
    <div className="relative max-w-36 flex flex-col bg-gray-400 h-180">
      {`${formattedDate} ${day}`}
      {freeTime.map((time) => (
        <ScheduleGage
          key={`freeTime_${time.start}_${time.end}`}
          {...time}
          isFreeTime
        />
      ))}
      {meetings.map((meeting) => (
        <ScheduleGage
          key={`meeting_${meeting.start}_${meeting.end}`}
          {...meeting}
          isFreeTime={false}
        />
      ))}
    </div>
  );
}

interface ScheduleGageProps {
  start: string;
  end: string;
  isFreeTime: boolean;
}

function ScheduleGage({ start, end, isFreeTime }: ScheduleGageProps) {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const dayStart = startOfDay(startTime);
  const minutesFromStart = differenceInMinutes(startTime, dayStart);

  const difference = differenceInMinutes(endTime, startTime);

  const containerHeight = 720;

  const top = (minutesFromStart / (24 * 60)) * containerHeight;
  const height = (difference / (24 * 60)) * containerHeight;

  return (
    <div
      className={`absolute w-full ${isFreeTime ? "bg-blue-400" : "bg-red-400"}`}
      style={{ height: height, top: top }}
    ></div>
  );
}
