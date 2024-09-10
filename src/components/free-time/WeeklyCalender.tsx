"use client";

import { useState } from "react";
import { DaySchedule } from "./DaySchedule";

import { startOfWeek, endOfWeek, addDays, addWeeks, format } from "date-fns";
import { Button } from "../common/Button";
import Modal from "../common/Modal";
import { ScheduleContextProvider } from "@/hooks/scheduleContext";
import { MeetingProposalForm } from "../proposals/MeetingProposalForm";
import { useSchedule } from "@/hooks/useSchedule";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";

const week = ["월", "화", "수", "목", "금", "토", "일"];

const freeTime = [
  { id: 1, start: "2024-09-08T09:00:00", end: "2024-09-08T12:00:00" },
  { id: 2, start: "2024-09-08T13:00:00", end: "2024-09-08T15:00:00" },
  { id: 3, start: "2024-09-08T16:00:00", end: "2024-09-08T18:00:00" },
];

const meetings = [
  { id: 4, start: "2024-09-08T08:00:00", end: "2024-09-08T09:00:00" },
  { id: 5, start: "2024-09-08T15:00:00", end: "2024-09-08T16:00:00" },
];

interface WeeklyCalenderProps {
  standardDate: Date;
}

export function WeeklyCalender({ standardDate }: WeeklyCalenderProps) {
  const { selectedSchedule } = useSchedule();
  const [date, setDate] = useState(standardDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const selectedFreeTimes = freeTime
    .map((schedule) =>
      ScheduleAdapter.create({
        date,
        start: schedule.start,
        end: schedule.end,
        isFreeTime: true,
      })
    )
    .filter((schedule) => !selectedSchedule.has(schedule.id));

  return (
    <ScheduleContextProvider>
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
        <Button onClick={() => setIsModalOpen(true)}>모달오픈</Button>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <MeetingProposalForm freeTimes={selectedFreeTimes} />
        </Modal>
      </main>
    </ScheduleContextProvider>
  );
}
