"use client";

import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { useSchedule } from "@/hooks/useSchedule";
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
  const { handleToggleSchedule } = useSchedule();

  const formattedDate = format(date, "yyyy-MM-dd");

  const freeTimeAdapters = freeTime.map(({ start, end }) =>
    ScheduleAdapter.create({ date, start, end, isFreeTime: true })
  );

  const meetingsAdapters = meetings.map(({ start, end }) =>
    ScheduleAdapter.create({ date, start, end, isFreeTime: false })
  );

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
      {freeTimeAdapters.map((adapter) => (
        <ScheduleGage
          key={`freeTime_${adapter.start}_${adapter.end}`}
          scheduleAdapter={adapter}
          onClick={({ id }) => handleToggleSchedule(id)}
        />
      ))}
      {meetingsAdapters.map((adapter) => (
        <ScheduleGage
          key={`meeting_${adapter.start}_${adapter.end}`}
          scheduleAdapter={adapter}
          onClick={(schedule) => console.log(schedule)}
        />
      ))}
    </div>
  );
}

interface ScheduleGageProps {
  scheduleAdapter: ScheduleAdapter;
  isSelected?: boolean;
  onClick?: (schedule: ScheduleAdapter) => void;
}

function ScheduleGage({ scheduleAdapter, onClick }: ScheduleGageProps) {
  const { selectedSchedule } = useSchedule();

  const { id, topRatio, heightRatio, isFreeTime } = scheduleAdapter;

  const containerHeight = 720;

  const top = topRatio * containerHeight;
  const height = heightRatio * containerHeight;

  const handleGageClick = () => {
    onClick?.(scheduleAdapter);
  };

  return (
    <div
      className={`absolute w-full flex items-center justify-center ${
        isFreeTime ? "bg-blue-400 cursor-pointer" : "bg-red-400"
      } ${
        selectedSchedule.has(id) ? "border-2 border-blue-500" : ""
      } text-white`}
      style={{ height: height, top: top }}
      onClick={handleGageClick}
    >
      {isFreeTime ? "프리타임" : "약속"}
    </div>
  );
}
