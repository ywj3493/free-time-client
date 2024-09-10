import { useContext } from "react";
import { ScheduleContext } from "./ScheduleContext";

export function useSchedule() {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw Error(
      "useSchedule 을 사용하려면 ScheduleContextProvider 를 사용해주세요."
    );
  }

  const { selectedSchedule, setSelectedSchedule } = context;

  const handleAddSchedule = (id: string) => {
    const tempSet = selectedSchedule;
    tempSet.add(id);
    setSelectedSchedule(new Set(tempSet));
  };

  const handleDeleteSchedule = (id: string) => {
    const tempSet = selectedSchedule;
    tempSet.delete(id);
    setSelectedSchedule(new Set(tempSet));
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

  return {
    selectedSchedule,
    handleAddSchedule,
    handleDeleteSchedule,
    handleToggleSchedule,
    getIsSelected,
  };
}
