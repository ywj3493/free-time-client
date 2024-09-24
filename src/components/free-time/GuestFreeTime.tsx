"use client";

import { WeeklyCalender } from "./WeeklyCalender";
import useSWR from "swr";
import { getGuestFreeTime } from "@/services/free-time";
import { useParams } from "next/navigation";
import { useState } from "react";
import { startOfWeek, endOfWeek, addWeeks, format } from "date-fns";
import Modal from "../common/Modal";
import { Button } from "../common/Button";
import { MeetingProposalForm } from "../proposals/MeetingProposalForm";
import { useSchedule } from "@/hooks/useSchedule";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";

export default function GuestFreeTime() {
  const { filterSelectedSchedule } = useSchedule();
  const { userId } = useParams();

  const [date, setDate] = useState(new Date());
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
    data: guestScheduleData,
    isLoading,
    error,
  } = useSWR<FreeTimeGueestResponse>(
    `/free-time/${userId}/?start=${formattedStartDate}end=${formattedEndDate}`,
    () =>
      getGuestFreeTime({
        targetId: userId[0],
        start: formattedStartDate,
        end: formattedEndDate,
      })
  );

  if (!guestScheduleData || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { schedules } = guestScheduleData;

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
      <WeeklyCalender
        schedules={guestScheduleData?.schedules}
        startDate={formattedStartDate}
        endDate={formattedEndDate}
        onClickPrev={handleSubWeekToDate}
        onClickNext={handleAddWeekToDate}
      />
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
