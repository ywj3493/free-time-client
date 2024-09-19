import { useContext, useEffect } from "react";
import { ScheduleContext } from "./ScheduleContext";
import { ScheduleAdapter } from "@/adapters/SchduleAdapter";

export function useSchedule() {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw Error(
      "useSchedule 을 사용하려면 ScheduleContextProvider 를 사용해주세요."
    );
  }

  const { selectedSchedule, setSelectedSchedule } = context;

  const handleAddSchedule = (id: string) => {
    const tempSet = new Set(selectedSchedule);
    tempSet.add(id);
    setSelectedSchedule(tempSet);
  };

  const handleDeleteSchedule = (id: string) => {
    const tempSet = new Set(selectedSchedule);
    tempSet.delete(id);
    setSelectedSchedule(tempSet);
  };

  const handleToggleSchedule = (id: string) => {
    if (selectedSchedule.has(id)) {
      handleDeleteSchedule(id);
    } else {
      handleAddSchedule(id);
    }
  };

  const getIsSelected = (id: string) => {
    return selectedSchedule.has(id);
  };

  const filterSelectedSchedule = (schedules: ScheduleAdapter[]) => {
    return [
      ...schedules.filter((schedule) => selectedSchedule.has(schedule.id)),
    ];
  };

  return {
    handleAddSchedule,
    handleDeleteSchedule,
    handleToggleSchedule,
    getIsSelected,
    filterSelectedSchedule,
  };
}
