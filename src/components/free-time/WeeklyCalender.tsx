"use client";

import { useState } from "react";
import { DaySchedule } from "./DaySchedule";

import { startOfWeek, endOfWeek, addWeeks, format } from "date-fns";
import { Button } from "../common/Button";
import Modal from "../common/Modal";
import { MeetingProposalForm } from "../proposals/MeetingProposalForm";
import { useSchedule } from "@/hooks/useSchedule";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";
import { dayToKor } from "@/utils";
import { getFreeTime } from "@/services/free-time";
import useSWR from "swr";

interface WeeklyCalenderProps {
  standardDate: Date;
}

export function WeeklyCalender({ standardDate }: WeeklyCalenderProps) {
  const { filterSelectedSchedule } = useSchedule();

  const [date, setDate] = useState(standardDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const endDate = endOfWeek(date, { weekStartsOn: 1 });

  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  const handleAddWeekToDate = () => {
    setDate(() => addWeeks(date, 1));
  };

  const handleSubWeekToDate = () => {
    setDate(() => addWeeks(date, -1));
  };

  const {
    data: myScheduleData,
    isLoading,
    error,
  } = useSWR<FreeTimeMyResponse>(
    `/free-time?start=${formattedStartDate}end=${formattedEndDate}`,
    () => getFreeTime({ start: formattedStartDate, end: formattedEndDate })
  );

  if (isLoading || !myScheduleData) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  const { schedules } = myScheduleData;

  const freeTimeAdapters = schedules.reduce<ScheduleAdapter[]>(
    (acc, curr) => [
      ...acc,
      ...curr.freeTime.map((time) => ScheduleAdapter.create(time, true)),
    ],
    []
  );

  const filteredSelectedSchedule = filterSelectedSchedule(freeTimeAdapters);

  return (
    <main className="flex flex-col gap-2 justify-center items-center px-10 pb-20">
      <div className="w-full flex content-between justify-between p-4">
        <button onClick={handleSubWeekToDate}>{"<"}</button>
        <div>{`${formattedStartDate} ~ ${formattedEndDate}`}</div>
        <button onClick={handleAddWeekToDate}>{">"}</button>
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
      <Button onClick={() => setIsModalOpen(true)}>약속 제안</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MeetingProposalForm
          freeTimes={filteredSelectedSchedule}
          onEmpty={() => setIsModalOpen(false)}
        />
      </Modal>
    </main>
  );
}
