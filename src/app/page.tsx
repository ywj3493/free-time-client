import { WeeklyCalender } from "@/components/free-time/WeeklyCalender";

export default function Home() {
  return <WeeklyCalender standardDate={new Date()} />;
}
