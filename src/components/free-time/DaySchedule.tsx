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
    <div className="relative w-full max-w-36 flex flex-col bg-gray-400 h-180 text-center">
      <div className="absolute w-4 h-180 -left-4 -top-2">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute text-xs text-gray-700 text-center w-full"
            style={{ top: (720 / 24) * i }}
          >
            {i}
          </div>
        ))}
      </div>
      {`${formattedDate} ${day}`}
      {freeTime.map((time) => (
        <ScheduleGage
          key={`freeTime_${time.start}_${time.end}`}
          {...time}
          isFreeTime
          onClick={(schedule) => console.log(schedule)}
        />
      ))}
      {meetings.map((meeting) => (
        <ScheduleGage
          key={`meeting_${meeting.start}_${meeting.end}`}
          {...meeting}
          isFreeTime={false}
          onClick={(schedule) => console.log(schedule)}
        />
      ))}
    </div>
  );
}

interface ScheduleGageProps {
  start: string;
  end: string;
  isFreeTime: boolean;
  onClick?: (schedule: Schedule) => void;
}

function ScheduleGage({ start, end, isFreeTime, onClick }: ScheduleGageProps) {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const dayStart = startOfDay(startTime);
  const minutesFromStart = differenceInMinutes(startTime, dayStart);

  const difference = differenceInMinutes(endTime, startTime);

  const containerHeight = 720;

  const top = (minutesFromStart / (24 * 60)) * containerHeight;
  const height = (difference / (24 * 60)) * containerHeight;

  const handleGageClick = () => {
    onClick?.({ start, end });
  };

  return (
    <div
      className={`absolute w-full flex items-center justify-center ${
        isFreeTime ? "bg-blue-400" : "bg-red-400"
      } text-white`}
      style={{ height: height, top: top }}
      onClick={handleGageClick}
    >
      {isFreeTime ? "프리타임" : "약속"}
    </div>
  );
}
