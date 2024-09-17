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

const response = {
  user: {
    userId: 4,
    name: "홍길동",
    email: "test@test.com",
    phone: "01011111111",
    preferredNoticeChannel: "EMAIL",
  },
  schedules: [
    {
      date: "2024-09-02",
      day: "MONDAY",
      freeTime: [
        {
          start: "2024-09-02 06:30:00",
          end: "2024-09-02 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-03",
      day: "TUESDAY",
      freeTime: [
        {
          start: "2024-09-03 06:30:00",
          end: "2024-09-03 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-04",
      day: "WEDNESDAY",
      freeTime: [
        {
          start: "2024-09-04 06:30:00",
          end: "2024-09-04 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-05",
      day: "THURSDAY",
      freeTime: [
        {
          start: "2024-09-05 06:30:00",
          end: "2024-09-05 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-06",
      day: "FRIDAY",
      freeTime: [
        {
          start: "2024-09-06 06:30:00",
          end: "2024-09-06 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-07",
      day: "SATURDAY",
      freeTime: [
        {
          start: "2024-09-07 06:30:00",
          end: "2024-09-07 09:00:00",
        },
      ],
      meetings: [],
    },
    {
      date: "2024-09-08",
      day: "SUNDAY",
      freeTime: [
        {
          start: "2024-09-08 06:30:00",
          end: "2024-09-08 09:00:00",
        },
      ],
      meetings: [
        {
          start: "2024-09-08 06:30:00",
          end: "2024-09-08 08:00:00",
        },
      ],
    },
  ],
  meetings: [],
};

interface WeeklyCalenderProps {
  standardDate: Date;
}

export function WeeklyCalender({ standardDate }: WeeklyCalenderProps) {
  const { filterSelectedSchedule } = useSchedule();

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

  const { schedules } = response;

  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  const freeTimeAdapters = schedules.reduce<ScheduleAdapter[]>(
    (acc, curr) => [
      ...acc,
      ...curr.freeTime.map((time) =>
        ScheduleAdapter.create({ ...time, isFreeTime: true })
      ),
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
          const { freeTime, meetings, day } = schedule;

          const freeTimeAdapters = freeTime.map((schedule) =>
            ScheduleAdapter.create({ ...schedule, isFreeTime: true })
          );
          const meetingAdapters = meetings.map((schedule) =>
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
      <Button onClick={() => setIsModalOpen(true)}>프리타임 제안</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MeetingProposalForm freeTimes={filteredSelectedSchedule} />
      </Modal>
    </main>
  );
}
