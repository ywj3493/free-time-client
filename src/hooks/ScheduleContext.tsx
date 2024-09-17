import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ScheduleContextProviderProps {
  children: ReactNode;
}

interface ScheduleContextProps {
  setSelectedSchedule: Dispatch<SetStateAction<Set<string>>>;
  selectedSchedule: Set<string>;
}

export const ScheduleContext = createContext<ScheduleContextProps | null>(null);

export function ScheduleContextProvider({
  children,
}: ScheduleContextProviderProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<Set<string>>(
    new Set<string>()
  );

  return (
    <ScheduleContext.Provider value={{ setSelectedSchedule, selectedSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
}
