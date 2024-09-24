"use client";

import { ScheduleContextProvider } from "@/hooks/ScheduleContext";
import { WeeklyCalender } from "./WeeklyCalender";
import useSWR from "swr";
import { startOfWeek, endOfWeek, addWeeks, format } from "date-fns";
import { useState } from "react";
import { getMyFreeTime } from "@/services/free-time";
import { Chip } from "../common/Chip";
import { MeetingAdapter } from "@/adapters/MeetingAdapter";

export default function MyFreeTime() {
  const [date, setDate] = useState(new Date());

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
    () => getMyFreeTime({ start: formattedStartDate, end: formattedEndDate })
  );

  if (!myScheduleData || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { schedules, ownedMeetings, guestMeetings } = myScheduleData;

  return (
    <main className="flex flex-col gap-2 justify-center items-center px-10 pb-20">
      <WeeklyCalender
        schedules={schedules}
        startDate={formattedStartDate}
        endDate={formattedEndDate}
        onClickPrev={handleSubWeekToDate}
        onClickNext={handleAddWeekToDate}
      />
      {ownedMeetings.map(MeetingAdapter.create).map((meeting, index) => (
        <div
          key={`meeting_response_form_item_${meeting?.meetingId}`}
          className="grid grid-cols-4 gap-4 items-center"
        >
          <Chip className="col-span-1" title={`약속${index + 1}`} isSelected />
          <span className="col-span-3">{meeting?.meetingSummary}</span>
        </div>
      ))}
      {guestMeetings.map(MeetingAdapter.create).map((meeting, index) => (
        <div
          key={`meeting_response_form_item_${meeting?.meetingId}`}
          className="grid grid-cols-4 gap-4 items-center"
        >
          <Chip className="col-span-1" title={`약속${index + 1}`} isSelected />
          <span className="col-span-3">{meeting?.meetingSummary}</span>
        </div>
      ))}
    </main>
  );
}
