"use client";

import { DaySchedule } from "./DaySchedule";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { dayToKor } from "@/utils";

interface WeeklyCalenderProps {
  schedules: DailyScheduleResponse[];
  startDate: string;
  endDate: string;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export function WeeklyCalender({
  schedules,
  startDate,
  endDate,
  onClickPrev,
  onClickNext,
}: WeeklyCalenderProps) {
  return (
    <>
      <div className="w-full flex content-between justify-between p-4">
        <button onClick={onClickPrev}>{"<"}</button>
        <div>{`${startDate} ~ ${endDate}`}</div>
        <button onClick={onClickNext}>{">"}</button>
      </div>
      <div className="w-full grid grid-cols-7 gap-12 p-4 place-items-center">
        {schedules.map((schedule) => {
          const { freeTime, confirmedMeetings, day } = schedule;

          const freeTimeAdapters = freeTime.map((schedule) =>
            ScheduleAdapter.create({ ...schedule, isFreeTime: true })
          );
          const meetingAdapters = confirmedMeetings.map((schedule) =>
            ScheduleAdapter.create({ ...schedule, isFreeTime: false })
          );

          return (
            <DaySchedule
              key={`${schedule.day}_${schedule.date}`}
              day={dayToKor(day as DayEng)}
              freeTimes={freeTimeAdapters}
              meetings={meetingAdapters}
            />
          );
        })}
      </div>
    </>
  );
}
