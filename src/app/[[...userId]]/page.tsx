"use client";

import GuestFreeTime from "@/components/free-time/GuestFreeTime";
import MyFreeTime from "@/components/free-time/MyFreeTime";
import { ScheduleContextProvider } from "@/hooks/ScheduleContext";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";

export default function FreeTimePage() {
  const { userId } = useParams();

  const { data: session, status } = useSession();

  // 로그인 하지 않았을 때 로그인 화면으로 라우팅
  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // root 페이지 값 userId 없을 때, 자기 자신 값으로 라우팅
  if (!userId || userId.length > 1) {
    redirect(`/${session?.user.userId}`);
  }

  const isMyPage = session?.user.userId === userId[0];

  return (
    <ScheduleContextProvider>
      {isMyPage ? <MyFreeTime /> : <GuestFreeTime />}
    </ScheduleContextProvider>
  );
}
