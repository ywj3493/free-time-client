"use client";

import { FreeTimeUpdateForm } from "@/components/users/FreeTimeUpdateForm";
import { UserUpdateForm } from "@/components/users/UserUpdateForm";
import {
  getMyWeeklyFreeTime,
  updateWeeklyFreeTime,
} from "@/services/free-time";
import { getUser, updateUser } from "@/services/users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function UsersPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const {
    data: userResponse,
    isLoading: isUserResponseLoading,
    mutate: userResponseMutate,
  } = useSWR("/users", getUser);

  const {
    data: freeTimeResponse,
    isLoading: isFreeTimeResponseLoading,
    mutate: freeTimeResponseMutate,
  } = useSWR("/free-time/weekly", getMyWeeklyFreeTime);

  const handleUserUpdateFormSubmit = async (data: UserUpdateFormData) => {
    await updateUser(data);
    userResponseMutate();
  };

  const handleFreeTimeUpdateFormSubmit = async (
    data: FreeTimeUpdateFormData
  ) => {
    await updateWeeklyFreeTime(data);
    freeTimeResponseMutate();
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 정보 수정</div>
        {!isUserResponseLoading && (
          <UserUpdateForm
            defaultValues={userResponse}
            onSubmit={handleUserUpdateFormSubmit}
          />
        )}
      </section>
      <section className="flex flex-col items-center justify-center gap-2">
        <div>내 프리타임</div>
        {!isFreeTimeResponseLoading && (
          <FreeTimeUpdateForm
            defaultValues={freeTimeResponse}
            onSubmit={handleFreeTimeUpdateFormSubmit}
          />
        )}
      </section>
    </div>
  );
}
